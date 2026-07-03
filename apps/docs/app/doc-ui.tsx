"use client"

import * as React from "react"
import { cn } from "@nuvo-ui/ui"

// ─── Typography ───────────────────────────────────────────────────────────────

export function DocTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
      {children}
    </h1>
  )
}

export function DocSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
      {children}
    </p>
  )
}

export function DocInstall({ component }: { component: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        CLI
      </span>
      <code className="font-mono text-sm text-foreground">
        pnpm dlx nuvo-ui add {component}
      </code>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

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

// ─── Preview ──────────────────────────────────────────────────────────────────

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
        "rounded-xl border border-border bg-muted/20 p-4 md:p-6",
        center && "flex flex-wrap items-center justify-center gap-3",
        className
      )}
    >
      {children}
    </div>
  )
}

// ─── Code block ───────────────────────────────────────────────────────────────

export function Code({ code, label }: { code: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {label && (
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">{label}</span>
        </div>
      )}
      <pre className="overflow-x-auto bg-black/50 p-4 text-xs leading-relaxed text-slate-200">
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}

// ─── Steps ────────────────────────────────────────────────────────────────────

export function StepList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

export function Step({
  n,
  title,
  description,
  children,
}: {
  n: number
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="relative flex gap-4">
      {/* Number + connector line */}
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
          {n}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 pb-6">
        <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mb-3 text-sm text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}

// ─── Props table ──────────────────────────────────────────────────────────────

export function PropsTable({
  props,
}: {
  props: { name: string; type: string; default?: string; description: string }[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40">
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
            <tr key={p.name} className="transition-colors hover:bg-muted/30">
              <td className="px-4 py-2.5 font-mono text-xs font-semibold text-primary">
                {p.name}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                {p.type}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                {p.default ?? "—"}
              </td>
              <td className="px-4 py-2.5 text-xs text-foreground/80">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function DocDivider() {
  return <hr className="border-border" />
}

// ─── Note ─────────────────────────────────────────────────────────────────────

export function DocNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
      <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">ℹ</span>
      <span className="text-foreground/90">{children}</span>
    </div>
  )
}
