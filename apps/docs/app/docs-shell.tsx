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
      { label: "Button",     href: "/button" },
      { label: "Badge",      href: "/badge" },
      { label: "Card",       href: "/card" },
      { label: "Input",      href: "/input" },
      { label: "DatePicker", href: "/date-picker" },
      { label: "Modal",      href: "/modal" },
      { label: "StatCard",   href: "/stat-card" },
      { label: "DataTable",  href: "/data-table" },
      { label: "DataGrid",   href: "/data-grid" },
      { label: "Sidebar",    href: "/sidebar" },
      { label: "Chart",      href: "/chart" },
    ],
  },
  {
    section: "Ejemplos",
    items: [{ label: "CRUD usuarios", href: "/crud" }],
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6"  x2="6"  y2="18"/>
      <line x1="6"  y1="6"  x2="18" y2="18"/>
    </svg>
  )
}

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
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  )
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

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

// ─── Sidebar nav content (shared between desktop and mobile) ──────────────────

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <>
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-5">
        <span className="text-base font-bold text-foreground">NuvoUI</span>
        <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">v0.1</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
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
                    onClick={onNavigate}
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
    </>
  )
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isLight, toggle } = useDarkLight()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Close mobile sidebar on route change
  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  // Lock body scroll while mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Desktop sidebar (always visible ≥ md) ───────────────────────── */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-56 md:flex-col border-r border-border bg-background">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* ── Mobile sidebar overlay ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile sidebar drawer ────────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-background shadow-xl",
          "transform transition-transform duration-200 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Menú de navegación"
      >
        {/* Close button inside drawer */}
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Cerrar menú"
          className="absolute right-3 top-3.5 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <CloseIcon />
        </button>
        <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="flex min-h-screen w-full flex-col md:ml-56">

        {/* Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background px-4 md:px-8">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            >
              <MenuIcon />
            </button>

            {/* Breadcrumb */}
            <nav aria-label="Migas de pan" className="flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">docs</span>
              {pathname !== "/" && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <span className="font-medium text-foreground">
                    {pathname.replace("/", "")}
                  </span>
                </>
              )}
            </nav>
          </div>

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

        {/* Page content */}
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 md:px-8 md:py-10">
          {children}
        </main>

        <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground md:px-8">
          NuvoUI · MIT · React + Tailwind CSS + Radix UI
        </footer>
      </div>
    </div>
  )
}
