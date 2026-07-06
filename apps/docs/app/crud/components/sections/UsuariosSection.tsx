"use client"

import * as React from "react"
import {
  Badge, Button, Card, CardContent, CardHeader, CardTitle,
  DataTable, DynamicFilter, FilterValues, FloatingActions,
} from "@nuvo-ui/ui"
import { Role, Status, User } from "../../types"
import { FILTER_CFG, ROLE_BADGE, STAT_BADGE } from "../../data"
import { IconDownload, IconPlus } from "../../icons"

interface UsuariosSectionProps {
  users: User[]
  filtered: User[]
  filters: FilterValues
  onFilterChange: (v: FilterValues) => void
  onEdit: (u: User) => void
  onDelete: (u: User) => void
  onToggleStatus: (u: User) => void
  onNewUser: () => void
  onExportCSV: () => void
}

export function UsuariosSection({
  users, filtered, filters, onFilterChange,
  onEdit, onDelete, onToggleStatus, onNewUser, onExportCSV,
}: UsuariosSectionProps) {
  const floatRef = React.useRef<HTMLDivElement>(null)

  return (
    <div ref={floatRef} className="relative space-y-4" style={{ minHeight: "600px" }}>
      <div>
        <h2 className="text-xl font-bold text-foreground">Gestión de usuarios</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Crear, editar, filtrar y eliminar usuarios del sistema.</p>
      </div>

      <DynamicFilter filters={FILTER_CFG} value={filters} onChange={onFilterChange} title="Filtros" />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            Usuarios
            {filtered.length !== users.length && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({filtered.length} de {users.length})
              </span>
            )}
          </CardTitle>
          <Button size="sm" variant="outline" onClick={onExportCSV}>
            <span className="mr-1.5"><IconDownload /></span>CSV
          </Button>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <DataTable<User>
            data={filtered}
            paginate
            pageSize={6}
            emptyText="Sin resultados para esos filtros."
            columns={[
              {
                key: "name",
                label: "Usuario",
                sortable: true,
                render: (_, r) => (
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.email}</p>
                  </div>
                ),
              },
              {
                key: "role",
                label: "Rol",
                sortable: true,
                render: v => <Badge variant={ROLE_BADGE[v as Role]} size="sm">{v as string}</Badge>,
              },
              {
                key: "status",
                label: "Estado",
                sortable: true,
                render: (v, r) => (
                  <button onClick={() => onToggleStatus(r as User)} title="Cambiar estado">
                    <Badge variant={STAT_BADGE[v as Status]} dot size="sm">
                      {v === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </button>
                ),
              },
              {
                key: "joinedAt",
                label: "Alta",
                render: v => (
                  <span className="text-xs text-muted-foreground">
                    {new Date(v as string).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                ),
              },
              {
                key: "id",
                label: "",
                render: (_, r) => (
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(r as User)}>Editar</Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onDelete(r as User)}
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

      <FloatingActions
        contained
        containerRef={floatRef}
        variant="default"
        actions={[
          { key: "new",    label: "Nuevo usuario", icon: <IconPlus />,     onClick: onNewUser },
          { key: "export", label: "Exportar CSV",  icon: <IconDownload />, onClick: onExportCSV },
        ]}
      />
    </div>
  )
}
