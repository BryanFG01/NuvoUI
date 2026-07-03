"use client"

import * as React from "react"
import { DynamicFilter, type FilterConfig, type FilterValues } from "@nuvo-ui/ui"
import {
  DocTitle, DocSubtitle, DocInstall, DocSection,
  Preview, Code, PropsTable, DocDivider, DocNote,
} from "../doc-ui"

// ─── Datos de ejemplo ──────────────────────────────────────────────────────────

const SAMPLE_DATA = [
  { id: 1, name: "Ana García",    role: "admin",  status: "active",   score: 92, date: "2024-03-15", verified: true  },
  { id: 2, name: "Luis Martínez", role: "editor", status: "inactive", score: 74, date: "2024-01-08", verified: false },
  { id: 3, name: "Sara López",    role: "viewer", status: "active",   score: 88, date: "2024-06-22", verified: true  },
  { id: 4, name: "Carlos Ruiz",   role: "admin",  status: "active",   score: 55, date: "2023-11-30", verified: false },
  { id: 5, name: "Marta Díaz",    role: "editor", status: "inactive", score: 67, date: "2024-09-04", verified: true  },
  { id: 6, name: "Jorge Pérez",   role: "viewer", status: "active",   score: 91, date: "2024-02-17", verified: false },
]

// ─── Config de filtros ─────────────────────────────────────────────────────────

const FILTERS: FilterConfig[] = [
  {
    key: "search",
    label: "Buscar",
    type: "text",
    placeholder: "Nombre...",
  },
  {
    key: "role",
    label: "Rol",
    type: "multiselect",
    placeholder: "Todos los roles",
    options: [
      { label: "Admin",  value: "admin"  },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ],
  },
  {
    key: "status",
    label: "Estado",
    type: "select",
    placeholder: "Todos",
    options: [
      { label: "Activo",   value: "active"   },
      { label: "Inactivo", value: "inactive" },
    ],
  },
  {
    key: "date",
    label: "Fecha registro",
    type: "daterange",
  },
  {
    key: "minScore",
    label: "Score mínimo",
    type: "number",
    placeholder: "0",
    min: 0,
    max: 100,
  },
  {
    key: "verified",
    label: "Verificados",
    type: "boolean",
    placeholder: "Solo verificados",
  },
]

// ─── Lógica de filtrado ────────────────────────────────────────────────────────

function applyFilters(data: typeof SAMPLE_DATA, values: FilterValues) {
  return data.filter((row) => {
    const search = values.search as string | undefined
    if (search && !row.name.toLowerCase().includes(search.toLowerCase())) return false

    const roles = values.role as string[] | undefined
    if (roles?.length && !roles.includes(row.role)) return false

    const status = values.status as string | undefined
    if (status && row.status !== status) return false

    const dateRange = values.date as { from?: string; to?: string } | undefined
    if (dateRange?.from && row.date < dateRange.from) return false
    if (dateRange?.to   && row.date > dateRange.to)   return false

    const minScore = values.minScore as string | undefined
    if (minScore && row.score < Number(minScore)) return false

    if (values.verified && !row.verified) return false

    return true
  })
}

// ─── Demo ──────────────────────────────────────────────────────────────────────

