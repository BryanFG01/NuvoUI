"use client"

import * as React from "react"
import { DataTable, Badge, Button } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider, DocNote } from "../doc-ui"

const users = [
  { id: 1, name: "Ana García",    email: "ana@empresa.com",    role: "Admin",  status: "active" },
  { id: 2, name: "Carlos López",  email: "carlos@empresa.com", role: "Editor", status: "inactive" },
  { id: 3, name: "María Torres",  email: "maria@empresa.com",  role: "Viewer", status: "active" },
  { id: 4, name: "Luis Martínez", email: "luis@empresa.com",   role: "Editor", status: "active" },
  { id: 5, name: "Sara Ruiz",     email: "sara@empresa.com",   role: "Viewer", status: "active" },
  { id: 6, name: "Pedro Sanz",    email: "pedro@empresa.com",  role: "Admin",  status: "inactive" },
]

const statusVariant = {
  active:   "success",
  inactive: "muted",
} as const

export default function DataTablePage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>DataTable</DocTitle>
        <DocSubtitle>
          Tabla con API progresiva de 3 capas. Usa solo lo que necesitas: desde JSON puro
          hasta compound components con render functions completas.
        </DocSubtitle>
      </div>

      <DocInstall component="data-table" />

      <DocDivider />

      {/* ── Capa 1 ── */}
      <DocSection
        title="Capa 1 — JSON puro"
        description="El 90% de las tablas. Define columnas con key + label. Sin JSX adicional."
      >
        <Preview>
          <DataTable
            data={users}
            columns={[
              { key: "name",  label: "Nombre" },
              { key: "email", label: "Email" },
              { key: "role",  label: "Rol" },
            ]}
          />
        </Preview>
        <Code code={`<DataTable
  data={users}
  columns={[
    { key: "name",  label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "role",  label: "Rol" },
  ]}
/>`} />
      </DocSection>

      <DocDivider />

      {/* ── Capa 2 ── */}
      <DocSection
        title="Capa 2 — JSON + render()"
        description="Añade render functions solo donde necesitas personalizar una celda. Sorting y búsqueda incluidos."
      >
        <Preview>
          <DataTable
            data={users}
            searchable
            columns={[
              { key: "name",   label: "Nombre",  sortable: true },
              { key: "email",  label: "Email" },
              { key: "role",   label: "Rol",     sortable: true },
              {
                key: "status",
                label: "Estado",
                render: (value) => (
                  <Badge
                    variant={statusVariant[value as keyof typeof statusVariant] ?? "muted"}
                    dot
                    size="sm"
                  >
                    {value === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                ),
              },
              {
                key: "id",
                label: "",
                render: (_, row) => (
                  <Button variant="ghost" size="sm">
                    Ver {(row as { name: string }).name}
                  </Button>
                ),
              },
            ]}
          />
        </Preview>
        <Code code={`<DataTable
  data={users}
  searchable
  columns={[
    { key: "name",   label: "Nombre", sortable: true },
    { key: "email",  label: "Email" },
    {
      key: "status",
      label: "Estado",
      render: (value) => (
        <Badge variant={value === "active" ? "success" : "muted"} dot size="sm">
          {value === "active" ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      key: "id",
      label: "",
      render: (_, row) => (
        <Button variant="ghost" size="sm" onClick={() => handleView(row)}>
          Ver
        </Button>
      ),
    },
  ]}
/>`} />
      </DocSection>

      <DocDivider />

      {/* ── Capa 3 ── */}
      <DocSection
        title="Capa 3 — Compound components"
        description="Control total. DataTable.Column acepta una función render como children. Soporta paginación."
      >
        <Preview>
          <DataTable data={users} paginate pageSize={3}>
            <DataTable.Column columnKey="name" label="Nombre" sortable>
              {({ value, row }) => (
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {(row as { name: string }).name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(row as { email: string }).email}
                  </span>
                </div>
              )}
            </DataTable.Column>
            <DataTable.Column columnKey="role" label="Rol" sortable>
              {({ value }) => (
                <span className="font-medium text-foreground">{value as string}</span>
              )}
            </DataTable.Column>
            <DataTable.Column columnKey="status" label="Estado">
              {({ value }) => (
                <Badge
                  variant={statusVariant[value as keyof typeof statusVariant] ?? "muted"}
                  dot
                  size="sm"
                >
                  {value === "active" ? "Activo" : "Inactivo"}
                </Badge>
              )}
            </DataTable.Column>
          </DataTable>
        </Preview>
        <Code code={`<DataTable data={users} paginate pageSize={10}>
  <DataTable.Column columnKey="name" label="Nombre" sortable>
    {({ value, row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.name}</span>
        <span className="text-xs text-muted-foreground">{row.email}</span>
      </div>
    )}
  </DataTable.Column>
  <DataTable.Column columnKey="status" label="Estado">
    {({ value }) => (
      <Badge variant={value === "active" ? "success" : "muted"} dot size="sm">
        {value}
      </Badge>
    )}
  </DataTable.Column>
</DataTable>`} />
        <DocNote>
          La paginación, el sorting y la búsqueda global son opcionales y se pueden
          combinar en cualquier capa.
        </DocNote>
      </DocSection>

      <DocDivider />

      {/* ── Props ── */}
      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "data",       type: "T[]",               description: "Array de datos a mostrar" },
            { name: "columns",    type: "ColumnDef<T>[]",    default: "—",     description: "Definición de columnas (Capas 1 y 2)" },
            { name: "children",   type: "ReactNode",         default: "—",     description: "DataTable.Column para Capa 3" },
            { name: "searchable", type: "boolean",           default: "false", description: "Muestra input de búsqueda global" },
            { name: "paginate",   type: "boolean",           default: "false", description: "Activa paginación con controles" },
            { name: "pageSize",   type: "number",            default: "10",    description: "Filas por página" },
            { name: "loading",    type: "boolean",           default: "false", description: "Muestra skeleton de carga" },
            { name: "emptyText",  type: "string",            default: "\"Sin datos.\"", description: "Texto cuando no hay resultados" },
          ]}
        />
        <PropsTable
          props={[
            { name: "key",      type: "string",          description: "Campo del objeto de datos" },
            { name: "label",    type: "string",          description: "Título de la columna" },
            { name: "sortable", type: "boolean",         default: "false", description: "Permite ordenar al hacer click" },
            { name: "render",   type: "(value, row, index) => ReactNode", default: "—", description: "Render function de la celda (Capa 2)" },
          ]}
        />
      </DocSection>
    </div>
  )
}
