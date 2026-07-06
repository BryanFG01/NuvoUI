"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

// ─── PrintButton ──────────────────────────────────────────────────────────────

export interface PrintButtonProps {
  label?:    string
  selector?: string
  variant?:  "default" | "outline" | "ghost"
  size?:     "sm" | "md" | "lg"
  className?:string
  onBefore?: () => void
  onAfter?:  () => void
}

function PrinterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 6 2 18 2 18 9"/>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
  )
}

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

export function PrintButton({
  label     = "Imprimir",
  selector,
  variant   = "outline",
  size      = "md",
  className,
  onBefore,
  onAfter,
}: PrintButtonProps) {
  function handlePrint() {
    onBefore?.()

    if (selector) {
      // Print only a specific element
      const el = document.querySelector(selector)
      if (!el) { window.print(); return }
      const clone   = el.cloneNode(true) as HTMLElement
      const wrapper = document.createElement("div")
      wrapper.id    = "__nuvo_print_wrapper__"
      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      const style  = document.createElement("style")
      style.id     = "__nuvo_print_style__"
      style.textContent = `
        @media print {
          body > *:not(#__nuvo_print_wrapper__) { display: none !important; }
          #__nuvo_print_wrapper__ { display: block !important; }
        }
      `
      document.head.appendChild(style)
      window.print()

      document.body.removeChild(wrapper)
      document.head.removeChild(style)
    } else {
      window.print()
    }

    onAfter?.()
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={cn(
        "inline-flex items-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className
      )}
    >
      <PrinterIcon />
      {label}
    </button>
  )
}

// ─── PrintArea ────────────────────────────────────────────────────────────────
// Wraps a region and applies @media print styles

export interface PrintAreaProps {
  id?:        string
  children:   React.ReactNode
  className?: string
}

export function PrintArea({ id = "print-area", children, className }: PrintAreaProps) {
  return (
    <>
      <style>{`
        @media print {
          body > *:not(#${id}) { display: none !important; }
          #${id} { display: block !important; }
          #${id} { margin: 0; padding: 0; }
        }
      `}</style>
      <div id={id} className={className}>
        {children}
      </div>
    </>
  )
}
