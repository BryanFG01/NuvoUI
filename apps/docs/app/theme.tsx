"use client"

import * as React from "react"
import { cn } from "@nuvo-ui/ui"

// ─── Definición de temas ──────────────────────────────────────────────────────
interface ThemeConfig {
  name: string
  label: string
  color: string
  vars: Record<string, string>
}

const THEMES: ThemeConfig[] = [
  {
    name: "blue",
    label: "Azul",
    color: "#3b82f6",
    vars: {
      "--primary": "221 83% 58%",
      "--primary-foreground": "0 0% 100%",
      "--ring": "221 83% 58%",
    },
  },
  {
    name: "purple",
    label: "Violeta",
    color: "#9333ea",
    vars: {
      "--primary": "270 91% 65%",
      "--primary-foreground": "0 0% 100%",
      "--ring": "270 91% 65%",
    },
  },
  {
    name: "emerald",
    label: "Esmeralda",
    color: "#10b981",
    vars: {
      "--primary": "158 64% 52%",
      "--primary-foreground": "0 0% 100%",
      "--ring": "158 64% 52%",
    },
  },
  {
    name: "rose",
    label: "Rosa",
    color: "#f43f5e",
    vars: {
      "--primary": "347 77% 50%",
      "--primary-foreground": "0 0% 100%",
      "--ring": "347 77% 50%",
    },
  },
  {
    name: "amber",
    label: "Ámbar",
    color: "#f59e0b",
    vars: {
      "--primary": "38 92% 50%",
      "--primary-foreground": "0 0% 100%",
      "--ring": "38 92% 50%",
    },
  },
]

const STORAGE_KEY = "nuvo-ui-docs-theme"

// ─── Context ──────────────────────────────────────────────────────────────────
interface ThemeContextValue {
  theme: string
  setTheme: (name: string) => void
  themes: ThemeConfig[]
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "blue",
  setTheme: () => {},
  themes: THEMES,
})

function applyVars(name: string) {
  const config = THEMES.find((t) => t.name === name)
  if (!config || typeof document === "undefined") return
  const root = document.documentElement
  Object.entries(config.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val)
  })
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState("blue")

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) ?? "blue"
    applyVars(stored)
    setThemeState(stored)
  }, [])

  function setTheme(name: string) {
    applyVars(name)
    localStorage.setItem(STORAGE_KEY, name)
    setThemeState(name)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return React.useContext(ThemeContext)
}

// ─── ThemeSwitcher ────────────────────────────────────────────────────────────
export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs text-muted-foreground sm:block">Color:</span>
      <div className="flex items-center gap-1.5" role="group" aria-label="Elegir tema de color">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            title={t.label}
            aria-label={`Tema ${t.label}`}
            aria-pressed={theme === t.name}
            className={cn(
              "h-5 w-5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
              "hover:scale-110",
              theme === t.name
                ? "scale-110 ring-2 ring-offset-2 ring-offset-background"
                : "opacity-70 hover:opacity-100"
            )}
            style={{
              backgroundColor: t.color,
              ringColor: t.color,
            }}
          />
        ))}
      </div>
    </div>
  )
}
