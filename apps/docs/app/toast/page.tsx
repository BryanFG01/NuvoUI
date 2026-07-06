"use client"

import * as React from "react"
import { ToastProvider, useToast, Button } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Información", description: "Operación en progreso.", variant: "default" })}>
        Default
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Guardado", description: "Los cambios se guardaron.", variant: "success" })}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Atención", description: "Tu plan expira pronto.", variant: "warning" })}>
        Warning
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Error", description: "No se pudo completar la acción.", variant: "error" })}>
        Error
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Persistente", duration: 0, variant: "default" })}>
        Sin auto-dismiss
      </Button>
    </div>
  )
}

export default function ToastPage() {
  return (
    <ToastProvider>
      <div className="space-y-10">
        <div>
          <DocTitle>Toast</DocTitle>
          <DocSubtitle>Notificaciones temporales con auto-dismiss y barra de progreso. Requiere ToastProvider en el layout.</DocSubtitle>
        </div>

        <DocInstall component="toast" />
        <DocDivider />

        <DocSection title="Demo interactiva">
          <ToastDemo />
        </DocSection>

        <DocSection title="Setup — layout.tsx">
          <Code code={`// app/layout.tsx
import { ToastProvider } from "@nuvo-ui/ui"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}`} />
        </DocSection>

        <DocSection title="Uso en componentes">
          <Code code={`"use client"
import { useToast } from "@nuvo-ui/ui"

function MyComponent() {
  const { toast, dismiss } = useToast()

  function handleSave() {
    const id = toast({
      title: "Guardado",
      description: "Los cambios se aplicaron.",
      variant: "success",
      duration: 4000, // ms, 0 = sin auto-dismiss
    })
    // dismiss(id) // cerrar manualmente
  }
}`} />
        </DocSection>

        <DocDivider />

        <DocSection title="Props de toast()">
          <PropsTable props={[
            { name: "title",       type: "string",                                         default: "—",       description: "Título del toast" },
            { name: "description", type: "string",                                         default: "—",       description: "Texto descriptivo" },
            { name: "variant",     type: '"default" | "success" | "warning" | "error"',   default: '"default"', description: "Estilo visual" },
            { name: "duration",    type: "number",                                         default: "4000",    description: "ms hasta auto-dismiss; 0 = permanente" },
          ]} />
        </DocSection>
      </div>
    </ToastProvider>
  )
}
