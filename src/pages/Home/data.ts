import { TicketStatus } from "@/services/tickets/interfaces"
import type { TicketPreview } from "./interfaces"

/** Tickets de exemplo para ilustrar a landing page (não vêm da API). */
export const EXAMPLE_TICKETS: TicketPreview[] = [
  {
    id: "1",
    title: "Cannot reset my password",
    status: TicketStatus.Open,
    reporter: "Maria Silva",
    updatedAt: "10m ago",
  },
  {
    id: "2",
    title: "Invoice #4821 shows the wrong amount",
    status: TicketStatus.InProgress,
    reporter: "John Peters",
    updatedAt: "1h ago",
  },
  {
    id: "3",
    title: "App crashes when uploading a file",
    status: TicketStatus.Open,
    reporter: "Ana Costa",
    updatedAt: "2h ago",
  },
  {
    id: "4",
    title: "Need access to the reporting dashboard",
    status: TicketStatus.InProgress,
    reporter: "Lucas Almeida",
    updatedAt: "3h ago",
  },
  {
    id: "5",
    title: "Duplicate charge on my last invoice",
    status: TicketStatus.Closed,
    reporter: "Beatriz Rocha",
    updatedAt: "5h ago",
  },
  {
    id: "6",
    title: "Unable to update my profile picture",
    status: TicketStatus.Closed,
    reporter: "Pedro Santos",
    updatedAt: "1d ago",
  },
]