function Demo() {
  const [filterValues, setFilterValues] = React.useState<FilterValues>({})
  const filtered = applyFilters(SAMPLE_DATA, filterValues)

  return (
    <div className="space-y-4">
      <DynamicFilter
        filters={FILTERS}
        value={filterValues}
        onChange={setFilterValues}
      />

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              {["Nombre", "Rol", "Estado", "Score", "Fecha", "Verificado"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted-foreground">
                  Sin resultados para los filtros aplicados
                </td>
              </tr>
            ) : filtered.map((row) => (
              <tr key={row.id} className="hover:bg-muted/30">
                <td className="px-4 py-2.5 font-medium text-foreground">{row.name}</td>
                <td className="px-4 py-2.5 capitalize text-muted-foreground">{row.role}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    row.status === "active"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {row.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{row.score}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{row.date}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{row.verified ? "✓" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} de {SAMPLE_DATA.length} registros
      </p>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DynamicFilterPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>DynamicFilter</DocTitle>
        <DocSubtitle>
          Barra de filtros configurable por JSON. Soporta text, select, multiselect,
          date, daterange, boolean y number. Muestra conteo de filtros activos y permite
          limpiarlos todos de un clic.
        </DocSubtitle>
      </div>

      <DocInstall component="dynamic-filter" />

      <DocSection title="Demo interactivo" description="Todos los tipos de filtro conectados a una tabla de datos en tiempo real.">
        <Preview>
          <Demo />
        </Preview>
      </DocSection>

      <DocDivider />

      <DocSection title="Uso básico">
        <Code code={`import { DynamicFilter, type FilterConfig, type FilterValues } from "@/components/ui/dynamic-filter"
import { useState } from "react"

const filters: FilterConfig[] = [
  { key: "search",   label: "Buscar",   type: "text"        },
  { key: "status",   label: "Estado",   type: "select",
    options: [{ label: "Activo", value: "active" }, { label: "Inactivo", value: "inactive" }] },
  { key: "roles",    label: "Roles",    type: "multiselect",
    options: [{ label: "Admin", value: "admin" }, { label: "Editor", value: "editor" }] },
  { key: "date",     label: "Fecha",    type: "daterange"   },
  { key: "score",    label: "Score min",type: "number", min: 0, max: 100 },
  { key: "verified", label: "Verificados", type: "boolean"  },
]

export function MyPage() {
  const [values, setValues] = useState<FilterValues>({})

  // Leer valores:
  // values.search    → string | undefined
  // values.status    → string | undefined
  // values.roles     → string[] | undefined
  // values.date      → { from?: string; to?: string } | undefined
  // values.score     → string | undefined
  // values.verified  → true | undefined

  return (
    <DynamicFilter
      filters={filters}
      value={values}
      onChange={setValues}
    />
  )
}`} />
        <DocNote>
          El objeto <code>values</code> solo contiene las claves con valor. Un filtro sin
          seleccionar simplemente no aparece como propiedad (o es <code>undefined</code>).
        </DocNote>
      </DocSection>

      <DocDivider />

      <DocSection title="Props — DynamicFilter">
        <PropsTable
          props={[
            { name: "filters",          type: "FilterConfig[]",             description: "Configuración declarativa de los filtros a mostrar" },
            { name: "value",            type: "FilterValues",  default: "{}", description: "Objeto controlado con los valores actuales de los filtros" },
            { name: "onChange",         type: "(values: FilterValues) => void", default: "—", description: "Callback al cambiar cualquier filtro — recibe el objeto completo actualizado" },
            { name: "title",            type: "string",        default: '"Filtros"', description: "Título del header de la barra de filtros" },
            { name: "defaultExpanded",  type: "boolean",       default: "true",      description: "Si los filtros se muestran expandidos al montar" },
            { name: "className",        type: "string",        default: "—",         description: "Clases CSS adicionales en el contenedor raíz" },
          ]}
        />
      </DocSection>

      <DocSection title="Tipo FilterConfig">
        <PropsTable
          props={[
            { name: "key",         type: "string",      description: "Clave única del filtro — se usa como propiedad en el objeto values" },
            { name: "label",       type: "string",      description: "Etiqueta visible encima del campo" },
            { name: "type",        type: '"text" | "select" | "multiselect" | "date" | "daterange" | "boolean" | "number"', description: "Tipo de campo a renderizar" },
            { name: "placeholder", type: "string",      default: "—", description: "Texto de placeholder o label del toggle boolean" },
            { name: "options",     type: "FilterOption[]", default: "—", description: "Opciones para select y multiselect: { label, value }[]" },
            { name: "min",         type: "string | number", default: "—", description: "Valor mínimo para date y number" },
            { name: "max",         type: "string | number", default: "—", description: "Valor máximo para date y number" },
          ]}
        />
      </DocSection>
    </div>
  )
}
