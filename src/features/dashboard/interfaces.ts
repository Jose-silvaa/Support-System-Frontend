export const TicketStatus = {
  Open: 1,
  InProgress: 2,
  Closed: 3,
} as const

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]

export interface DashboardCard {
  id: string
  title: string
  description: string
  status: TicketStatus
  /** Person responsible / who created the ticket */
  responsible: string
}

export interface DashboardFeatureProps {
  /** Props da feature Dashboard */
}
