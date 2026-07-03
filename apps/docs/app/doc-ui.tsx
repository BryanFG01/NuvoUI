"use client"

import * as React from "react"
import { cn } from "@nuvo-ui/ui"

// ─── Componentes reutilizables para páginas de documentación ──────────────────

export function DocTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold tracking-tight text-foreground">{children}</h1>
  )
}

export function DocSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-base text-muted-foreground">{children}</p>
}

// ─── Package manager tabs ─────────────────────────────────────────────────────

type PM = "pnpm" | "npm" | "yarn" | "bun"

const PM_EXEC: Record<PM, string> = {
  pnpm: "pnpm dlx",
  npm:  "npx",
  yarn: "yarn dlx",
  bun:  "bunx",
}

const PM_LIST: PM[] = ["pnpm", "npm", "yarn", "bun"]

function PMTabBar({
  active,
  onChange,
}: {
  active: PM
  onChange: (pm: PM) => void
}) {
  return (
    <div className="flex gap-1 rounded-t-lg border border-b-0 border-border bg-muted/50 px-2 pt-2">
      {PM_LIST.map((pm) => (
        <button
          key={pm}
          type="button"
          onClick={() => onChange(pm)}
          className={cn(
            "rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors",
            active === pm
              ? "bg-black/40 text-slate-200"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {pm}
        </button>
      ))}
    </div>
  )
}

export function DocInstall({ component }: { component: string }) {
  const [pm, setPm] = React.useState<PM>("pnpm")
  const cmd = `${PM_EXEC[pm]} nuvo-ui add ${component}`
  return (
    <div>
      <PMTabBar active={pm} onChange={setPm} />
      <pre className="overflow-x-auto rounded-b-lg rounded-tr-lg border border-border bg-black/40 px-4 py-3 text-xs text-slate-200">
        <code>{cmd}</code>
      </pre>
    </div>
  )
}

export function PMInstallBlock({
  initCmd,
  addCmd,
}: {
  initCmd: string
  addCmd: string
}) {
  const [pm, setPm] = React.useState<PM>("pnpm")
  const exec = PM_EXEC[pm]
  const code = [
    `# 1. Inicializar (crea nuvo-ui.json con tu config)`,
    `${exec} nuvo-ui init`,
    ``,
    `# 2. Agregar los componentes que necesitas`,
    `${exec} nuvo-ui add ${addCmd}`,
    ``,
    `# 3. Listo — el código está en components/ui/`,
  ].join("\n")

  return (
    <div>
      <PMTabBar active={pm} onChange={setPm} />
      <pre className="overflow-x-auto rounded-b-lg rounded-tr-lg border border-border bg-black/40 p-4 text-xs leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function DocSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export function Preview({
  children,
  className,
  center = false,
}: {
  children: React.ReactNode
  className?: string
  center?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background p-4 md:p-6",
        center && "flex flex-wrap items-center justify-center gap-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export function Code({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-black/40 p-4 text-xs leading-relaxed text-slate-200">
      <code>{code.trim()}</code>
    </pre>
  )
}

export function PropsTable({
  props,
}: {
  props: { name: string; type: string; default?: string; description: string }[]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/50">
          <tr>
            {["Prop", "Tipo", "Default", "Descripción"].map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {props.map((p) => (
            <tr key={p.name} className="hover:bg-muted/30">
              <td className="px-4 py-2.5 font-mono text-xs font-medium text-foreground">
                {p.name}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-primary">{p.type}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                {p.default ?? "—"}
              </td>
              <td className="px-4 py-2.5 text-xs text-muted-foreground">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocDivider() {
  return <hr className="border-border" />
}

export function DocNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
      <span className="font-semibold text-primary">Nota: </span>
      {children}
    </div>
  )
}
