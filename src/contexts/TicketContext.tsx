import type { ReactNode } from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { DashboardCard } from "@/features/dashboard/interfaces"
import { TicketStatus } from "@/features/dashboard/interfaces"
import * as ticketsService from "@/services/tickets/tickets.service"

interface TicketContextValue {
  tickets: DashboardCard[]
  setTickets: React.Dispatch<React.SetStateAction<DashboardCard[]>>
  addTicket: (data: { title: string; description: string; responsible?: string }) => Promise<void>
  updateTicket: (
    id: string,
    data: { title: string; description: string; responsible?: string }
  ) => Promise<void>
  updateTicketStatus: (id: string, status: TicketStatus) => Promise<void>
  loading: boolean
  error: string | null
  loadTickets: () => Promise<void>
}

const TicketContext = createContext<TicketContextValue | null>(null)

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<DashboardCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTickets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await ticketsService.listTickets()
      setTickets(data)
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load tickets"
      setError(message)
      setTickets([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTickets()
  }, [loadTickets])

  const addTicket = useCallback(
    async (data: { title: string; description: string; responsible?: string }) => {
      setError(null)
      try {
        const created = await ticketsService.createTicket({
          title: data.title,
          description: data.description,
          responsible: data.responsible,
        })
        setTickets((prev) => [...prev, created])
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to create ticket"
        setError(message)
        throw e
      }
    },
    []
  )

  const updateTicket = useCallback(
    async (
      id: string,
      data: { title: string; description: string; responsible?: string }
    ) => {
      setError(null)
      try {
        const updated = await ticketsService.updateTicket(id, {
          title: data.title,
          description: data.description,
          responsible: data.responsible,
        })
        setTickets((prev) =>
          prev.map((t) => (t.id === id ? updated : t))
        )
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to update ticket"
        setError(message)
        throw e
      }
    },
    []
  )

  const updateTicketStatus = useCallback(async (id: string, status: TicketStatus) => {
    setError(null)
    let previous: DashboardCard | undefined
    setTickets((state) => {
      previous = state.find((t) => t.id === id)
      if (!previous) return state
      return state.map((t) => (t.id === id ? { ...t, status } : t))
    })
    try {
      const updated = await ticketsService.updateTicket(id, { status })
      setTickets((state) =>
        state.map((t) => (t.id === id ? updated : t))
      )
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to update status"
      setError(message)
      if (previous) {
        setTickets((state) =>
          state.map((t) => (t.id === id ? previous! : t))
        )
      }
    }
  }, [])

  return (
    <TicketContext.Provider
      value={{
        tickets,
        setTickets,
        addTicket,
        updateTicket,
        updateTicketStatus,
        loading,
        error,
        loadTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

export function useTickets(): TicketContextValue {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error("useTickets must be used within TicketProvider")
  return ctx
}
