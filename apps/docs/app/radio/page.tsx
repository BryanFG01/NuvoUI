"use client"

import * as React from "react"
import { RadioGroup, Radio } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function RadioPage() {
  const [plan, setPlan] = React.useState("pro")

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Radio</DocTitle>
        <DocSubtitle>Grupo de opciones mutuamente excluyentes con accesibilidad completa.</DocSubtitle>
      </div>

      <DocInstall component="radio" />
      <DocDivider />

      <DocSection title="Básico — vertical">
        <RadioGroup label="Plan" value={plan} onValueChange={setPlan}>
          <Radio value="free"  label="Free"  description="Hasta 3 proyectos, sin soporte." />
          <Radio value="pro"   label="Pro"   description="Proyectos ilimitados, soporte prioritario." />
          <Radio value="team"  label="Team"  description="Todo Pro + seats de equipo y SSO." />
          <Radio value="enterprise" label="Enterprise" disabled description="Contacta con ventas." />
        </RadioGroup>
        <p className="mt-2 text-xs text-muted-foreground">Seleccionado: {plan}</p>
      </DocSection>

      <DocSection title="Horizontal">
        <RadioGroup label="Frecuencia de pago" orientation="horizontal" defaultValue="mensual">
          <Radio value="mensual"  label="Mensual" />
          <Radio value="anual"    label="Anual (−20%)" />
        </RadioGroup>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { RadioGroup, Radio } from "@nuvo-ui/ui"

<RadioGroup value={plan} onValueChange={setPlan} label="Plan">
  <Radio value="free" label="Free"       description="Hasta 3 proyectos." />
  <Radio value="pro"  label="Pro"        description="Proyectos ilimitados." />
  <Radio value="team" label="Enterprise" disabled />
</RadioGroup>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props — RadioGroup">
        <PropsTable props={[
          { name: "value",         type: "string",                    default: "—",         description: "Valor seleccionado (controlado)" },
          { name: "defaultValue",  type: "string",                    default: "—",         description: "Valor inicial (no controlado)" },
          { name: "onValueChange", type: "(v: string) => void",       default: "—",         description: "Callback al cambiar" },
          { name: "label",         type: "string",                    default: "—",         description: "Etiqueta del grupo" },
          { name: "orientation",   type: '"vertical" | "horizontal"', default: '"vertical"', description: "Disposición de los radios" },
          { name: "disabled",      type: "boolean",                   default: "false",     description: "Deshabilita todo el grupo" },
        ]} />
      </DocSection>
    </div>
  )
}
