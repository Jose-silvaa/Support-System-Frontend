import type { Issue } from "./interfaces"

/** Dados de exemplo — quando existir um endpoint público de issues, substituir por dados reais. */
export const TRENDING_ISSUES: Issue[] = [
  {
    id: "1",
    platform: "Discord",
    title: "Unable to connect to voice channels",
    status: "investigating",
    affectedUsers: 2481,
    comments: 312,
    updatedAt: "4m ago",
  },
  {
    id: "2",
    platform: "Slack",
    title: "Messages not sending in some workspaces",
    status: "identified",
    affectedUsers: 1204,
    comments: 156,
    updatedAt: "18m ago",
  },
  {
    id: "3",
    platform: "Cloudflare",
    title: "Elevated error rates on API requests",
    status: "monitoring",
    affectedUsers: 3150,
    comments: 401,
    updatedAt: "42m ago",
  },
  {
    id: "4",
    platform: "Spotify",
    title: "Playback issues on desktop app",
    status: "investigating",
    affectedUsers: 967,
    comments: 88,
    updatedAt: "1h ago",
  },
  {
    id: "5",
    platform: "GitHub",
    title: "Repository access issues",
    status: "resolved",
    affectedUsers: 842,
    comments: 64,
    updatedAt: "3h ago",
  },
  {
    id: "6",
    platform: "AWS",
    title: "Increased latency in us-east-1",
    status: "resolved",
    affectedUsers: 512,
    comments: 47,
    updatedAt: "5h ago",
  },
]
