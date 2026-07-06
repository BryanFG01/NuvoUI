"use client"

import { Breadcrumb } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function BreadcrumbPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Breadcrumb</DocTitle>
        <DocSubtitle>Navegación jerárquica que muestra la ruta actual dentro de la aplicación.</DocSubtitle>
      </div>

      <DocInstall component="breadcrumb" />
      <DocDivider />

      <DocSection title="Básico">
        <Breadcrumb items={[
          { label: "Inicio",    href: "#" },
          { label: "Usuarios",  href: "#" },
          { label: "Perfil" },
        ]} />
      </DocSection>

      <DocSection title="Solo texto (sin links)">
        <Breadcrumb items={[
          { label: "Panel" },
          { label: "Configuración" },
          { label: "Seguridad" },
        ]} />
      </DocSection>

      <DocSection title="Separador personalizado">
        <Breadcrumb
          separator="/"
          items={[
            { label: "Proyectos", href: "#" },
            { label: "Marketing", href: "#" },
            { label: "Campaña Q3" },
          ]}
        />
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Breadcrumb } from "@nuvo-ui/ui"

<Breadcrumb items={[
  { label: "Inicio",   href: "/" },
  { label: "Usuarios", href: "/usuarios" },
  { label: "Perfil" },  // último item: sin href, marcado como current page
]} />`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "items",     type: "BreadcrumbItem[]",  default: "—", description: "Array de { label, href? }" },
          { name: "separator", type: "ReactNode",          default: "›",  description: "Separador entre items" },
          { name: "className", type: "string",             default: "—",  description: "Clases adicionales" },
        ]} />
      </DocSection>
    </div>
  )
}
