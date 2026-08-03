export type IssueStatus = "investigating" | "identified" | "monitoring" | "resolved"

export interface Issue {
  id: string
  platform: string
  title: string
  status: IssueStatus
  affectedUsers: number
  comments: number
  updatedAt: string
}
