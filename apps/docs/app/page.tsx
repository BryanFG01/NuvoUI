import Link from "next/link"
import { DocTitle, DocSubtitle, DocSection, DocDivider, DocNote, Code, StepList, Step } from "./doc-ui"

// ─── Componentes disponibles ──────────────────────────────────────────────────
const COMPONENTS = [
  { name: "Button",     cmd: "button",      href: "/button",     desc: "6 variantes, 4 tamaños, asChild" },
  { name: "Badge",      cmd: "badge",       href: "/badge",      desc: "6 variantes de color, dot indicator" },
  { name: "Card",       cmd: "card",        href: "/card",       desc: "Header, Title, Description, Content, Footer" },
  { name: "Input",      cmd: "input",       href: "/input",      desc: "Label, helper text, validación inline" },
  { name: "DatePicker", cmd: "date-picker", href: "/date-picker",desc: "Selector de fecha accesible nativo" },
  { name: "Modal",      cmd: "modal",       href: "/modal",      desc: "Radix Dialog + Modal.Footer composable" },
  { name: "StatCard",   cmd: "stat-card",   href: "/stat-card",  desc: "Métrica con trend y formato automático" },
  { name: "DataTable",  cmd: "data-table",  href: "/data-table", desc: "API 3 capas: JSON / render / compound" },
  { name: "DataGrid",   cmd: "data-grid",   href: "/data-grid",  desc: "Edición inline, selección, export CSV" },
  { name: "Sidebar",    cmd: "sidebar",     href: "/sidebar",    desc: "JSON items, submenús, localStorage" },
  { name: "Chart",      cmd: "chart",       href: "/chart",      desc: "line, bar, area, pie — Recharts wrapper" },
]

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <span>⚡</span>
          <span>{COMPONENTS.length} componentes · Copy-paste · Sin dependencias extra</span>
        </div>
        <DocTitle>Instalación</DocTitle>
        <DocSubtitle>
          NuvoUI copia los componentes directamente en tu proyecto. Sin dependencia npm
          que no controlas — el código es tuyo desde el primer día.
        </DocSubtitle>
      </div>

      {/* ── Inicio rápido ─────────────────────────────────────────────────── */}
      <DocSection title="⚡ Inicio Rápido">
        <StepList>
          <Step
            n={1}
            title="Inicializar Proyecto"
            description="Ejecuta el comando init para configurar las variables de entorno y el sistema de temas en tu proyecto local."
          >
            <Code code="pnpm dlx nuvo-ui init" />
          </Step>

          <Step
            n={2}
            title="Añadir Componentes"
            description="Selecciona el componente que necesites e inyéctalo directamente en tu carpeta de componentes."
          >
            <Code code="pnpm dlx nuvo-ui add button data-table sidebar chart" />
          </Step>

          <Step
            n={3}
            title="¡Listo para usar!"
            description="Importa el componente en tu aplicación y empieza a construir interfaces de alto rendimiento."
          >
            <Code
              label="components/ui/button/index.tsx"
              code={`// Importa desde donde el CLI lo copió
import { Button } from "@/components/ui/button"

export default function App() {
  return <Button variant="default">Hola NuvoUI</Button>
}`}
            />
          </Step>
        </StepList>

        <DocNote>
          El CLI detecta automáticamente si usas pnpm, npm, yarn o bun e instala las
          dependencias necesarias de cada componente.
        </DocNote>
      </DocSection>

      <DocDivider />

      {/* ── CSS Variables ─────────────────────────────────────────────────── */}
      <DocSection
        title="Variables CSS requeridas"
        description="Todos los tokens de color derivan de estas variables. Pégalas en tu globals.css."
      >
        <Code
          label="globals.css"
          code={`@layer base {
  :root {
    --background:          0   0%  100%;
    --foreground:          222.2 84% 4.9%;
    --primary:             221.2 83.2% 53.3%;
    --primary-foreground:  210 40% 98%;
    --muted:               210 40% 96.1%;
    --muted-foreground:    215.4 16.3% 46.9%;
    --border:              214.3 31.8% 91.4%;
    --destructive:         0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --ring:   221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
  .dark {
    --background:         222.2 84% 4.9%;
    --foreground:         210 40% 98%;
    --primary:            217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --muted:              217.2 32.6% 17.5%;
    --muted-foreground:   215 20.2% 65.1%;
    --border:             217.2 32.6% 17.5%;
    --destructive:        0 62.8% 30.6%;
  }
}`}
        />
      </DocSection>

      <DocDivider />

      {/* ── Tailwind config ───────────────────────────────────────────────── */}
      <DocSection
        title="Configuración de Tailwind"
        description="Agrega los tokens y el path de los componentes a tu tailwind.config."
      >
        <Code
          label="tailwind.config.ts"
          code={`export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}", // donde el CLI copia los archivos
  ],
  theme: {
    extend: {
      colors: {
        border:     "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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

      {/* ── Componentes ───────────────────────────────────────────────────── */}
      <DocSection title="Componentes disponibles">
        <div className="grid gap-3 sm:grid-cols-2">
          {COMPONENTS.map(({ name, cmd, href, desc }) => (
            <Link
              key={cmd}
              href={href}
              className="group rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {name}
                </span>
                <code className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  {cmd}
                </code>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </DocSection>

    </div>
  )
}
