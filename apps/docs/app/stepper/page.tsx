"use client"

import * as React from "react"
import { Stepper, Button } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

const STEPS = [
  { title: "Cuenta",    description: "Datos básicos de acceso"   },
  { title: "Perfil",    description: "Información personal"       },
  { title: "Plan",      description: "Elige tu suscripción"       },
  { title: "Confirmar", description: "Revisa y finaliza"          },
]

export default function StepperPage() {
  const [current, setCurrent] = React.useState(1)

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Stepper</DocTitle>
        <DocSubtitle>Indicador de progreso paso a paso — horizontal y vertical.</DocSubtitle>
      </div>

      <DocInstall component="stepper" />
      <DocDivider />

      <DocSection title="Horizontal — interactivo">
        <div className="space-y-6">
          <Stepper steps={STEPS} currentStep={current} />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={current <= 0} onClick={() => setCurrent(c => c - 1)}>
              Anterior
            </Button>
            <Button size="sm" disabled={current >= STEPS.length - 1} onClick={() => setCurrent(c => c + 1)}>
              Siguiente
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Paso actual: {current + 1} de {STEPS.length}</p>
        </div>
      </DocSection>

      <DocSection title="Vertical">
        <Stepper
          orientation="vertical"
          steps={[
            { title: "Pedido realizado",   description: "Recibimos tu pedido.",             status: "complete" },
            { title: "En preparación",     description: "El paquete está siendo armado.",   status: "complete" },
            { title: "En camino",          description: "Tu pedido va hacia ti.",            status: "active"   },
            { title: "Entregado",          description: "Esperando confirmación.",           status: "upcoming" },
          ]}
        />
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Stepper } from "@nuvo-ui/ui"

// Con currentStep (automático)
<Stepper
  steps={[
    { title: "Cuenta",    description: "Datos de acceso" },
    { title: "Perfil",    description: "Info personal"   },
    { title: "Confirmar", description: "Finalizar"       },
  ]}
  currentStep={1} // 0-indexed
/>

// Con status manual
<Stepper
  orientation="vertical"
  steps={[
    { title: "Paso 1", status: "complete" },
    { title: "Paso 2", status: "active"   },
    { title: "Paso 3", status: "upcoming" },
  ]}
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "steps",       type: "StepItem[]",                       default: "—",           description: "Array de { title, description?, status? }" },
          { name: "currentStep", type: "number",                            default: "—",           description: "Índice activo (0-indexed); calcula status automáticamente" },
          { name: "orientation", type: '"horizontal" | "vertical"',         default: '"horizontal"', description: "Dirección del stepper" },
        ]} />
      </DocSection>
    </div>
  )
}
