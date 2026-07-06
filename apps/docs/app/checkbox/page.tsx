"use client"

import * as React from "react"
import { Checkbox } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function CheckboxPage() {
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(false)

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Checkbox</DocTitle>
        <DocSubtitle>Casilla de verificación accesible con estado indeterminate y descripción.</DocSubtitle>
      </div>

      <DocInstall component="checkbox" />
      <DocDivider />

      <DocSection title="Básico">
        <div className="space-y-3">
          <Checkbox label="Acepto los términos y condiciones" />
          <Checkbox label="Suscribirme al newsletter" description="Recibirás novedades sobre el producto." />
          <Checkbox label="Desactivado" disabled />
          <Checkbox label="Desactivado marcado" disabled defaultChecked />
        </div>
      </DocSection>

      <DocSection title="Indeterminate">
        <Checkbox
          checked={checked}
          onCheckedChange={setChecked}
          label="Seleccionar todos"
          description={`Estado: ${checked === "indeterminate" ? "indeterminate" : checked ? "marcado" : "desmarcado"}`}
        />
        <div className="mt-2 flex gap-2">
          {(["indeterminate", true, false] as const).map(v => (
            <button key={String(v)} onClick={() => setChecked(v)} className="text-xs text-primary underline">
              {String(v)}
            </button>
          ))}
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Checkbox } from "@nuvo-ui/ui"

<Checkbox
  checked={checked}
  onCheckedChange={setChecked}
  label="Acepto los términos"
  description="Revisa los términos antes de aceptar."
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "checked",          type: 'boolean | "indeterminate"', default: "—",     description: "Estado controlado" },
          { name: "defaultChecked",   type: "boolean",                   default: "—",     description: "Estado inicial (no controlado)" },
          { name: "onCheckedChange",  type: "(v: boolean | 'indeterminate') => void", default: "—", description: "Callback al cambiar" },
          { name: "label",            type: "string",                    default: "—",     description: "Etiqueta del checkbox" },
          { name: "description",      type: "string",                    default: "—",     description: "Texto descriptivo" },
          { name: "disabled",         type: "boolean",                   default: "false", description: "Deshabilita el control" },
        ]} />
      </DocSection>
    </div>
  )
}
