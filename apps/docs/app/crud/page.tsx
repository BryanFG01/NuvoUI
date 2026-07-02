"use client"

import * as React from "react"
import {
  DataTable,
  Badge,
  Button,
  Modal,
  Input,
  StatCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle } from "../doc-ui"

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Role   = "Admin" | "Editor" | "Viewer"
type Status = "active" | "inactive"

interface User {
  id:        number
  name:      string
  email:     string
  role:      Role
  status:    Status
  joinedAt:  string
}

// ─── Datos iniciales ──────────────────────────────────────────────────────────
const INITIAL_USERS: User[] = [
  { id: 1, name: "Ana García",      email: "ana@empresa.com",     role: "Admin",  status: "active",   joinedAt: "2024-01-15" },
  { id: 2, name: "Carlos López",    email: "carlos@empresa.com",  role: "Editor", status: "active",   joinedAt: "2024-02-03" },
  { id: 3, name: "María Torres",    email: "maria@empresa.com",   role: "Viewer", status: "inactive", joinedAt: "2024-02-20" },
  { id: 4, name: "Luis Martínez",   email: "luis@empresa.com",    role: "Editor", status: "active",   joinedAt: "2024-03-05" },
  { id: 5, name: "Sara Ruiz",       email: "sara@empresa.com",    role: "Viewer", status: "active",   joinedAt: "2024-03-18" },
  { id: 6, name: "Pedro Sanz",      email: "pedro@empresa.com",   role: "Admin",  status: "inactive", joinedAt: "2024-04-01" },
  { id: 7, name: "Laura Jiménez",   email: "laura@empresa.com",   role: "Editor", status: "active",   joinedAt: "2024-04-22" },
  { id: 8, name: "Diego Moreno",    email: "diego@empresa.com",   role: "Viewer", status: "active",   joinedAt: "2024-05-10" },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusVariant: Record<Status, "success" | "muted"> = {
  active:   "success",
  inactive: "muted",
}

const roleVariant: Record<Role, "default" | "info" | "muted"> = {
  Admin:  "default",
  Editor: "info",
  Viewer: "muted",
}

const EMPTY_FORM = { name: "", email: "", role: "Viewer" as Role, status: "active" as Status }

// ─── Componente CRUD ──────────────────────────────────────────────────────────
export default function CrudPage() {
  const [users, setUsers]           = React.useState<User[]>(INITIAL_USERS)
  const [formOpen, setFormOpen]     = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [editing, setEditing]       = React.useState<User | null>(null)
  const [toDelete, setToDelete]     = React.useState<User | null>(null)
  const [form, setForm]             = React.useState(EMPTY_FORM)
  const [errors, setErrors]         = React.useState<Partial<typeof EMPTY_FORM>>({})

  // ── Estadísticas ───────────────────────────────────────────────────────────
  const stats = React.useMemo(() => ({
    total:    users.length,
    active:   users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    admins:   users.filter((u) => u.role === "Admin").length,
  }), [users])

  // ── Formulario ─────────────────────────────────────────────────────────────
  function openCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setFormOpen(true)
  }

  function openEdit(user: User) {
    setEditing(user)
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status })
    setErrors({})
    setFormOpen(true)
  }

  function validate(): boolean {
    const e: Partial<typeof EMPTY_FORM> = {}
    if (!form.name.trim())                          e.name  = "El nombre es obligatorio."
    if (!form.email.trim())                         e.email = "El email es obligatorio."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "El email no es válido."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSave() {
    if (!validate()) return
    if (editing) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editing.id ? { ...u, ...form } : u))
      )
    } else {
      const newUser: User = {
        ...form,
        id: Math.max(0, ...users.map((u) => u.id)) + 1,
        joinedAt: new Date().toISOString().split("T")[0]!,
      }
      setUsers((prev) => [...prev, newUser])
    }
    setFormOpen(false)
  }

  // ── Eliminar ───────────────────────────────────────────────────────────────
  function openDelete(user: User) {
    setToDelete(user)
    setDeleteOpen(true)
  }

  function handleDelete() {
    if (toDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== toDelete.id))
    }
    setDeleteOpen(false)
    setToDelete(null)
  }

  // ── Toggle estado ──────────────────────────────────────────────────────────
  function toggleStatus(user: User) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    )
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <DocTitle>CRUD — Gestión de usuarios</DocTitle>
          <DocSubtitle>
            Ejemplo completo: DataTable + Modal + Badge + StatCard + Input.
            Agregar, editar, eliminar y cambiar estado sin backend.
          </DocSubtitle>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          + Agregar usuario
        </Button>
      </div>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total usuarios"   value={stats.total}    trend="neutral" />
        <StatCard title="Activos"          value={stats.active}   trend="up" change={Math.round((stats.active / stats.total) * 100)} changeLabel="%" />
        <StatCard title="Inactivos"        value={stats.inactive} trend={stats.inactive > 0 ? "down" : "neutral"} />
        <StatCard title="Administradores"  value={stats.admins}   trend="neutral" />
      </div>

      {/* ── Tabla ──────────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios del sistema</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <DataTable<User>
            data={users}
            searchable
            paginate
            pageSize={5}
            emptyText="No se encontraron usuarios."
            className="px-4"
            columns={[
              {
                key: "name",
                label: "Usuario",
                sortable: true,
                render: (_, row) => (
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{row.name}</span>
                    <span className="text-xs text-muted-foreground">{row.email}</span>
                  </div>
                ),
              },
              {
                key: "role",
                label: "Rol",
                sortable: true,
                render: (value) => (
                  <Badge variant={roleVariant[value as Role]} size="sm">
                    {value as string}
                  </Badge>
                ),
              },
              {
                key: "status",
                label: "Estado",
                sortable: true,
                render: (value, row) => (
                  <button
                    onClick={() => toggleStatus(row as User)}
                    title="Click para cambiar estado"
                    className="cursor-pointer"
                  >
                    <Badge variant={statusVariant[value as Status]} dot size="sm">
                      {value === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </button>
                ),
              },
              {
                key: "joinedAt",
                label: "Alta",
                render: (value) => (
                  <span className="text-xs text-muted-foreground">
                    {new Date(value as string).toLocaleDateString("es-ES", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </span>
                ),
              },
              {
                key: "id",
                label: "",
                render: (_, row) => (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(row as User)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => openDelete(row as User)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* ── Modal formulario (crear / editar) ─────────────────────────────── */}
      <Modal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editing ? `Editar usuario — ${editing.name}` : "Agregar usuario"}
        description={editing ? "Modifica los datos del usuario." : "El usuario recibirá un email de bienvenida."}
      >
        <div className="space-y-4">
          <Input
            label="Nombre completo"
            placeholder="Ana García"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            errorMessage={errors.name}
          />
          <Input
            label="Email"
            type="email"
            placeholder="ana@empresa.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            errorMessage={errors.email}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Rol */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Rol</label>
              <div className="flex flex-wrap gap-1.5">
                {(["Admin", "Editor", "Viewer"] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, role: r }))}
                    className="focus:outline-none focus:ring-2 focus:ring-ring rounded-full"
                  >
                    <Badge
                      variant={form.role === r ? roleVariant[r] : "muted"}
                      size="sm"
                      className="cursor-pointer"
                    >
                      {r}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Estado */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Estado</label>
              <div className="flex gap-1.5">
                {(["active", "inactive"] as Status[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, status: s }))}
                    className="focus:outline-none focus:ring-2 focus:ring-ring rounded-full"
                  >
                    <Badge
                      variant={form.status === s ? statusVariant[s] : "muted"}
                      dot={form.status === s}
                      size="sm"
                      className="cursor-pointer"
                    >
                      {s === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modal.Footer>
          <Button variant="outline" onClick={() => setFormOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {editing ? "Guardar cambios" : "Agregar usuario"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ── Modal confirmación eliminar ────────────────────────────────────── */}
      <Modal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Eliminar usuario"
        description={
          toDelete
            ? `¿Eliminar a ${toDelete.name} (${toDelete.email})? Esta acción no se puede deshacer.`
            : ""
        }
      >
        <Modal.Footer>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
