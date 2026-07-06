"use client"

import { DocTitle, DocSubtitle, DocSection, Code, DocNote, DocDivider, PMInstallBlock } from "./doc-ui"
import { ComponentsGrid } from "./home/components-grid"
import { TOTAL_COMPONENTS } from "./home/component-categories"
import { CSS_VARIABLES_SNIPPET, TAILWIND_CONFIG_SNIPPET } from "./home/setup-snippets"

export default function GettingStartedPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Instalación</DocTitle>
        <DocSubtitle>
          nuvo-ui copia los componentes directamente en tu proyecto. Sin dependencia npm
          que no controlas — el código es tuyo desde el primer día.
        </DocSubtitle>
      </div>

      <DocSection title="Inicio rápido">
        <PMInstallBlock
          initCmd="init"
          addCmd="button data-table sidebar chart"
        />
        <DocNote>
          El CLI detecta automáticamente el gestor de paquetes de tu proyecto e instala
          las dependencias necesarias de cada componente.
        </DocNote>
      </DocSection>

      <DocDivider />

      <DocSection
        title="Variables CSS requeridas"
        description="Todos los tokens de color derivan de estas variables. Pégalas en tu globals.css."
      >
        <Code code={CSS_VARIABLES_SNIPPET} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="Configuración de Tailwind"
        description="Agrega los tokens y el path de los componentes a tu tailwind.config."
      >
        <Code code={TAILWIND_CONFIG_SNIPPET} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="Componentes disponibles"
        description={`${TOTAL_COMPONENTS} componentes, agrupados por categoría.`}
      >
        <ComponentsGrid />
      </DocSection>
    </div>
  )
}
