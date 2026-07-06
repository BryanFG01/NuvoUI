"use client"

import { Alert } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function AlertPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Alert</DocTitle>
        <DocSubtitle>Mensajes de estado con variantes info, success, warning y error.</DocSubtitle>
      </div>

      <DocInstall component="alert" />
      <DocDivider />

      <DocSection title="Variantes">
        <div className="space-y-3">
          <Alert variant="info"    title="Información">Tu cuenta está siendo verificada. Puede tardar unos minutos.</Alert>
          <Alert variant="success" title="Guardado">Los cambios se guardaron correctamente.</Alert>
          <Alert variant="warning" title="Atención">Tu plan expira en 3 días. Renueva para no perder el acceso.</Alert>
          <Alert variant="error"   title="Error">No se pudo completar la operación. Inténtalo de nuevo.</Alert>
        </div>
      </DocSection>

      <DocSection title="Sin título">
        <div className="space-y-3">
          <Alert variant="info">Recuerda verificar tu correo electrónico para activar tu cuenta.</Alert>
          <Alert variant="success">Archivo subido correctamente.</Alert>
        </div>
      </DocSection>

      <DocSection title="Dismissible">
        <Alert variant="warning" title="Advertencia" dismissible>
          Tienes cambios sin guardar. Guarda antes de salir.
        </Alert>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Alert } from "@nuvo-ui/ui"

<Alert variant="success" title="Guardado" dismissible>
  Los cambios se guardaron correctamente.
</Alert>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "variant",     type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Estilo visual del alert" },
          { name: "title",       type: "string",  default: "—",     description: "Título en negrita" },
          { name: "children",    type: "ReactNode",default: "—",    description: "Contenido del alert" },
          { name: "dismissible", type: "boolean", default: "false",  description: "Muestra botón para cerrar" },
          { name: "onDismiss",   type: "() => void",default: "—",   description: "Callback al cerrar" },
          { name: "className",   type: "string",  default: "—",     description: "Clases adicionales" },
        ]} />
      </DocSection>
    </div>
  )
}
