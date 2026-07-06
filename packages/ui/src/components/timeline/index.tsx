"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface TimelineItem {
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "error"
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const VARIANT_DOT: Record<string, string> = {
  default: "bg-primary border-primary",
  success: "bg-green-500 border-green-500",
  warning: "bg-yellow-500 border-yellow-500",
  error:   "bg-destructive border-destructive",
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        const variant = item.variant ?? "default"

        return (
          <li key={i} className="flex gap-4">
            {/* Dot + line column */}
            <div className="flex flex-col items-center">
              {/* Dot / icon */}
              <div
                className={cn(
                  "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                  item.icon
                    ? "bg-muted border-border text-muted-foreground"
                    : VARIANT_DOT[variant]
                )}
              >
                {item.icon ? (
                  <span className="text-sm">{item.icon}</span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-white dark:bg-background" />
                )}
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="mt-1 w-px flex-1 min-h-6 bg-border" />
              )}
            </div>

            {/* Content */}
            <div className={cn("min-w-0 flex-1 pb-6 pt-1", isLast && "pb-0")}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                {item.date && (
                  <time className="shrink-0 text-xs text-muted-foreground">{item.date}</time>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
