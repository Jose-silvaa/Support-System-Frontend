export const TicketStatus = {
  Open: 1,
  InProgress: 2,
  Closed: 3,
} as const

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]

export interface DashboardCard {
  id: string
  title: string
  content: string
  status: TicketStatus
}

export interface DashboardFeatureProps {
  /** Props da feature Dashboard */
}
