import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { brand } from "@/theme/brand"
import type { Issue } from "../interfaces"
import { PlatformMark } from "./PlatformMark"
import { StatusBadge } from "./StatusBadge"

export function IssueCard({ issue }: { issue: Issue }) {
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
          <PlatformMark name={issue.platform} />
          <Box>
            <Text
              fontSize="xs"
              color={brand.textFaint}
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="0.04em"
            >
              {issue.platform}
            </Text>
            <Text fontSize="sm" color="white" fontWeight="medium" mt="0.5">
              {issue.title}
            </Text>
          </Box>
        </HStack>
        <StatusBadge status={issue.status} />
      </Flex>
      <Flex justify="space-between" align="center" mt="4" fontSize="xs" color={brand.textFaint} flexWrap="wrap" gap="2">
        <HStack gap="4">
          <Text>{issue.affectedUsers.toLocaleString()} affected</Text>
          <Text>{issue.comments} comments</Text>
        </HStack>
        <Text>{issue.updatedAt}</Text>
      </Flex>
    </Box>
  )
}
