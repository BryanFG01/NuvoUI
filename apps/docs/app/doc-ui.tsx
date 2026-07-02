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

export function DocInstall({ component }: { component: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-sm text-muted-foreground">
      pnpm dlx nuvo-ui add {component}
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
        "rounded-lg border border-border bg-background p-6",
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
