"use client"

import * as React from "react"
import { ExportCSV } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

const USERS = [
  { id: 1, nombre: "Ana López",    email: "ana@empresa.com",    rol: "Admin",  estado: "Activo",   fecha: "2024-01-15" },
  { id: 2, nombre: "Carlos García",email: "carlos@empresa.com", rol: "Editor", estado: "Activo",   fecha: "2024-02-20" },
  { id: 3, nombre: "María Pérez",  email: "maria@empresa.com",  rol: "Viewer", estado: "Inactivo", fecha: "2024-03-10" },
  { id: 4, nombre: "Juan Díaz",    email: "juan@empresa.com",   rol: "Editor", estado: "Activo",   fecha: "2024-04-05" },
  { id: 5, nombre: "Sofía Ruiz",   email: "sofia@empresa.com",  rol: "Admin",  estado: "Activo",   fecha: "2024-05-18" },
]

export default function ExportCSVPage() {
  const [exported, setExported] = React.useState<number | null>(null)

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>ExportCSV</DocTitle>
        <DocSubtitle>
          Botón de descarga CSV con mapeo de columnas, formato personalizado, BOM UTF-8 y contador de filas.
        </DocSubtitle>
      </div>

      <DocInstall component="export-csv" />
      <DocDivider />

      <DocSection title="Básico — todas las columnas">
        <div className="flex items-center gap-3">
          <ExportCSV
            data={USERS}
            filename="usuarios"
            onExport={n => setExported(n)}
          />
          {exported !== null && (
            <span className="text-xs text-muted-foreground">{exported} filas exportadas</span>
          )}
        </div>
      </DocSection>

      <DocSection title="Con columnas específicas y formato">
        <ExportCSV
          data={USERS}
          filename="reporte-usuarios"
          label="Descargar reporte"
          variant="default"
          columns={[
            { key: "nombre", header: "Nombre completo" },
            { key: "email",  header: "Correo" },
            { key: "rol",    header: "Rol" },
            { key: "estado", header: "Estado", format: v => v === "Activo" ? "✓" : "✗" },
            { key: "fecha",  header: "Fecha de registro", format: v => new Date(String(v)).toLocaleDateString("es-MX") },
          ]}
        />
      </DocSection>

      <DocSection title="Variantes y tamaños">
        <div className="flex flex-wrap items-center gap-3">
          <ExportCSV data={USERS} variant="default" size="sm" label="Default SM" />
          <ExportCSV data={USERS} variant="outline" size="md" label="Outline MD" />
          <ExportCSV data={USERS} variant="ghost"   size="lg" label="Ghost LG"   />
          <ExportCSV data={[]}    label="Sin datos (disabled)" />
        </div>
      </DocSection>

      <DocSection title="Delimitador personalizado (Excel europeo)">
        <ExportCSV
          data={USERS}
          delimiter=";"
          filename="usuarios-excel"
          label="Exportar para Excel (;)"
          variant="outline"
        />
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { ExportCSV } from "@nuvo-ui/ui"

// Simple — exporta todas las columnas del objeto
<ExportCSV data={rows} filename="reporte" />

// Con columnas específicas y formato
<ExportCSV
  data={rows}
  filename="usuarios"
  delimiter=";"
  columns={[
    { key: "nombre", header: "Nombre" },
    { key: "monto",  header: "Monto $", format: v => Number(v).toFixed(2) },
    { key: "fecha",  header: "Fecha",   format: v => new Date(v).toLocaleDateString() },
  ]}
  onExport={count => toast({ title: \`\${count} filas exportadas\` })}
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "data",      type: "Record<string, unknown>[]", default: "—",       description: "Datos a exportar" },
          { name: "columns",   type: "ExportCSVColumn[]",         default: "auto",    description: "Columnas con header y formato. Si se omite, infiere las keys del primer objeto" },
          { name: "filename",  type: "string",                    default: '"export.csv"', description: "Nombre del archivo (con o sin .csv)" },
          { name: "delimiter", type: '"," | ";" | "\\t"',         default: '","',     description: "Delimitador de campos" },
          { name: "label",     type: "string",                    default: '"Exportar CSV"', description: "Texto del botón" },
          { name: "variant",   type: '"default" | "outline" | "ghost"', default: '"outline"', description: "Estilo del botón" },
          { name: "size",      type: '"sm" | "md" | "lg"',        default: '"md"',    description: "Tamaño del botón" },
          { name: "onExport",  type: "(rowCount: number) => void",default: "—",       description: "Callback tras la descarga" },
        ]} />
      </DocSection>
    </div>
  )
}
