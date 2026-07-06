"use client"

import * as React from "react"
import { Badge, Button, DatePicker, Input, Modal } from "@nuvo-ui/ui"
import { Role, Status, User, UserForm } from "../types"
import { ROLE_BADGE, STAT_BADGE } from "../data"

interface UserFormModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  editing: User | null
  form: UserForm
  setForm: React.Dispatch<React.SetStateAction<UserForm>>
  errors: Partial<UserForm>
  onSave: () => void
}

export function UserFormModal({
  open, onOpenChange, editing, form, setForm, errors, onSave,
}: UserFormModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={editing ? `Editar — ${editing.name}` : "Nuevo usuario"}
      description={editing ? "Modifica los datos del usuario." : "Completa los datos para crear el usuario."}
    >
      <div className="space-y-4">
        <Input
          label="Nombre"
          placeholder="Ana García"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          errorMessage={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="ana@empresa.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          errorMessage={errors.email}
        />
        <DatePicker
          label="Fecha de alta"
          value={form.joinedAt || undefined}
          onChange={v => setForm(f => ({ ...f, joinedAt: v ?? "" }))}
          max={new Date().toISOString().slice(0, 10)}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Rol</label>
            <div className="flex flex-wrap gap-1.5">
              {(["Admin", "Editor", "Viewer"] as Role[]).map(r => (
                <button key={r} type="button" onClick={() => setForm(f => ({ ...f, role: r }))}>
                  <Badge variant={form.role === r ? ROLE_BADGE[r] : "muted"} size="sm" className="cursor-pointer">
                    {r}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Estado</label>
            <div className="flex gap-1.5">
              {(["active", "inactive"] as Status[]).map(s => (
                <button key={s} type="button" onClick={() => setForm(f => ({ ...f, status: s }))}>
                  <Badge
                    variant={form.status === s ? STAT_BADGE[s] : "muted"}
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
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={onSave}>{editing ? "Guardar" : "Crear usuario"}</Button>
      </Modal.Footer>
    </Modal>
  )
}
