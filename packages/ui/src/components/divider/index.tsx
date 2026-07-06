"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface DividerProps {
  label?: string
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function Divider({ label, orientation = "horizontal", className }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("inline-block h-full w-px self-stretch bg-border", className)}
      />
    )
  }

  if (label) {
    return (
      <div role="separator" className={cn("flex items-center gap-3", className)}>
        <div className="h-px flex-1 bg-border" />
        <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
    )
  }

  return (
    <hr
      role="separator"
      className={cn("border-none h-px bg-border", className)}
    />
  )
}
