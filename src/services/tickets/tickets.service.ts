/**
 * API service for tickets (list, create, update).
 * Uses REST: GET /tickets, POST /tickets, PATCH /tickets/:id.
 */

import { get, patch, post } from "@/lib/api"
import type { DashboardCard } from "./interfaces"
import { TicketStatus } from "./interfaces"

export * from "./interfaces"

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

type ApiRecord = Record<string, unknown>

/** Se o backend sinalizou erro (`success: false`), lança com a mensagem devolvida. */
function assertSuccess(obj: ApiRecord): void {
  if (obj.success === false) {
    const message = obj.message
    throw new Error(typeof message === "string" && message ? message : "Request failed")
  }
}

/**
 * O backend às vezes devolve o ticket direto, às vezes embrulhado em `{ data: {...} }`.
 * Esta função sempre devolve o ticket "achatado", checando erro nos dois formatos.
 */
function unwrapTicket(raw: ApiRecord): ApiRecord {
  assertSuccess(raw)
  const data = raw.data
  if (data != null && typeof data === "object" && !Array.isArray(data)) {
    assertSuccess(data as ApiRecord)
    return data as ApiRecord
  }
  return raw
}

/** Converte um ticket "cru" da API para o formato DashboardCard usado na UI. */
function toDashboardCard(raw: ApiRecord): DashboardCard {
  const ticket = unwrapTicket(raw)
  return {
    id: String(ticket.id ?? ""),
    title: String(ticket.title ?? ""),
    description: String(ticket.description ?? ""),
    status: Number(ticket.status) as TicketStatus,
    userId: String(ticket.userId ?? ""),
  }
}

/** GET /tickets — list all tickets. Handles array or { data: [] }. */
export async function listTickets(): Promise<DashboardCard[]> {
  const res = await get<ApiRecord[] | { data: ApiRecord[] }>(`${TICKETS_PATH}/getAllTickets`)
  const tickets = Array.isArray(res) ? res : res.data
  return Array.isArray(tickets) ? tickets.map(toDashboardCard) : []
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
  const raw = await patch<ApiRecord>(`${TICKETS_PATH}/${id}`, body)
  return toDashboardCard(raw)
}
