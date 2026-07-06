"use client"

import { Badge, Button } from "@nuvo-ui/ui"

// Tokens exactos de apps/docs/app/globals.css
const TOKENS = [
  {
    name: "Primary",
    var:  "--primary",
    dark:  "221 83% 58%",
    light: "221 83% 53%",
    description: "Acción principal, links activos, foco",
  },
  {
    name: "Background",
    var:  "--background",
    dark:  "235 52% 4%",
    light: "0 0% 100%",
    description: "Fondo base de la aplicación",
  },
  {
    name: "Foreground",
    var:  "--foreground",
    dark:  "0 0% 96%",
    light: "222 84% 5%",
    description: "Texto principal sobre el fondo",
  },
  {
    name: "Muted",
    var:  "--muted",
    dark:  "240 30% 12%",
    light: "210 40% 96%",
    description: "Superficies secundarias, chips, tags",
  },
  {
    name: "Muted Foreground",
    var:  "--muted-foreground",
    dark:  "240 10% 55%",
    light: "215 16% 47%",
    description: "Texto apagado, placeholders, captions",
  },
  {
    name: "Border",
    var:  "--border",
    dark:  "240 20% 16%",
    light: "214 32% 91%",
    description: "Bordes de tarjetas, inputs y divisores",
  },
  {
    name: "Destructive",
    var:  "--destructive",
    dark:  "0 63% 50%",
    light: "0 84% 60%",
    description: "Errores, eliminación, acciones críticas",
  },
  {
    name: "Ring",
    var:  "--ring",
    dark:  "221 83% 58%",
    light: "221 83% 53%",
    description: "Outline de foco para accesibilidad",
  },
]

const BADGE_VARIANTS: { label: string; variant: "default" | "muted" | "success" | "info" | "warning" | "error" }[] = [
  { label: "Default", variant: "default" },
  { label: "Muted",   variant: "muted" },
  { label: "Success", variant: "success" },
  { label: "Info",    variant: "info" },
  { label: "Warning", variant: "warning" },
  { label: "Error",   variant: "error" },
]

const BUTTON_VARIANTS: { label: string; variant: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" }[] = [
  { label: "Default",     variant: "default" },
  { label: "Secondary",   variant: "secondary" },
  { label: "Outline",     variant: "outline" },
  { label: "Ghost",       variant: "ghost" },
  { label: "Destructive", variant: "destructive" },
  { label: "Link",        variant: "link" },
]

export function ColoresSection() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-bold text-foreground">Paleta de la librería</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Tokens CSS definidos en <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">globals.css</code>. Los colores cambian automáticamente entre modo oscuro y claro.
        </p>
      </div>

      {/* Token swatches */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tokens del sistema</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {TOKENS.map(({ name, var: v, dark, light }) => (
            <div key={v} className="overflow-hidden rounded-xl border border-border">
              {/* swatch vivo — usa el token actual del tema */}
              <div
                style={{ background: `hsl(var(${v}))`, height: 72 }}
                className="relative w-full"
              >
                <span className="absolute bottom-2 right-2 rounded bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-white/90 backdrop-blur-sm">
                  {v}
                </span>
              </div>
              <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-foreground">{name}</p>
                <div className="mt-1.5 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-foreground/20 ring-1 ring-border" />
                    <code className="text-[10px] text-muted-foreground">dark  {dark}</code>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-foreground/10 ring-1 ring-border" />
                    <code className="text-[10px] text-muted-foreground">light {light}</code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Badge variants */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Badge — variantes</h3>
        <div className="flex flex-wrap gap-3">
          {BADGE_VARIANTS.map(({ label, variant }) => (
            <div key={variant} className="flex flex-col items-start gap-2">
              <Badge variant={variant}>{label}</Badge>
              <Badge variant={variant} dot>{label}</Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Button variants */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Button — variantes</h3>
        <div className="flex flex-wrap gap-2 items-center">
          {BUTTON_VARIANTS.map(({ label, variant }) => (
            <Button key={variant} variant={variant} size="sm">{label}</Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {BUTTON_VARIANTS.map(({ label, variant }) => (
            <Button key={`${variant}-dis`} variant={variant} size="sm" disabled>{label}</Button>
          ))}
        </div>
      </section>

      {/* Typography scale */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Escala tipográfica</h3>
        <div className="rounded-xl border border-border p-5 space-y-2">
          <p className="text-4xl font-bold text-foreground leading-none">Heading XL</p>
          <p className="text-2xl font-bold text-foreground">Heading LG</p>
          <p className="text-xl font-semibold text-foreground">Heading MD</p>
          <p className="text-base text-foreground">Body — texto principal con máxima legibilidad.</p>
          <p className="text-sm text-muted-foreground">Small — texto secundario, captions y etiquetas.</p>
          <p className="text-xs text-muted-foreground">XSmall — metadata, timestamps y ayuda contextual.</p>
          <code className="text-xs rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
            font-mono — código inline
          </code>
        </div>
      </section>
    </div>
  )
}
