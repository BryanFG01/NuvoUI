"use client"

import * as React from "react"
import { DataGrid, Badge, Button } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider, DocNote } from "../doc-ui"

const initialData = [
  { id: 1, name: "Ana García",    email: "ana@empresa.com",    role: "Admin",  status: "active",   score: 98 },
  { id: 2, name: "Carlos López",  email: "carlos@empresa.com", role: "Editor", status: "active",   score: 74 },
  { id: 3, name: "María Torres",  email: "maria@empresa.com",  role: "Viewer", status: "inactive", score: 55 },
  { id: 4, name: "Luis Martínez", email: "luis@empresa.com",   role: "Editor", status: "active",   score: 88 },
  { id: 5, name: "Sara Ruiz",     email: "sara@empresa.com",   role: "Viewer", status: "active",   score: 62 },
  { id: 6, name: "Pedro Sanz",    email: "pedro@empresa.com",  role: "Admin",  status: "inactive", score: 91 },
]

export default function DataGridPage() {
  const [data, setData] = React.useState(initialData)
  const [selected, setSelected] = React.useState<typeof initialData>([])

  function handleCellEdit(id: unknown, key: string, value: unknown) {
    setData(prev => prev.map(row =>
      row.id === id ? { ...row, [key]: value } : row
    ))
  }

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>DataGrid</DocTitle>
        <DocSubtitle>
          Tabla avanzada con edición inline, selección de filas, visibilidad de columnas
          y exportación CSV. Para cuando necesitas más que un DataTable simple.
        </DocSubtitle>
      </div>

      <DocInstall component="data-grid" />
      <DocDivider />

      <DocSection
        title="Demo completo"
        description="Haz click en una celda editable (Nombre, Email, Rol) para editar inline. Selecciona filas con el checkbox."
      >
        {selected.length > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <span>{selected.length} fila(s) seleccionada(s)</span>
            <Button size="sm" variant="outline" onClick={() => setSelected([])}>Limpiar</Button>
          </div>
        )}
        <Preview className="p-0 pt-4">
          <DataGrid
            data={data}
            columns={[
              { key: "name",   label: "Nombre",  sortable: true, editable: true, type: "text" },
              { key: "email",  label: "Email",   sortable: true, editable: true, type: "text" },
              { key: "role",   label: "Rol",     sortable: true, editable: true, type: "select", options: ["Admin", "Editor", "Viewer"] },
              { key: "score",  label: "Score",   sortable: true, editable: true, type: "number" },
              {
                key: "status",
                label: "Estado",
                render: (v) => (
                  <Badge variant={v === "active" ? "success" : "muted"} dot size="sm">
                    {v === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                ),
              },
            ]}
            idKey="id"
            selectable
            searchable
            exportable
            paginate
            pageSize={4}
            onCellEdit={handleCellEdit}
            onRowSelect={setSelected}
            className="px-4 pb-4"
          />
        </Preview>
        <Code code={`const [data, setData] = React.useState(initialUsers)

<DataGrid
  data={data}
  columns={[
    { key: "name",  label: "Nombre", sortable: true, editable: true },
    { key: "email", label: "Email",  sortable: true, editable: true },
    { key: "role",  label: "Rol",    editable: true,
      type: "select", options: ["Admin", "Editor", "Viewer"] },
    { key: "status", label: "Estado",
      render: (v) => <Badge variant={v === "active" ? "success" : "muted"}>{v}</Badge> },
  ]}
  idKey="id"
  selectable
  searchable
  exportable
  paginate
  pageSize={10}
  onCellEdit={(id, key, value) => {
    setData(prev => prev.map(r => r.id === id ? { ...r, [key]: value } : r))
  }}
  onRowSelect={(rows) => setSelected(rows)}
/>`} />
        <DocNote>
          Las celdas con <code>editable: true</code> muestran un cursor pointer. Click para editar,
          Enter para confirmar, Escape para cancelar.
        </DocNote>
      </DocSection>

      <DocDivider />

      <DocSection title="Diferencias con DataTable">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                {["Feature", "DataTable", "DataGrid"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {[
                ["API de 3 capas (JSON/render/compound)", "✓", "✗"],
                ["Edición inline de celdas", "✗", "✓"],
                ["Selección de filas con checkbox", "✗", "✓"],
                ["Visibilidad de columnas", "✗", "✓"],
                ["Exportar CSV", "✗", "✓"],
                ["Sorting, búsqueda, paginación", "✓", "✓"],
                ["Skeleton de carga", "✓", "✓"],
              ].map(([f, dt, dg]) => (
                <tr key={f} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5 text-muted-foreground">{f}</td>
                  <td className="px-4 py-2.5 text-center">{dt}</td>
                  <td className="px-4 py-2.5 text-center">{dg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "data",         type: "T[]",                   description: "Array de datos" },
            { name: "columns",      type: "DataGridColumnDef<T>[]", description: "Definición de columnas" },
            { name: "idKey",        type: "string",  default: '"id"',   description: "Campo que identifica cada fila" },
            { name: "selectable",   type: "boolean", default: "false",  description: "Habilita columna de checkboxes" },
            { name: "searchable",   type: "boolean", default: "false",  description: "Barra de búsqueda global" },
            { name: "exportable",   type: "boolean", default: "false",  description: "Botón de exportar CSV" },
            { name: "paginate",     type: "boolean", default: "false",  description: "Controles de paginación" },
            { name: "onCellEdit",   type: "(id, key, value) => void", default: "—", description: "Callback al editar una celda" },
            { name: "onRowSelect",  type: "(rows: T[]) => void",      default: "—", description: "Callback al seleccionar filas" },
          ]}
        />
      </DocSection>
    </div>
  )
}
