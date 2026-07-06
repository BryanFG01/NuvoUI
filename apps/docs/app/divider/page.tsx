"use client"

import { Divider } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function DividerPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Divider</DocTitle>
        <DocSubtitle>Separador horizontal o vertical con etiqueta opcional.</DocSubtitle>
      </div>

      <DocInstall component="divider" />
      <DocDivider />

      <DocSection title="Horizontal">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Contenido superior</p>
          <Divider />
          <p className="text-sm text-muted-foreground">Contenido inferior</p>
        </div>
      </DocSection>

      <DocSection title="Con etiqueta">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Sección A</p>
          <Divider label="o continúa con" />
          <p className="text-sm text-muted-foreground">Sección B</p>
        </div>
      </DocSection>

      <DocSection title="Vertical">
        <div className="flex h-10 items-center gap-3">
          <span className="text-sm text-muted-foreground">Inicio</span>
          <Divider orientation="vertical" />
          <span className="text-sm text-muted-foreground">Usuarios</span>
          <Divider orientation="vertical" />
          <span className="text-sm font-medium text-foreground">Perfil</span>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Divider } from "@nuvo-ui/ui"

<Divider />                        // horizontal simple
<Divider label="o continúa con" /> // con etiqueta centrada
<Divider orientation="vertical" /> // vertical`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Dirección del separador" },
          { name: "label",       type: "string",                    default: "—",             description: "Texto centrado (solo horizontal)" },
          { name: "className",   type: "string",                    default: "—",             description: "Clases adicionales" },
        ]} />
      </DocSection>
    </div>
  )
}
