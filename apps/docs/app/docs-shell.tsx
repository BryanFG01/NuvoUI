"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@nuvo-ui/ui"
import { ThemeSwitcher } from "./theme"

const NAV = [
  {
    section: "Inicio",
    items: [{ label: "Instalación", href: "/" }],
  },
  {
    section: "Componentes",
    items: [
      { label: "Button",      href: "/button" },
      { label: "Badge",       href: "/badge" },
      { label: "Card",        href: "/card" },
      { label: "Input",       href: "/input" },
      { label: "DatePicker",  href: "/date-picker" },
      { label: "Modal",       href: "/modal" },
      { label: "StatCard",    href: "/stat-card" },
      { label: "DataTable",   href: "/data-table" },
      { label: "DataGrid",    href: "/data-grid" },
      { label: "Sidebar",     href: "/sidebar" },
      { label: "Chart",       href: "/chart" },
    ],
  },
  {
    section: "Ejemplos",
    items: [{ label: "CRUD usuarios", href: "/crud" }],
  },
]

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function useDarkLight() {
  const [isLight, setIsLight] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem("nuvo-ui-mode")
    if (stored === "light") {
      document.documentElement.classList.add("light")
      setIsLight(true)
    }
  }, [])

  function toggle() {
    const next = !isLight
    document.documentElement.classList.toggle("light", next)
    localStorage.setItem("nuvo-ui-mode", next ? "light" : "dark")
    setIsLight(next)
  }

  return { isLight, toggle }
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isLight, toggle } = useDarkLight()

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 w-56 border-r border-border bg-background">
        <div className="flex h-14 items-center gap-2 border-b border-border px-5">
          <span className="text-base font-bold text-foreground">NuvoUI</span>
          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">v0.1</span>
        </div>
        <nav className="h-[calc(100vh-3.5rem)] overflow-y-auto py-4">
          {NAV.map(({ section, items }) => (
            <div key={section} className="mb-5 px-3">
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {section}
              </p>
              <ul>
                {items.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                        pathname === href
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="ml-56 flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background px-8">
          <nav aria-label="Migas de pan" className="flex items-center gap-1.5 text-sm">
            <span className="text-muted-foreground">docs</span>
            {pathname !== "/" && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium text-foreground">{pathname.replace("/", "")}</span>
              </>
            )}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <button
              onClick={toggle}
              aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
            >
              {isLight ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-8 py-10">{children}</main>
        <footer className="border-t border-border px-8 py-4 text-center text-xs text-muted-foreground">
          NuvoUI · MIT · React + Tailwind CSS + Radix UI
        </footer>
      </div>
    </div>
  )
}
