"use client"

import * as React from "react"

// ─── Types ─────────────────────────────────────────────────────────────────────

export type FloatingVariant = "default" | "success" | "warning" | "info" | "danger"

export interface FloatingAction {
  key: string
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: FloatingVariant
  disabled?: boolean
}

// ─── Variants ──────────────────────────────────────────────────────────────────

const btnVariants: Record<FloatingVariant, string> = {
  default: "bg-primary hover:bg-primary/90",
  success: "bg-green-500 hover:bg-green-600",
  warning: "bg-amber-500 hover:bg-amber-600",
  info:    "bg-blue-500 hover:bg-blue-600",
  danger:  "bg-red-500 hover:bg-red-600",
}

const labelVariants: Record<FloatingVariant, string> = {
  default: "bg-primary/10 text-primary",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  info:    "bg-blue-100 text-blue-700",
  danger:  "bg-red-100 text-red-700",
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

// ─── Hook: draggable ───────────────────────────────────────────────────────────

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

interface DraggableOptions {
  contained?: boolean
  containerRef?: React.RefObject<HTMLElement>
}

function useDraggable(initialPos = { x: 24, y: 24 }, options: DraggableOptions = {}) {
  const { contained, containerRef } = options
  const [pos, setPos] = React.useState(initialPos)
  const ref = React.useRef<HTMLButtonElement>(null)
  const dragging = React.useRef(false)
  const hasMoved = React.useRef(false)
  const startMouse = React.useRef({ x: 0, y: 0 })
  const startPos = React.useRef(initialPos)

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !ref.current) return
      const dx = e.clientX - startMouse.current.x
      const dy = e.clientY - startMouse.current.y
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved.current = true

      const size = ref.current.offsetWidth
      const container = containerRef?.current
      const maxX = contained && container ? container.offsetWidth  - size - 8 : window.innerWidth  - size - 8
      const maxY = contained && container ? container.offsetHeight - size - 8 : window.innerHeight - size - 8

      setPos({
        x: clamp(startPos.current.x - dx, 8, maxX),
        y: clamp(startPos.current.y - dy, 8, maxY),
      })
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [contained, containerRef])

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    hasMoved.current = false
    startMouse.current = { x: e.clientX, y: e.clientY }
    startPos.current = { ...pos }
  }

  return { pos, ref, hasMoved, onMouseDown }
}

// ─── FloatingButton ────────────────────────────────────────────────────────────

export interface FloatingButtonProps {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  variant?: FloatingVariant
  disabled?: boolean
  /**
   * Confina el botón dentro del contenedor padre (position: absolute).
   * El padre debe tener position: relative.
   */
  contained?: boolean
  /** Ref del contenedor para calcular los límites de arrastre. */
  containerRef?: React.RefObject<HTMLElement>
}

export function FloatingButton({
  label,
  onClick,
  icon,
  variant = "default",
  disabled,
  contained,
  containerRef,
}: FloatingButtonProps) {
  const { pos, ref, hasMoved, onMouseDown } = useDraggable({ x: 24, y: 24 }, { contained, containerRef })

  return (
    <button
      ref={ref}
      onMouseDown={onMouseDown}
      onClick={() => { if (!hasMoved.current) onClick() }}
      disabled={disabled}
      title={label}
      style={{ right: pos.x, bottom: pos.y }}
      className={[
        contained ? "absolute" : "fixed",
        "z-50 flex items-center gap-2 rounded-full px-4 py-3",
        "text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl",
        "select-none cursor-grab active:cursor-grabbing",
        "disabled:cursor-not-allowed disabled:opacity-50",
        btnVariants[variant],
      ].join(" ")}
    >
      {icon ?? <PlusIcon />}
      {label}
    </button>
  )
}

// ─── FloatingActions ───────────────────────────────────────────────────────────

export interface FloatingActionsProps {
  actions: FloatingAction[]
  variant?: FloatingVariant
  icon?: React.ReactNode
  /**
   * Confina el grupo dentro del contenedor padre (position: absolute).
   * El padre debe tener position: relative y un alto suficiente.
   */
  contained?: boolean
  /** Ref del contenedor para calcular los límites de arrastre. */
  containerRef?: React.RefObject<HTMLElement>
}

export function FloatingActions({
  actions,
  variant = "default",
  icon,
  contained,
  containerRef,
}: FloatingActionsProps) {
  const [open, setOpen] = React.useState(false)
  const { pos, ref, hasMoved, onMouseDown } = useDraggable({ x: 24, y: 24 }, { contained, containerRef })

  if (actions.length === 0) return null

  if (actions.length === 1) {
    const [a] = actions
    if (!a) return null
    return (
      <FloatingButton
        label={a.label}
        onClick={a.onClick}
        icon={a.icon ?? icon}
        variant={a.variant ?? variant}
        disabled={a.disabled}
        contained={contained}
        containerRef={containerRef}
      />
    )
  }

  return (
    <div
      className={[
        contained ? "absolute" : "fixed",
        "z-50 flex flex-col items-end",
      ].join(" ")}
      style={{ right: pos.x, bottom: pos.y }}
    >
      {open && (
        <div className="mb-3 flex flex-col-reverse gap-2 items-end">
          {actions.map((action, i) => (
            <div
              key={action.key}
              className="flex items-center gap-2 animate-in slide-in-from-right-4 fade-in duration-150"
              style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
            >
              <span
                className={[
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm",
                  "pointer-events-none select-none",
                  action.disabled
                    ? "bg-gray-100 text-gray-400"
                    : labelVariants[action.variant ?? "default"],
                ].join(" ")}
              >
                {action.label}
              </span>
              <button
                onClick={() => { setOpen(false); action.onClick() }}
                title={action.label}
                disabled={action.disabled}
                className={[
                  "flex size-10 shrink-0 items-center justify-center rounded-full",
                  "text-white shadow-md transition-all select-none",
                  action.disabled
                    ? "opacity-40 cursor-not-allowed bg-gray-400"
                    : `hover:scale-110 ${btnVariants[action.variant ?? "default"]}`,
                ].join(" ")}
              >
                {action.icon ?? <PlusIcon />}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative">
        {!open && (
          <span className="absolute -top-1 -right-1 z-10 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white pointer-events-none">
            {actions.length}
          </span>
        )}
        <button
          ref={ref}
          onMouseDown={onMouseDown}
          onClick={() => { if (!hasMoved.current) setOpen((p) => !p) }}
          title={open ? "Cerrar acciones" : "Ver acciones"}
          className={[
            "flex size-11 items-center justify-center rounded-full text-white",
            "shadow-lg transition-all hover:shadow-xl",
            "select-none cursor-grab active:cursor-grabbing",
            btnVariants[variant],
          ].join(" ")}
        >
          {open ? <XIcon /> : (icon ?? <GridIcon />)}
        </button>
      </div>
    </div>
  )
}
