import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { brand } from "@/theme/brand"
import type { TicketPreview } from "../interfaces"
import { ReporterAvatar } from "./ReporterAvatar"
import { StatusBadge } from "./StatusBadge"

export function TicketPreviewCard({ ticket }: { ticket: TicketPreview }) {
  return (
    <Box
      bg={brand.surface}
      borderWidth="1px"
      borderColor={brand.border}
      borderRadius="xl"
      p="4"
      transition="border-color 0.15s, background-color 0.15s"
      _hover={{ borderColor: brand.borderStrong, bg: brand.surfaceHover }}
    >
      <Flex justify="space-between" align="flex-start" gap="3">
        <HStack gap="3" align="flex-start">
          <ReporterAvatar name={ticket.reporter} />
          <Box>
            <Text
              fontSize="xs"
              color={brand.textFaint}
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="0.04em"
            >
              {ticket.reporter}
            </Text>
            <Text fontSize="sm" color="white" fontWeight="medium" mt="0.5">
              {ticket.title}
            </Text>
          </Box>
        </HStack>
        <StatusBadge status={ticket.status} />
      </Flex>
      <Flex justify="flex-end" mt="4" fontSize="xs" color={brand.textFaint}>
        <Text>Updated {ticket.updatedAt}</Text>
      </Flex>
    </Box>
  )
}
