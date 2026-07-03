'use client'

import { Badge, cn } from '@nuvo-ui/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { ThemeSwitcher } from './theme'

const NAV = [
  {
    section: 'Inicio',
    items: [{ label: 'Instalación', href: '/' }]
  },
  {
    section: 'Componentes',
    items: [
      { label: 'Button', href: '/button' },
      { label: 'Badge', href: '/badge' },
      { label: 'Card', href: '/card' },
      { label: 'Input', href: '/input' },
      { label: 'DatePicker', href: '/date-picker' },
      { label: 'Modal', href: '/modal' },
      { label: 'StatCard', href: '/stat-card' },
      { label: 'DataTable', href: '/data-table' },
      { label: 'DataGrid', href: '/data-grid' },
      { label: 'Sidebar', href: '/sidebar' },
      { label: 'Chart', href: '/chart' },
      { label: 'FloatingActions', href: '/floating-actions' },
      { label: 'DynamicFilter', href: '/dynamic-filter' }
    ]
  },
  {
    section: 'Ejemplos',
    items: [{ label: 'CRUD usuarios', href: '/crud' }]
  }
]

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// ─── Welcome Banner ───────────────────────────────────────────────────────────

function IconCode() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  )
}
function IconPen() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    </svg>
  )
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

const BENEFITS = [
  {
    icon: <IconCode />,
    title: "Control total",
    desc: "Eres dueño del código de los componentes.",
  },
  {
    icon: <IconPen />,
    title: "Diseño único",
    desc: "Puedes crear tu propio estilo.",
  },
  {
    icon: <IconClock />,
    title: "Ahorro de tiempo",
    desc: "No tienes que crear los componentes desde cero.",
  },
]

const DURATION = 7000

function WelcomeBanner() {
  const [visible, setVisible] = React.useState(false)
  const [exiting, setExiting] = React.useState(false)
  const [progress, setProgress] = React.useState(100)

  React.useEffect(() => {
    // Show banner on every visit with a small delay
    const show = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(show)
  }, [])

  React.useEffect(() => {
    if (!visible) return

    // Progress bar countdown
    const start = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.max(0, 100 - (elapsed / DURATION) * 100)
      setProgress(pct)
      if (pct === 0) clearInterval(tick)
    }, 50)

    // Auto-dismiss
    const hide = setTimeout(() => dismiss(), DURATION)

    return () => { clearInterval(tick); clearTimeout(hide) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  function dismiss() {
    setExiting(true)
    setTimeout(() => setVisible(false), 350)
  }

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        "bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-300",
        exiting ? "opacity-0" : "opacity-100"
      )}
      onClick={dismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl",
          "transition-all duration-350",
          exiting ? "scale-95 opacity-0 translate-y-2" : "scale-100 opacity-100 translate-y-0"
        )}
        style={{ transition: "transform 0.35s ease, opacity 0.35s ease" }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-[3px] w-full bg-border">
          <div
            className="h-full bg-primary transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">NuvoUI</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                Open Source
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Componentes que son 100% tuyos desde el primer día.
            </p>
          </div>
          <button
            onClick={dismiss}
            aria-label="Cerrar"
            className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Benefits */}
        <div className="space-y-3 px-6 pb-6">
          {BENEFITS.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/30 px-6 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            Totalmente open source ·{" "}
            <a
              href="https://github.com/BryanFG01/NuvoUI"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Ver en GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useDarkLight() {
  const [isLight, setIsLight] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem('nuvo-ui-mode')
    if (stored === 'light') {
      document.documentElement.classList.add('light')
      setIsLight(true)
    }
  }, [])

  function toggle() {
    const next = !isLight
    document.documentElement.classList.toggle('light', next)
    localStorage.setItem('nuvo-ui-mode', next ? 'light' : 'dark')
    setIsLight(next)
  }

  return { isLight, toggle }
}

// ─── Sidebar nav content (shared between desktop and mobile) ──────────────────

