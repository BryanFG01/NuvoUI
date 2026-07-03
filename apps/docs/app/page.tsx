"use client"

import Link from "next/link"
import { DocTitle, DocSubtitle, DocSection, Code, DocNote, DocDivider, PMInstallBlock } from "./doc-ui"

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
        <Code
          code={`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --border: 214.3 31.8% 91.4%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --border: 217.2 32.6% 17.5%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
  }
}`}
        />
      </DocSection>

      <DocDivider />

      <DocSection
        title="Configuración de Tailwind"
        description="Agrega los tokens y el path de los componentes a tu tailwind.config."
      >
        <Code
          code={`// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",  // donde el CLI copia los archivos
  ],
  theme: {
    extend: {
      colors: {
        border:      "hsl(var(--border))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`}
        />
      </DocSection>

      <DocDivider />

      <DocSection title="Componentes disponibles">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Button",         cmd: "button",          desc: "6 variantes, 4 tamaños, asChild" },
            { name: "Badge",          cmd: "badge",           desc: "6 variantes de color, dot indicator" },
            { name: "Card",           cmd: "card",            desc: "Header, Title, Description, Content, Footer" },
            { name: "Input",          cmd: "input",           desc: "Label, helper text, validación inline" },
            { name: "DatePicker",     cmd: "date-picker",     desc: "Selector de fecha nativo con min/max y modo oscuro" },
            { name: "Modal",          cmd: "modal",           desc: "Radix Dialog + Modal.Footer composable" },
            { name: "StatCard",       cmd: "stat-card",       desc: "Métrica con trend y formato automático" },
            { name: "DataTable",      cmd: "data-table",      desc: "API 3 capas: JSON / render / compound" },
            { name: "DataGrid",       cmd: "data-grid",       desc: "Edición inline, selección, exportar CSV" },
            { name: "Sidebar",        cmd: "sidebar",         desc: "Slide-out colapsable, secciones, localStorage" },
            { name: "Chart",          cmd: "chart",           desc: "line, bar, area, pie — Recharts wrapper" },
            { name: "FloatingActions",cmd: "floating-actions", desc: "Botones flotantes arrastrables, N acciones por JSON" },
            { name: "DynamicFilter",  cmd: "dynamic-filter",  desc: "Filtros configurables por JSON: text, select, multiselect, date, boolean" },
          ].map(({ name, cmd, desc }) => (
            <Link
              key={cmd}
              href={`/${cmd}`}
              className="group rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</span>
                <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                  {cmd}
                </code>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </DocSection>
    </div>
  )
}
