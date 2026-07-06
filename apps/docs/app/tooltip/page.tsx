"use client"

import { Tooltip, Button } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function TooltipPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Tooltip</DocTitle>
        <DocSubtitle>Información contextual al hacer hover. Posición y delay configurables.</DocSubtitle>
      </div>

      <DocInstall component="tooltip" />
      <DocDivider />

      <DocSection title="Posiciones">
        <div className="flex flex-wrap gap-4 items-center">
          <Tooltip content="Arriba" side="top">
            <Button variant="outline" size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Derecha" side="right">
            <Button variant="outline" size="sm">Right</Button>
          </Tooltip>
          <Tooltip content="Abajo" side="bottom">
            <Button variant="outline" size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Izquierda" side="left">
            <Button variant="outline" size="sm">Left</Button>
          </Tooltip>
        </div>
      </DocSection>

      <DocSection title="Contenido largo">
        <Tooltip
          content="Esta acción eliminará el registro de forma permanente y no podrá deshacerse."
          side="top"
        >
          <Button variant="destructive" size="sm">Eliminar</Button>
        </Tooltip>
      </DocSection>

      <DocSection title="Sin delay">
        <Tooltip content="Aparece al instante" delayDuration={0}>
          <Button variant="ghost" size="sm">Hover rápido</Button>
        </Tooltip>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Tooltip } from "@nuvo-ui/ui"

// Envuelve cualquier elemento interactivo
<Tooltip content="Mensaje descriptivo" side="top">
  <button>Acción</button>
</Tooltip>

// Con delay personalizado
<Tooltip content="Tooltip" delayDuration={0}>
  <span>Texto</span>
</Tooltip>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "content",       type: "ReactNode",                          default: "—",    description: "Contenido del tooltip" },
          { name: "side",          type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Lado donde aparece el tooltip" },
          { name: "align",         type: '"start" | "center" | "end"',          default: '"center"', description: "Alineación del tooltip respecto al trigger" },
          { name: "delayDuration", type: "number",                              default: "400",  description: "Ms de espera antes de mostrar" },
          { name: "children",      type: "ReactNode",                           default: "—",    description: "Elemento que dispara el tooltip" },
        ]} />
      </DocSection>
    </div>
  )
}
