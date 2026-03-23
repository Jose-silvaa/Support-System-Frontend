/**
 * API service for tickets (list, create, update).
 * Uses REST: GET /tickets, POST /tickets, PATCH /tickets/:id.
 */

import { get, patch, post } from "@/lib/api"
import type { DashboardCard } from "@/features/dashboard/interfaces"
import { TicketStatus } from "@/features/dashboard/interfaces"

const TICKETS_PATH = "ticket"


export interface CreateTicketBody {
  title: string
  description: string
  userId?: string
}

export interface UpdateTicketBody {
  title?: string
  description?: string
  userId?: string
  status?: TicketStatus
}

/** API devolve o ticket em `data` ou no próprio objeto (lista / PATCH). */
function ticketFields(raw: Record<string, unknown>): Record<string, unknown> {
  const inner = raw.data
  if (inner != null && typeof inner === "object" && !Array.isArray(inner)) {
    return inner as Record<string, unknown>
  }
  return raw
}

/** Normalize API response to DashboardCard (handles id as number from backend). */
function toDashboardCard(raw: Record<string, unknown>): DashboardCard {
  if (raw.success === false) {
    const msg = raw.message
    throw new Error(typeof msg === "string" && msg ? msg : "Request failed")
  }
  const row = ticketFields(raw)
  if (row.success === false) {
    const msg = row.message
    throw new Error(typeof msg === "string" && msg ? msg : "Request failed")
  }
  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    status: Number(row.status) as TicketStatus,
    userId: String(row.userId ?? ""),
  }
}

/** GET /tickets — list all tickets. Handles array or { data: [] }. */
export async function listTickets(): Promise<DashboardCard[]> {
  const res = await get<DashboardCard[] | { data: DashboardCard[] }>(`${TICKETS_PATH}/getAllTickets`)
  if (Array.isArray(res)) {
    return res.map((t) => toDashboardCard(t as unknown as Record<string, unknown>))
  }
  const data = (res as { data: unknown[] }).data
  return Array.isArray(data) ? data.map((t) => toDashboardCard(t as Record<string, unknown>)) : []
}

/** POST /tickets — create a ticket. Endpoint returns no body. */
export async function createTicket(body: CreateTicketBody): Promise<void> {
  await post(`${TICKETS_PATH}/create`, {
    title: body.title,
    description: body.description,
    userId: body.userId ?? "",
  })
}

/** PATCH /tickets/:id — update ticket (partial). Returns updated ticket. */
export async function updateTicket(id: string, body: UpdateTicketBody): Promise<DashboardCard> {
  const raw = await patch<Record<string, unknown>>(`${TICKETS_PATH}/${id}`, body)
  return toDashboardCard(raw)
}
