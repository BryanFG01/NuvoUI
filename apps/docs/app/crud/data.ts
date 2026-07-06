import { FilterConfig } from "@nuvo-ui/ui"
import { Role, Section, Status, User, UserForm } from "./types"

export const USERS_INIT: User[] = [
  { id: 1,  name: "Ana García",       email: "ana@empresa.com",     role: "Admin",  status: "active",   joinedAt: "2024-01-15" },
  { id: 2,  name: "Carlos López",     email: "carlos@empresa.com",  role: "Editor", status: "active",   joinedAt: "2024-02-03" },
  { id: 3,  name: "María Torres",     email: "maria@empresa.com",   role: "Viewer", status: "inactive", joinedAt: "2024-02-20" },
  { id: 4,  name: "Luis Martínez",    email: "luis@empresa.com",    role: "Editor", status: "active",   joinedAt: "2024-03-05" },
  { id: 5,  name: "Sara Ruiz",        email: "sara@empresa.com",    role: "Viewer", status: "active",   joinedAt: "2024-03-18" },
  { id: 6,  name: "Pedro Sanz",       email: "pedro@empresa.com",   role: "Admin",  status: "inactive", joinedAt: "2024-04-01" },
  { id: 7,  name: "Laura Jiménez",    email: "laura@empresa.com",   role: "Editor", status: "active",   joinedAt: "2024-04-22" },
  { id: 8,  name: "Diego Moreno",     email: "diego@empresa.com",   role: "Viewer", status: "active",   joinedAt: "2024-05-10" },
  { id: 9,  name: "Isabel Fernández", email: "isabel@empresa.com",  role: "Viewer", status: "active",   joinedAt: "2024-05-28" },
  { id: 10, name: "Javier Romero",    email: "javier@empresa.com",  role: "Editor", status: "inactive", joinedAt: "2024-06-14" },
  { id: 11, name: "Elena Vega",       email: "elena@empresa.com",   role: "Admin",  status: "active",   joinedAt: "2024-07-02" },
  { id: 12, name: "Roberto Blanco",   email: "roberto@empresa.com", role: "Viewer", status: "active",   joinedAt: "2024-08-19" },
]

export const MONTHLY = [
  { mes: "Ene", registros: 2, activos: 1 },
  { mes: "Feb", registros: 4, activos: 3 },
  { mes: "Mar", registros: 3, activos: 2 },
  { mes: "Abr", registros: 5, activos: 4 },
  { mes: "May", registros: 7, activos: 6 },
  { mes: "Jun", registros: 4, activos: 2 },
  { mes: "Jul", registros: 8, activos: 7 },
  { mes: "Ago", registros: 6, activos: 5 },
]

export const ACTIVITY = [
  { dia: "Lun", sesiones: 34 },
  { dia: "Mar", sesiones: 52 },
  { dia: "Mié", sesiones: 41 },
  { dia: "Jue", sesiones: 67 },
  { dia: "Vie", sesiones: 58 },
  { dia: "Sáb", sesiones: 23 },
  { dia: "Dom", sesiones: 18 },
]

export const BY_ROLE = [
  { rol: "Admin",  total: 3 },
  { rol: "Editor", total: 4 },
  { rol: "Viewer", total: 5 },
]

export const ROLE_BADGE: Record<Role, "default" | "info" | "muted"> = {
  Admin:  "default",
  Editor: "info",
  Viewer: "muted",
}

export const STAT_BADGE: Record<Status, "success" | "muted"> = {
  active:   "success",
  inactive: "muted",
}

export const EMPTY: UserForm = {
  name: "", email: "", role: "Viewer", status: "active", joinedAt: "",
}

export const FILTER_CFG: FilterConfig[] = [
  {
    key: "q",
    label: "Buscar",
    type: "text",
    placeholder: "Nombre o email...",
  },
  {
    key: "role",
    label: "Rol",
    type: "select",
    placeholder: "Todos",
    options: [
      { label: "Admin",  value: "Admin" },
      { label: "Editor", value: "Editor" },
      { label: "Viewer", value: "Viewer" },
    ],
  },
  {
    key: "status",
    label: "Estado",
    type: "select",
    placeholder: "Todos",
    options: [
      { label: "Activo",   value: "active" },
      { label: "Inactivo", value: "inactive" },
    ],
  },
  { key: "joined", label: "Alta en", type: "daterange" },
]

export const NAV_CONFIG: { id: Section; label: string }[] = [
  { id: "dashboard",  label: "Dashboard" },
  { id: "usuarios",   label: "Usuarios" },
  { id: "analiticas", label: "Analíticas" },
  { id: "roles",      label: "Roles" },
]
