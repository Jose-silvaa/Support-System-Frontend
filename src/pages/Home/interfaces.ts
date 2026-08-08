import type { TicketStatus } from "@/services/tickets/interfaces"

/** Ticket de exemplo mostrado na landing page (hero + seção de tickets recentes). */
export interface TicketPreview {
  id: string
  title: string
  status: TicketStatus
  reporter: string
  updatedAt: string
}
