export type Section = "dashboard" | "usuarios" | "analiticas" | "roles"
export type Role    = "Admin" | "Editor" | "Viewer"
export type Status  = "active" | "inactive"

export interface User extends Record<string, unknown> {
  id: number
  name: string
  email: string
  role: Role
  status: Status
  joinedAt: string
}

export interface UserForm {
  name: string
  email: string
  role: Role
  status: Status
  joinedAt: string
}

export interface Stats {
  total: number
  active: number
  inactive: number
  admins: number
}
