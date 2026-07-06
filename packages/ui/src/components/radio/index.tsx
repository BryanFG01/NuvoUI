"use client"

import * as RadixRadio from "@radix-ui/react-radio-group"
import * as React from "react"
import { cn } from "../../lib/utils"

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
  label?: string
  className?: string
  children: React.ReactNode
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  disabled,
  orientation = "vertical",
  label,
  className,
  children,
}: RadioGroupProps) {
  return (
    <div className={className}>
      {label && (
        <p className="mb-2 text-sm font-medium text-foreground">{label}</p>
      )}
      <RadixRadio.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        orientation={orientation}
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        )}
      >
        {children}
      </RadixRadio.Root>
    </div>
  )
}

// ─── Radio ────────────────────────────────────────────────────────────────────

export interface RadioProps {
  value: string
  label?: string
  description?: string
  disabled?: boolean
  id?: string
  className?: string
}

export function Radio({ value, label, description, disabled, id, className }: RadioProps) {
  const generatedId = React.useId()
  const fieldId     = id ?? generatedId

  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <RadixRadio.Item
        id={fieldId}
        value={value}
        disabled={disabled}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-input bg-background transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-primary"
        )}
      >
        <RadixRadio.Indicator className="flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-primary block" />
        </RadixRadio.Indicator>
      </RadixRadio.Item>

      {(label || description) && (
        <div className="min-w-0">
          {label && (
            <label
              htmlFor={fieldId}
              className={cn(
                "text-sm font-medium leading-tight text-foreground cursor-pointer",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={cn("mt-0.5 text-xs text-muted-foreground", disabled && "opacity-50")}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
