"use client"

import * as React from "react"
import { Switch } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function SwitchPage() {
  const [notifications, setNotifications] = React.useState(true)
  const [marketing,     setMarketing]     = React.useState(false)

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Switch</DocTitle>
        <DocSubtitle>Toggle accesible para activar o desactivar opciones.</DocSubtitle>
      </div>

      <DocInstall component="switch" />
      <DocDivider />

      <DocSection title="Básico">
        <div className="space-y-4">
          <Switch
            label="Notificaciones push"
            description="Recibe alertas en tiempo real."
            checked={notifications}
            onCheckedChange={setNotifications}
          />
          <Switch
            label="Emails de marketing"
            description="Ofertas y novedades del producto."
            checked={marketing}
            onCheckedChange={setMarketing}
          />
          <Switch label="Modo mantenimiento" disabled />
          <Switch label="Activado por defecto" defaultChecked />
        </div>
      </DocSection>

      <DocSection title="Sin label">
        <Switch />
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Switch } from "@nuvo-ui/ui"

<Switch
  checked={active}
  onCheckedChange={setActive}
  label="Activar feature"
  description="Esta opción afecta a todos los usuarios."
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "checked",          type: "boolean",           default: "—",     description: "Estado controlado" },
          { name: "defaultChecked",   type: "boolean",           default: "—",     description: "Estado inicial (no controlado)" },
          { name: "onCheckedChange",  type: "(v: boolean) => void", default: "—",  description: "Callback al cambiar" },
          { name: "label",            type: "string",            default: "—",     description: "Etiqueta del switch" },
          { name: "description",      type: "string",            default: "—",     description: "Texto descriptivo" },
          { name: "disabled",         type: "boolean",           default: "false", description: "Deshabilita el control" },
        ]} />
      </DocSection>
    </div>
  )
}
