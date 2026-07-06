"use client"

import * as React from "react"
import { FilterValues } from "@nuvo-ui/ui"
import { Stats, User, UserForm } from "../types"
import { EMPTY, USERS_INIT } from "../data"

export function useUsers() {
  const [users,      setUsers]      = React.useState<User[]>(USERS_INIT)
  const [filters,    setFilters]    = React.useState<FilterValues>({})
  const [formOpen,   setFormOpen]   = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [editing,    setEditing]    = React.useState<User | null>(null)
  const [toDelete,   setToDelete]   = React.useState<User | null>(null)
  const [form,       setForm]       = React.useState<UserForm>(EMPTY)
  const [errors,     setErrors]     = React.useState<Partial<UserForm>>({})

  const stats: Stats = React.useMemo(() => ({
    total:    users.length,
    active:   users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
    admins:   users.filter(u => u.role   === "Admin").length,
  }), [users])

  const filtered = React.useMemo(() => {
    let list = [...users]
    const q      = filters.q      as string | undefined
    const role   = filters.role   as string | undefined
    const status = filters.status as string | undefined
    const joined = filters.joined as { from?: string; to?: string } | undefined
    if (q)            list = list.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))
    if (role)         list = list.filter(u => u.role   === role)
    if (status)       list = list.filter(u => u.status === status)
    if (joined?.from) list = list.filter(u => u.joinedAt >= joined.from!)
    if (joined?.to)   list = list.filter(u => u.joinedAt <= joined.to!)
    return list
  }, [users, filters])

  function openCreate() {
    setEditing(null)
    setForm(EMPTY)
    setErrors({})
    setFormOpen(true)
  }

  function openEdit(u: User) {
    setEditing(u)
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status, joinedAt: u.joinedAt })
    setErrors({})
    setFormOpen(true)
  }

  function validate(): boolean {
    const e: Partial<UserForm> = {}
    if (!form.name.trim()) e.name = "Obligatorio."
    if (!form.email.trim()) e.email = "Obligatorio."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido."
    setErrors(e)
    return !Object.keys(e).length
  }

  function handleSave() {
    if (!validate()) return
    if (editing) {
      setUsers(p => p.map(u => u.id === editing.id ? { ...u, ...form } : u))
    } else {
      setUsers(p => [
        ...p,
        { ...form, id: Math.max(0, ...p.map(u => u.id)) + 1, joinedAt: form.joinedAt || new Date().toISOString().slice(0, 10) },
      ])
    }
    setFormOpen(false)
  }

  function handleDelete() {
    if (toDelete) setUsers(p => p.filter(u => u.id !== toDelete.id))
    setDeleteOpen(false)
    setToDelete(null)
  }

  function toggleStatus(u: User) {
    setUsers(p => p.map(x => x.id === u.id ? { ...x, status: x.status === "active" ? "inactive" : "active" } : x))
  }

  function exportCSV() {
    const csv = [
      ["ID", "Nombre", "Email", "Rol", "Estado", "Alta"],
      ...users.map(u => [u.id, u.name, u.email, u.role, u.status, u.joinedAt]),
    ].map(r => r.join(",")).join("\n")
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    a.download = "usuarios.csv"
    a.click()
  }

  return {
    users, filtered, stats,
    filters, setFilters,
    form, setForm, errors,
    editing, toDelete,
    formOpen, setFormOpen,
    deleteOpen, setDeleteOpen, setToDelete,
    openCreate, openEdit, handleSave, handleDelete, toggleStatus, exportCSV,
  }
}
