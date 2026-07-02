"use client"

import * as React from "react"
import { DatePicker } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider } from "../doc-ui"

export default function DatePickerPage() {
  const [date, setDate] = React.useState("")
  const [range, setRange] = React.useState({ from: "", to: "" })

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>DatePicker</DocTitle>
        <DocSubtitle>
          Selector de fecha accesible. Wrapper del input nativo con label, helper text y validación.
          Compatible con el design system — sin dependencias externas.
        </DocSubtitle>
      </div>

      <DocInstall component="date-picker" />
      <DocDivider />

      <DocSection title="Base">
        <Preview className="max-w-sm space-y-4">
          <DatePicker
            label="Fecha de nacimiento"
            value={date}
            onChange={setDate}
            helperText="Formato: DD/MM/AAAA"
          />
          {date && <p className="text-sm text-muted-foreground">Seleccionado: {date}</p>}
        </Preview>
        <Code code={`const [date, setDate] = React.useState("")

<DatePicker
  label="Fecha de nacimiento"
  value={date}
  onChange={setDate}
  helperText="Formato: DD/MM/AAAA"
/>`} />
      </DocSection>

      <DocSection title="Con rango mínimo/máximo">
        <Preview className="max-w-sm">
          <DatePicker
            label="Fecha de evento"
            min="2024-01-01"
            max="2025-12-31"
            helperText="Solo fechas entre 2024 y 2025"
          />
        </Preview>
        <Code code={`<DatePicker
  label="Fecha de evento"
  min="2024-01-01"
  max="2025-12-31"
/>`} />
      </DocSection>

      <DocSection title="Con error">
        <Preview className="max-w-sm">
          <DatePicker
            label="Fecha requerida"
            errorMessage="Por favor selecciona una fecha."
          />
        </Preview>
        <Code code={`<DatePicker
  label="Fecha requerida"
  errorMessage="Por favor selecciona una fecha."
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "label",        type: "string",           default: "—",     description: "Etiqueta del campo" },
            { name: "value",        type: "string",           default: "—",     description: "Fecha en formato YYYY-MM-DD (controlado)" },
            { name: "onChange",     type: "(value: string) => void", default: "—", description: "Callback con la nueva fecha" },
            { name: "min",          type: "string",           default: "—",     description: "Fecha mínima seleccionable (YYYY-MM-DD)" },
            { name: "max",          type: "string",           default: "—",     description: "Fecha máxima seleccionable (YYYY-MM-DD)" },
            { name: "helperText",   type: "string",           default: "—",     description: "Texto de ayuda bajo el input" },
            { name: "errorMessage", type: "string",           default: "—",     description: "Mensaje de error (fuerza estado error)" },
          ]}
        />
      </DocSection>
    </div>
  )
}
