import { Badge } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider } from "../doc-ui"

export default function BadgePage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Badge</DocTitle>
        <DocSubtitle>
          Etiqueta de estado con 6 variantes de color, tamaño configurable y dot indicator opcional.
        </DocSubtitle>
      </div>

      <DocInstall component="badge" />
      <DocDivider />

      <DocSection title="Variantes">
        <Preview center>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Activo</Badge>
          <Badge variant="warning">Pendiente</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="muted">Archivado</Badge>
        </Preview>
        <Code code={`<Badge variant="success">Activo</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="muted">Archivado</Badge>`} />
      </DocSection>

      <DocSection title="Con dot indicator">
        <Preview center>
          <Badge variant="success" dot>En línea</Badge>
          <Badge variant="warning" dot>Procesando</Badge>
          <Badge variant="error"   dot>Crítico</Badge>
          <Badge variant="muted"   dot>Inactivo</Badge>
        </Preview>
        <Code code={`<Badge variant="success" dot>En línea</Badge>
<Badge variant="error"   dot>Crítico</Badge>`} />
      </DocSection>

      <DocSection title="Tamaños">
        <Preview center>
          <Badge variant="info" size="sm">Pequeño</Badge>
          <Badge variant="info" size="md">Mediano</Badge>
        </Preview>
        <Code code={`<Badge size="sm">v1.2.0</Badge>
<Badge size="md">Producción</Badge>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "variant", type: '"default" | "success" | "warning" | "error" | "info" | "muted"', default: '"default"', description: "Color del badge" },
            { name: "size",    type: '"sm" | "md"',  default: '"md"',  description: "Tamaño" },
            { name: "dot",     type: "boolean",      default: "false", description: "Muestra un indicador circular de color" },
          ]}
        />
      </DocSection>
    </div>
  )
}
