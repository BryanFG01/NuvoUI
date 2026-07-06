"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ExportCSVColumn<T = Record<string, unknown>> {
  key: keyof T
  header?: string
  format?: (value: unknown, row: T) => string
}

export interface ExportCSVProps<T extends Record<string, unknown> = Record<string, unknown>> {
  data: T[]
  columns?: ExportCSVColumn<T>[]
  filename?: string
  delimiter?: "," | ";" | "\t"
  label?: string
  disabled?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onExport?: (rowCount: number) => void
}

// ─── CSV builder ─────────────────────────────────────────────────────────────

function buildCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: ExportCSVColumn<T>[],
  delimiter: string
): string {
  const headers = columns.map(c => String(c.header ?? c.key))
  const rows = data.map(row =>
    columns.map(col => {
      const raw = row[col.key]
      const val = col.format ? col.format(raw, row) : String(raw ?? "")
      return val.includes(delimiter) || val.includes('"') || val.includes("\n")
        ? `"${val.replace(/"/g, '""')}"`
        : val
    })
  )
  return [headers.join(delimiter), ...rows.map(r => r.join(delimiter))].join("\n")
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const bom  = "﻿"
  const blob = new Blob([bom + content], { type: mimeType + ";charset=utf-8;" })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement("a")
  a.href     = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Icon ────────────────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

// ─── Size/variant styles ──────────────────────────────────────────────────────

const SIZE_CLASSES = {
  sm: "h-7 gap-1.5 px-2.5 text-xs",
  md: "h-9 gap-2   px-3   text-sm",
  lg: "h-11 gap-2  px-4   text-base",
}

const VARIANT_CLASSES = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-border bg-background text-foreground hover:bg-muted",
  ghost:   "text-foreground hover:bg-muted",
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ExportCSV<T extends Record<string, unknown>>({
  data,
  columns,
  filename = "export.csv",
  delimiter = ",",
  label     = "Exportar CSV",
  disabled,
  variant   = "outline",
  size      = "md",
  className,
  onExport,
}: ExportCSVProps<T>) {
  const [loading, setLoading] = React.useState(false)

  const resolvedCols: ExportCSVColumn<T>[] = columns ??
    (data[0] ? (Object.keys(data[0]) as (keyof T)[]).map(k => ({ key: k })) : [])

  function handleExport() {
    if (!data.length || loading) return
    setLoading(true)
    try {
      const csv = buildCSV(data, resolvedCols, delimiter)
      downloadBlob(csv, filename.endsWith(".csv") ? filename : `${filename}.csv`, "text/csv")
      onExport?.(data.length)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      disabled={disabled || loading || !data.length}
      onClick={handleExport}
      className={cn(
        "inline-flex items-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-40",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className
      )}
    >
      <DownloadIcon />
      {label}
      {data.length > 0 && (
        <span className="ml-1 rounded bg-black/15 px-1 py-0.5 text-[10px] font-semibold">
          {data.length}
        </span>
      )}
    </button>
  )
}
