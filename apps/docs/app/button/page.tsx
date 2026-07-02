"use client"

import { Button } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider } from "../doc-ui"

export default function ButtonPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Button</DocTitle>
        <DocSubtitle>
          Botón accesible con 6 variantes y 4 tamaños. Usa CVA internamente.
          Soporte para <code className="text-primary">asChild</code> con Radix Slot.
        </DocSubtitle>
      </div>

      <DocInstall component="button" />

      <DocDivider />

      <DocSection title="Variantes">
        <Preview center>
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </Preview>
        <Code code={`<Button variant="default">Default</Button>
<Button variant="destructive">Eliminar</Button>
<Button variant="outline">Cancelar</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Ver más</Button>`} />
      </DocSection>

      <DocSection title="Tamaños">
        <Preview center>
          <Button size="sm">Pequeño</Button>
          <Button size="md">Mediano</Button>
          <Button size="lg">Grande</Button>
          <Button size="icon" aria-label="Cerrar">✕</Button>
        </Preview>
        <Code code={`<Button size="sm">Pequeño</Button>
<Button size="md">Mediano</Button>   {/* default */}
<Button size="lg">Grande</Button>
<Button size="icon" aria-label="Cerrar">✕</Button>`} />
      </DocSection>

      <DocSection title="Estados">
        <Preview center>
          <Button disabled>Deshabilitado</Button>
          <Button variant="outline" disabled>Outline disabled</Button>
        </Preview>
        <Code code={`<Button disabled>Procesando...</Button>`} />
      </DocSection>

      <DocSection title="asChild — renderizar como enlace">
        <Preview center>
          <Button asChild variant="outline">
            <a href="/">Ir al inicio</a>
          </Button>
        </Preview>
        <Code code={`import Link from "next/link"

<Button asChild>
  <Link href="/dashboard">Ir al dashboard</Link>
</Button>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "variant",  type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"', default: '"default"', description: "Estilo visual del botón" },
            { name: "size",     type: '"sm" | "md" | "lg" | "icon"', default: '"md"',      description: "Tamaño del botón" },
            { name: "asChild",  type: "boolean",                     default: "false",     description: "Delega el render al hijo con Radix Slot" },
            { name: "disabled", type: "boolean",                     default: "false",     description: "Deshabilita el botón" },
            { name: "...",      type: "ButtonHTMLAttributes",         description: "Todos los atributos nativos de <button>" },
          ]}
        />
      </DocSection>
    </div>
  )
}
