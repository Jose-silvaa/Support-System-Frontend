import { Badge } from "@chakra-ui/react"
import { brand } from "@/theme/brand"
import type { IssueStatus } from "../interfaces"

const STATUS_LABEL: Record<IssueStatus, string> = {
  investigating: "Investigating",
  identified: "Identified",
  monitoring: "Monitoring",
  resolved: "Resolved",
}

const STATUS_COLOR: Record<IssueStatus, { bg: string; color: string }> = {
  investigating: { bg: brand.warningBg, color: brand.warning },
  identified: { bg: brand.infoBg, color: brand.info },
  monitoring: { bg: brand.accentSoft, color: brand.accent },
  resolved: { bg: brand.successBg, color: brand.success },
}

export function StatusBadge({ status }: { status: IssueStatus }) {
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
