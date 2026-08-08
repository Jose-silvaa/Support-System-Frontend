import { Badge } from "@chakra-ui/react"
import { TicketStatus } from "@/services/tickets/interfaces"

/** Mesmas cores usadas nas colunas do Dashboard, para o preview bater com o produto real. */
const STATUS_LABEL: Record<TicketStatus, string> = {
  [TicketStatus.Open]: "Open",
  [TicketStatus.InProgress]: "In Progress",
  [TicketStatus.Closed]: "Closed",
}

const STATUS_COLOR: Record<TicketStatus, { bg: string; color: string }> = {
  [TicketStatus.Open]: { bg: "green.100", color: "green.900" },
  [TicketStatus.InProgress]: { bg: "blue.50", color: "blue.900" },
  [TicketStatus.Closed]: { bg: "red.100", color: "red.900" },
}

export function StatusBadge({ status }: { status: TicketStatus }) {
  const { bg, color } = STATUS_COLOR[status]
  return (
    <Badge
      bg={bg}
      color={color}
      borderRadius="full"
      px="2.5"
      py="0.5"
      fontSize="xs"
      fontWeight="semibold"
      flexShrink={0}
    >
      {STATUS_LABEL[status]}
    </Badge>
  )
}
