"use client"

import { Spinner } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function SpinnerPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Spinner</DocTitle>
        <DocSubtitle>Indicador de carga animado con variantes de tamaño y color.</DocSubtitle>
      </div>

      <DocInstall component="spinner" />
      <DocDivider />

      <DocSection title="Tamaños">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xs" />
            <span className="text-xs text-muted-foreground">xs</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span className="text-xs text-muted-foreground">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs text-muted-foreground">lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" />
            <span className="text-xs text-muted-foreground">xl</span>
          </div>
        </div>
      </DocSection>

      <DocSection title="Variantes">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Spinner variant="default" />
            <span className="text-xs text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner variant="muted" />
            <span className="text-xs text-muted-foreground">muted</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-foreground p-3">
            <Spinner variant="white" />
            <span className="text-xs text-background">white</span>
          </div>
        </div>
      </DocSection>

      <DocSection title="En botón de carga">
        <Code code={`import { Spinner } from "@nuvo-ui/ui"

<button disabled className="flex items-center gap-2 ...">
  <Spinner size="sm" variant="white" />
  Guardando...
</button>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "size",    type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"',      description: "Tamaño del spinner" },
          { name: "variant", type: '"default" | "muted" | "white"',     default: '"default"', description: "Color del spinner" },
          { name: "label",   type: "string",                             default: '"Cargando..."', description: "Texto para screen readers" },
          { name: "className",type: "string",                            default: "—",         description: "Clases adicionales" },
        ]} />
      </DocSection>
    </div>
  )
}
