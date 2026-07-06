"use client"

import * as React from "react"
import { Textarea } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function TextareaPage() {
  const [val, setVal] = React.useState("")

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Textarea</DocTitle>
        <DocSubtitle>Área de texto con label, helper text y variantes de validación.</DocSubtitle>
      </div>

      <DocInstall component="textarea" />
      <DocDivider />

      <DocSection title="Básico">
        <div className="max-w-sm">
          <Textarea label="Descripción" placeholder="Escribe aquí..." rows={4} />
        </div>
      </DocSection>

      <DocSection title="Con helper text">
        <div className="max-w-sm">
          <Textarea
            label="Biografía"
            helperText="Máximo 280 caracteres."
            placeholder="Cuéntanos sobre ti..."
            rows={3}
            maxLength={280}
            value={val}
            onChange={e => setVal(e.target.value)}
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">{val.length}/280</p>
        </div>
      </DocSection>

      <DocSection title="Variantes de validación">
        <div className="space-y-3 max-w-sm">
          <Textarea label="Con error" errorMessage="El campo es obligatorio." rows={2} />
          <Textarea label="Con éxito" successMessage="Descripción válida." defaultValue="Todo correcto." rows={2} />
        </div>
      </DocSection>

      <DocSection title="Sin resize">
        <div className="max-w-sm">
          <Textarea label="Comentario" resize="none" rows={3} placeholder="Sin redimensionar..." />
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Textarea } from "@nuvo-ui/ui"

<Textarea
  label="Descripción"
  helperText="Máximo 280 caracteres."
  errorMessage="Campo requerido."
  rows={4}
  resize="vertical"
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "label",          type: "string",                        default: "—",         description: "Etiqueta del campo" },
          { name: "helperText",     type: "string",                        default: "—",         description: "Texto de ayuda debajo" },
          { name: "errorMessage",   type: "string",                        default: "—",         description: "Mensaje de error (aplica variant error)" },
          { name: "successMessage", type: "string",                        default: "—",         description: "Mensaje de éxito (aplica variant success)" },
          { name: "variant",        type: '"default" | "error" | "success"', default: '"default"', description: "Estilo visual del borde" },
          { name: "resize",         type: '"none" | "vertical" | "both"',  default: '"vertical"', description: "Control de redimensionamiento" },
          { name: "rows",           type: "number",                        default: "—",          description: "Número de filas visible" },
        ]} />
      </DocSection>
    </div>
  )
}
