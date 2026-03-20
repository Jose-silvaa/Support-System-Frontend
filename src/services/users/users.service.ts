/**
 * API service for users (assignable users for ticket responsibility).
 */

import { get } from "@/lib/api"

const ASSIGNABLE_USERS_PATH = "user/assignable-users"

export interface AssignableUser {
  id: string
  name?: string
  email?: string
}

function toAssignableUser(raw: Record<string, unknown>): AssignableUser {
  return {
    id: String(raw.id ?? ""),
    email: raw.email != null ? String(raw.email) : undefined,
  }
}

/** Display label for dropdown (name or email or id fallback). */
export function getAssignableUserLabel(user: AssignableUser): string {
  if (user.email?.trim()) return user.email.trim()
  return user.id || "—"
}

/** GET user/assignable-users — list users that can be assigned to tickets. */
export async function getAssignableUsers(): Promise<AssignableUser[]> {
  const res = await get<AssignableUser[] | { data: unknown[] }>(ASSIGNABLE_USERS_PATH)
  if (Array.isArray(res)) {
    return res.map((u) => toAssignableUser(u as unknown as Record<string, unknown>))
  }
  const data = (res as { data: unknown[] }).data
  return Array.isArray(data)
    ? data.map((u) => toAssignableUser(u as Record<string, unknown>))
    : []
}
