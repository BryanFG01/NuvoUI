"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export type StepStatus = "complete" | "active" | "upcoming"

export interface StepItem {
  title: string
  description?: string
  status?: StepStatus
}

export interface StepperProps {
  steps: StepItem[]
  currentStep?: number
  orientation?: "horizontal" | "vertical"
  className?: string
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

export function Stepper({ steps, currentStep, orientation = "horizontal", className }: StepperProps) {
  const resolvedSteps: (StepItem & { status: StepStatus })[] = steps.map((s, i) => ({
    ...s,
    status: s.status ?? (
      currentStep === undefined
        ? "upcoming"
        : i < currentStep
        ? "complete"
        : i === currentStep
        ? "active"
        : "upcoming"
    ),
  }))

  if (orientation === "vertical") {
    return (
      <ol className={cn("flex flex-col gap-0", className)}>
        {resolvedSteps.map((step, i) => {
          const isLast = i === resolvedSteps.length - 1
          return (
            <li key={i} className="flex gap-4">
              {/* Indicator column */}
              <div className="flex flex-col items-center">
                <StepIndicator index={i} status={step.status} />
                {!isLast && (
                  <div className={cn(
                    "mt-1 w-px flex-1 min-h-8",
                    step.status === "complete" ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-6 pt-0.5", isLast && "pb-0")}>
                <p className={cn("text-sm font-semibold leading-tight", step.status === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ol className={cn("flex items-start", className)}>
      {resolvedSteps.map((step, i) => {
        const isLast = i === resolvedSteps.length - 1
        return (
          <li key={i} className={cn("flex flex-1 flex-col items-center", !isLast && "relative")}>
            {/* Connector line */}
            {!isLast && (
              <div className={cn(
                "absolute left-1/2 top-4 h-px w-full -translate-y-1/2",
                step.status === "complete" ? "bg-primary" : "bg-border"
              )} />
            )}

            <StepIndicator index={i} status={step.status} />

            <div className="mt-2 text-center">
              <p className={cn("text-xs font-semibold", step.status === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
                {step.title}
              </p>
              {step.description && (
                <p className="mt-0.5 text-[11px] text-muted-foreground">{step.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function StepIndicator({ index, status }: { index: number; status: StepStatus }) {
  return (
    <div
      aria-label={`Paso ${index + 1}: ${status}`}
      className={cn(
        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
        status === "complete" && "border-primary bg-primary text-primary-foreground",
        status === "active"   && "border-primary bg-background text-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]",
        status === "upcoming" && "border-border bg-background text-muted-foreground"
      )}
    >
      {status === "complete" ? <CheckIcon /> : index + 1}
    </div>
  )
}
