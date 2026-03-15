import type { ReactNode } from "react"
import { createContext, useCallback, useContext, useState } from "react"
import type { DashboardCard } from "@/features/dashboard/interfaces"
import { TicketStatus } from "@/features/dashboard/interfaces"

const INITIAL_TICKETS: DashboardCard[] = [
  { id: "1", title: "Card 1", content: "Content 1", status: TicketStatus.Open },
  { id: "2", title: "Card 2", content: "Content 2", status: TicketStatus.Open },
  { id: "3", title: "Card 3", content: "Content 3", status: TicketStatus.InProgress },
  { id: "4", title: "Card 4", content: "Content 4", status: TicketStatus.Closed },
  { id: "5", title: "Card 5", content: "Content 5", status: TicketStatus.Open },
  { id: "6", title: "Card 6", content: "Content 6", status: TicketStatus.InProgress },
  { id: "7", title: "Card 7", content: "Content 7", status: TicketStatus.Closed },
  { id: "8", title: "Card 8", content: "Content 8", status: TicketStatus.Open },
  { id: "9", title: "Card 9", content: "Content 9", status: TicketStatus.InProgress },
  { id: "10", title: "Card 10", content: "Content 10", status: TicketStatus.Closed },
]

interface TicketContextValue {
  tickets: DashboardCard[]
  setTickets: React.Dispatch<React.SetStateAction<DashboardCard[]>>
  addTicket: (data: { title: string; content: string }) => void
}

const TicketContext = createContext<TicketContextValue | null>(null)

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<DashboardCard[]>(INITIAL_TICKETS)

  const addTicket = useCallback((data: { title: string; content: string }) => {
    setTickets((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: data.title,
        content: data.content,
        status: TicketStatus.Open,
      },
    ])
  }, [])

  return (
    <TicketContext.Provider value={{ tickets, setTickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  )
}

export function useTickets(): TicketContextValue {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error("useTickets must be used within TicketProvider")
  return ctx
}
