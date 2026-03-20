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
  responsible?: string
}

export interface UpdateTicketBody {
  title?: string
  description?: string
  responsible?: string
  status?: TicketStatus
}

/** Normalize API response to DashboardCard (handles id as number from backend). */
function toDashboardCard(raw: Record<string, unknown>): DashboardCard {
  return {
    id: String(raw.id ?? ""),
    title: String(raw.title ?? ""),
    description: String(raw.description ?? ""),
    status: Number(raw.status) as TicketStatus,
    responsible: String(raw.responsible ?? ""),
  }
}

/** GET /tickets — list all tickets. Handles array or { data: [] }. */
export async function listTickets(): Promise<DashboardCard[]> {
  const res = await get<DashboardCard[] | { data: DashboardCard[] }>(TICKETS_PATH)
  if (Array.isArray(res)) {
    return res.map((t) => toDashboardCard(t as unknown as Record<string, unknown>))
  }
  const data = (res as { data: unknown[] }).data
  return Array.isArray(data) ? data.map((t) => toDashboardCard(t as Record<string, unknown>)) : []
}

/** POST /tickets — create a ticket. Returns created ticket. */
export async function createTicket(body: CreateTicketBody): Promise<DashboardCard> {
  const raw = await post<Record<string, unknown>>(TICKETS_PATH, {
    title: body.title,
    description: body.description,
    responsible: body.responsible ?? "",
  })
  return toDashboardCard(raw)
}

/** PATCH /tickets/:id — update ticket (partial). Returns updated ticket. */
export async function updateTicket(id: string, body: UpdateTicketBody): Promise<DashboardCard> {
  const raw = await patch<Record<string, unknown>>(`${TICKETS_PATH}/${id}`, body)
  return toDashboardCard(raw)
}
