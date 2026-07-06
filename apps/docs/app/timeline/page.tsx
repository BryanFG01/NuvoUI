"use client"

import { Timeline } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

function StarIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
function CodeIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> }

export default function TimelinePage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Timeline</DocTitle>
        <DocSubtitle>Línea de tiempo vertical con íconos, fechas y variantes de color.</DocSubtitle>
      </div>

      <DocInstall component="timeline" />
      <DocDivider />

      <DocSection title="Básico">
        <Timeline items={[
          { title: "Cuenta creada",        date: "Ene 2024",  description: "El usuario completó el registro.",         variant: "success" },
          { title: "Plan actualizado",      date: "Mar 2024",  description: "Cambio de Free a Pro.",                    variant: "default" },
          { title: "Pago fallido",          date: "Jun 2024",  description: "Tarjeta rechazada — pendiente de update.", variant: "error"   },
          { title: "Pago recuperado",       date: "Jun 2024",  description: "Se actualizó el método de pago.",          variant: "success" },
          { title: "Solicitud de soporte",  date: "Jul 2024",  description: "Ticket #4821 abierto.",                   variant: "warning" },
        ]} />
      </DocSection>

      <DocSection title="Con íconos custom">
        <Timeline items={[
          { title: "v1.0 — Lanzamiento",    date: "Q1 2023", description: "Primera versión pública de NuvoUI.",          icon: <StarIcon /> },
          { title: "v1.5 — DataGrid",       date: "Q3 2023", description: "Nuevo componente de tabla avanzada.",         icon: <CodeIcon /> },
          { title: "v2.0 — Chart & Filter", date: "Q1 2024", description: "Gráficos y filtros dinámicos agregados.",     icon: <CodeIcon /> },
          { title: "v2.5 — 19 componentes", date: "Jul 2024", description: "Librería completa con Stepper, Toast y más.",icon: <StarIcon /> },
        ]} />
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Timeline } from "@nuvo-ui/ui"

<Timeline items={[
  {
    title:       "Evento 1",
    description: "Descripción del evento.",
    date:        "Ene 2024",
    variant:     "success",   // "default" | "success" | "warning" | "error"
  },
  {
    title: "Con ícono custom",
    icon:  <StarIcon />,      // ReactNode personalizado
    date:  "Feb 2024",
  },
]} />`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props — TimelineItem">
        <PropsTable props={[
          { name: "title",       type: "string",                                         default: "—",       description: "Título del evento" },
          { name: "description", type: "string",                                         default: "—",       description: "Descripción del evento" },
          { name: "date",        type: "string",                                         default: "—",       description: "Fecha o etiqueta de tiempo" },
          { name: "icon",        type: "ReactNode",                                      default: "—",       description: "Ícono personalizado en el dot" },
          { name: "variant",     type: '"default" | "success" | "warning" | "error"',   default: '"default"', description: "Color del dot" },
        ]} />
      </DocSection>
    </div>
  )
}