function SidebarContent({
  pathname,
  onNavigate,
  onToggle
}: {
  pathname: string
  onNavigate?: () => void
  onToggle?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      {/* ── Brand ── */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold leading-none text-foreground">NuvoUI</p>
          <p className="mt-0.5 text-[10px] leading-none text-muted-foreground">
            Components library
          </p>
        </div>
        <Badge variant="muted" size="sm" className="shrink-0">
          v0.1
        </Badge>
        {onToggle && (
          <button
            onClick={onToggle}
            aria-label="Colapsar menú"
            className="hidden md:flex ml-1 h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ChevronLeftIcon />
          </button>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV.map(({ section, items }, idx) => (
          <div
            key={section}
            className={cn('mb-2', idx > 0 && 'mt-5 border-t border-border/50 pt-4')}
          >
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              {section}
            </p>
            <ul className="space-y-0.5">
              {items.map(({ label, href }) => {
                const active = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      className={cn(
                        'relative flex items-center rounded-md px-3 py-2 text-sm transition-all duration-150',
                        active
                          ? 'bg-primary/10 font-semibold text-primary'
                          : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                      )}
                    >
                      {active && (
                        <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-r-full bg-primary" />
                      )}
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="shrink-0 border-t border-border px-4 py-3">
        <p className="text-[10px] text-muted-foreground/50">MIT · React · Tailwind · Radix UI</p>
      </div>
    </div>
  )
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isLight, toggle } = useDarkLight()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(false)

  // Load sidebar collapsed state from localStorage
  React.useEffect(() => {
    if (localStorage.getItem('nuvo-ui-sidebar') === 'collapsed') setCollapsed(true)
  }, [])

  function toggleCollapsed() {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('nuvo-ui-sidebar', next ? 'collapsed' : 'open')
  }

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll while mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className="flex min-h-screen bg-background">
      <WelcomeBanner />
      {/* ── Desktop sidebar (always visible ≥ md) ───────────────────────── */}
      <aside
        className={cn(
          'hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-60 md:flex-col',
          'border-r border-border bg-background',
          'transition-transform duration-300 ease-in-out',
          collapsed ? '-translate-x-full' : 'translate-x-0'
        )}
      >
        <SidebarContent pathname={pathname} onToggle={toggleCollapsed} />
      </aside>

      {/* ── Expand tab (only visible when sidebar is collapsed, desktop) ── */}
      <button
        onClick={toggleCollapsed}
        aria-label="Expandir menú"
        className={cn(
          'fixed left-0 top-[72px] z-30 hidden md:flex',
          'h-10 w-5 items-center justify-center',
          'rounded-r-md border border-l-0 border-border bg-background',
          'text-muted-foreground hover:bg-muted hover:text-foreground',
          'shadow-sm transition-all duration-300 ease-in-out',
          collapsed
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0 pointer-events-none'
        )}
      >
        <ChevronRightIcon />
      </button>

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
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-background shadow-xl',
          'transform transition-transform duration-200 ease-in-out md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
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
      <div
        className={cn(
          'flex min-h-screen w-full flex-col',
          'transition-[margin-left] duration-300 ease-in-out',
          collapsed ? 'md:ml-0' : 'md:ml-60'
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4 md:px-8">
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
              <span className="text-muted-foreground/60">docs</span>
              {pathname !== '/' && (
                <>
                  <span className="text-muted-foreground/40">/</span>
                  <span className="font-medium text-foreground">{pathname.replace('/', '')}</span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/BryanFG01/NuvoUI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver en GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <GitHubIcon />
            </a>
            <div className="h-10 w-px bg-border" />
            <ThemeSwitcher />
            <div className="h-10 w-px bg-border" />
            <button
              onClick={toggle}
              aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-md transition-colors',
                'text-muted-foreground hover:bg-muted hover:text-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring'
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

        <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground/50 md:px-8">
          NuvoUI · MIT License
        </footer>
      </div>
    </div>
  )
}
