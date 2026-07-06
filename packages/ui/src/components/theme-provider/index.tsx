"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { cn } from "../../lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = "dark" | "light" | "system"

export interface ThemeTransitionOrigin {
  x: number
  y: number
}

interface ThemeContextValue {
  theme:    Theme
  resolved: "dark" | "light"
  setTheme: (theme: Theme, origin?: ThemeTransitionOrigin) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "nuvo-ui-mode"

// ─── Detect system preference ────────────────────────────────────────────────

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

function resolve(theme: Theme): "dark" | "light" {
  return theme === "system" ? getSystemTheme() : theme
}

function applyThemeClass(resolved: "dark" | "light") {
  const root = document.documentElement
  root.classList.toggle("light", resolved === "light")
  root.classList.toggle("dark",  resolved === "dark")
  root.setAttribute("data-theme", resolved)
}

// ─── Wave transition ───────────────────────────────────────────────────────────
// Envuelve el cambio de tema en un View Transition nativo y anima un circle()
// que crece desde el punto de origen (el click) hasta cubrir toda la pantalla,
// revelando el nuevo tema como una ola. Sin soporte del navegador, o con
// prefers-reduced-motion, el cambio es instantáneo — nunca bloquea el toggle.

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function runWaveTransition(applyFn: () => void, origin?: ThemeTransitionOrigin) {
  const canAnimate =
    typeof document !== "undefined" &&
    typeof document.startViewTransition === "function" &&
    !prefersReducedMotion()

  if (!canAnimate) {
    applyFn()
    return
  }

  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? window.innerHeight / 2
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(applyFn)

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
    .catch(() => {
      // El navegador pudo cancelar el transition (ej. click repetido muy rápido) — no es fatal.
    })
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  children:     React.ReactNode
  defaultTheme?: Theme
  storageKey?:  string
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey   = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState]       = React.useState<Theme>(defaultTheme)
  const [resolved, setResolvedState] = React.useState<"dark" | "light">(() => resolve(defaultTheme))

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored === "dark" || stored === "light" || stored === "system") {
      setThemeState(stored)
    }
  }, [storageKey])

  // Apply class to <html> — useLayoutEffect para que corra de forma síncrona
  // dentro del flushSync de setTheme, antes de que el View Transition capture
  // el snapshot "nuevo".
  React.useLayoutEffect(() => {
    const next = resolve(theme)
    applyThemeClass(next)
    setResolvedState(next)
  }, [theme])

  // Watch system preference when theme === "system"
  React.useEffect(() => {
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: light)")
    const onChange = () => {
      const next = getSystemTheme()
      applyThemeClass(next)
      setResolvedState(next)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [theme])

  function setTheme(next: Theme, origin?: ThemeTransitionOrigin) {
    runWaveTransition(() => {
      localStorage.setItem(storageKey, next)
      flushSync(() => {
        setThemeState(next)
      })
    }, origin)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `}</style>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>")
  return ctx
}

// ─── ThemeSwitcher UI ─────────────────────────────────────────────────────────

function SunIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
}
function MoonIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
}
function MonitorIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
}

const OPTIONS: { value: Theme; icon: React.ReactNode; label: string }[] = [
  { value: "light",  icon: <SunIcon />,     label: "Claro"   },
  { value: "dark",   icon: <MoonIcon />,    label: "Oscuro"  },
  { value: "system", icon: <MonitorIcon />, label: "Sistema" },
]

export interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className={cn("inline-flex rounded-lg border border-border bg-muted p-0.5 gap-0.5", className)}>
      {OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          aria-label={opt.label}
          aria-pressed={theme === opt.value}
          onClick={(e) => setTheme(opt.value, { x: e.clientX, y: e.clientY })}
          className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            theme === opt.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.icon}
          <span className="hidden sm:inline">{opt.label}</span>
        </button>
      ))}
    </div>
  )
}
