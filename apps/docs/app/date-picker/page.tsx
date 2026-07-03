"use client"

import * as React from "react"
import { DatePicker } from "@nuvo-ui/ui"
import {
  DocTitle, DocSubtitle, DocInstall, DocSection,
  Preview, Code, PropsTable, DocDivider, DocNote,
} from "../doc-ui"

export default function DatePickerPage() {
  const [date, setDate]   = React.useState<string | undefined>()
  const [from, setFrom]   = React.useState<string | undefined>()
  const [to,   setTo]     = React.useState<string | undefined>()

  // Limpiar "to" si queda antes de "from"
  function handleFrom(v: string | undefined) {
    setFrom(v)
    if (v && to && to < v) setTo(undefined)
  }
  // Limpiar "from" si queda después de "to"
  function handleTo(v: string | undefined) {
    setTo(v)
    if (v && from && from > v) setFrom(undefined)
  }

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>DatePicker</DocTitle>
        <DocSubtitle>
          Selector de fecha con calendario custom, accesible y alineado al design system.
          Soporte para rango mínimo/máximo — bloquea en el calendario las fechas fuera del rango.
          Sin dependencias externas.
        </DocSubtitle>
      </div>

      <DocInstall component="date-picker" />
      <DocDivider />

      {/* ── Base ── */}
      <DocSection title="Base">
        <Preview className="max-w-sm space-y-3">
          <DatePicker
            label="Fecha de nacimiento"
            value={date}
            onChange={setDate}
            helperText="Selecciona la fecha en el calendario"
          />
          {date && (
            <p className="text-sm text-muted-foreground">
              Seleccionado: <span className="font-medium text-foreground">{date}</span>
            </p>
          )}
        </Preview>
        <Code code={`const [date, setDate] = React.useState<string | undefined>()

<DatePicker
  label="Fecha de nacimiento"
  value={date}
  onChange={setDate}
  helperText="Selecciona la fecha en el calendario"
/>`} />
      </DocSection>

      <DocDivider />

      {/* ── Rango de fechas vinculado ── */}
      <DocSection
        title="Rango de fechas vinculado"
        description="Vincula dos DatePickers de modo que la fecha final nunca pueda ser anterior a la inicial, y la inicial nunca posterior a la final. El calendario bloquea automáticamente las fechas inválidas."
      >
        <Preview className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <DatePicker
              label="Fecha inicio"
              value={from}
              onChange={handleFrom}
              max={to}
              helperText="Las fechas posteriores a «Fin» quedan bloqueadas"
            />
            <DatePicker
              label="Fecha fin"
              value={to}
              onChange={handleTo}
              min={from}
              helperText="Las fechas anteriores a «Inicio» quedan bloqueadas"
            />
          </div>

          {(from || to) && (
            <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Rango seleccionado: </span>
              <span className="font-medium text-foreground">
                {from ?? "—"} → {to ?? "—"}
              </span>
            </div>
          )}
        </Preview>

        <Code code={`const [from, setFrom] = React.useState<string | undefined>()
const [to,   setTo]   = React.useState<string | undefined>()

function handleFrom(v: string | undefined) {
  setFrom(v)
  // Si la fecha fin ya estaba y queda antes de la nueva inicio, la limpia
  if (v && to && to < v) setTo(undefined)
}

function handleTo(v: string | undefined) {
  setTo(v)
  // Si la fecha inicio ya estaba y queda después de la nueva fin, la limpia
  if (v && from && from > v) setFrom(undefined)
}

<DatePicker
  label="Fecha inicio"
  value={from}
  onChange={handleFrom}
  max={to}              // ← bloquea en el calendario todo lo posterior al fin
/>

<DatePicker
  label="Fecha fin"
  value={to}
  onChange={handleTo}
  min={from}            // ← bloquea en el calendario todo lo anterior al inicio
/>`} />

        <DocNote>
          Pasa <code>max=&#123;to&#125;</code> en el campo inicio y <code>min=&#123;from&#125;</code> en el
          campo fin. El calendario mostrará grises (sin hover, cursor bloqueado) todas las fechas
          fuera del rango permitido — el usuario no puede seleccionarlas.
        </DocNote>
      </DocSection>

      <DocDivider />

      {/* ── min / max fijos ── */}
      <DocSection
        title="Límites fijos de fecha"
        description="Usa min y max con valores estáticos para restringir a un período concreto."
      >
        <Preview className="max-w-sm">
          <DatePicker
            label="Fecha de evento"
            min="2025-01-01"
            max="2025-12-31"
            helperText="Solo fechas dentro de 2025"
          />
        </Preview>
        <Code code={`<DatePicker
  label="Fecha de evento"
  min="2025-01-01"
  max="2025-12-31"
  helperText="Solo fechas dentro de 2025"
/>`} />
      </DocSection>

      {/* ── Error ── */}
      <DocSection title="Estado de error">
        <Preview className="max-w-sm">
          <DatePicker
            label="Fecha requerida"
            errorMessage="Por favor selecciona una fecha válida."
          />
        </Preview>
        <Code code={`<DatePicker
  label="Fecha requerida"
  errorMessage="Por favor selecciona una fecha válida."
/>`} />
      </DocSection>

      <DocDivider />

      {/* ── Props ── */}
      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              default: "—",
              description: "Etiqueta visible sobre el campo",
            },
            {
              name: "value",
              type: "string",
              default: "—",
              description: 'Fecha seleccionada en formato "yyyy-mm-dd" (modo controlado)',
            },
            {
              name: "onChange",
              type: "(value: string | undefined) => void",
              default: "—",
              description: 'Callback con la nueva fecha. Recibe undefined cuando el usuario pulsa "Borrar"',
            },
            {
              name: "min",
              type: "string",
              default: "—",
              description:
                'Fecha mínima seleccionable "yyyy-mm-dd". Las fechas anteriores aparecen deshabilitadas en el calendario. Úsalo con el valor de la fecha fin para vincular dos pickers.',
            },
            {
              name: "max",
              type: "string",
              default: "—",
              description:
                'Fecha máxima seleccionable "yyyy-mm-dd". Las fechas posteriores aparecen deshabilitadas en el calendario. Úsalo con el valor de la fecha inicio para vincular dos pickers.',
            },
            {
              name: "helperText",
              type: "string",
              default: "—",
              description: "Texto de ayuda bajo el campo (no se muestra si hay errorMessage)",
            },
            {
              name: "errorMessage",
              type: "string",
              default: "—",
              description: "Mensaje de error — activa el estado visual de error en el campo",
            },
            {
              name: "required",
              type: "boolean",
              default: "false",
              description: "Muestra asterisco (*) junto al label",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Deshabilita el campo completamente",
            },
          ]}
        />
      </DocSection>
    </div>
  )
}
