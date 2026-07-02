/**
 * Sidebar — API JSON pura
 *
 * <Sidebar
 *   items={[
 *     { label: "Dashboard", href: "/",      icon: HomeIcon },
 *     { label: "Usuarios",  href: "/users", icon: UsersIcon, children: [
 *       { label: "Todos",       href: "/users" },
 *       { label: "Invitaciones",href: "/users/invites" },
 *     ]},
 *   ]}
 *   logo={<Logo />}
 *   activeHref="/users"
 *   onNavigate={(href) => router.push(href)}
 * />
 */
import * as React from "react"
import * as Collapsible from "@radix-ui/react-collapsible"
import { cn } from "../../lib/utils"

// ─── Tipos ────────────────────────────────────────────────────────────────────
export interface SidebarChildItem {
  label: string
  href: string
  icon?: React.ElementType<{ className?: string; "aria-hidden"?: string }>
}

export interface SidebarItem {
  label: string
  href: string
  icon?: React.ElementType<{ className?: string; "aria-hidden"?: string }>
  badge?: string | number
  children?: SidebarChildItem[]
}

export interface SidebarProps {
  items: SidebarItem[]
  logo?: React.ReactNode
  collapsedLogo?: React.ReactNode
  footer?: React.ReactNode
  defaultCollapsed?: boolean
  storageKey?: string
  activeHref?: string
  onNavigate?: (href: string) => void
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function readStorage(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback
  try {
    const stored = localStorage.getItem(key)
    return stored !== null ? stored === "true" : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, String(value))
  } catch {}
}

// ─── Componente ───────────────────────────────────────────────────────────────
function Sidebar({
  items,
  logo,
  collapsedLogo,
  footer,
  defaultCollapsed = false,
  storageKey = "nuvo-ui-sidebar",
  activeHref,
  onNavigate,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(() =>
    readStorage(storageKey, defaultCollapsed)
  )
  const [openGroups, setOpenGroups] = React.useState<Set<string>>(new Set())

  function toggleCollapsed() {
    const next = !collapsed
    setCollapsed(next)
    writeStorage(storageKey, next)
  }

  function toggleGroup(href: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      next.has(href) ? next.delete(href) : next.add(href)
      return next
    })
  }

  function handleNavigate(href: string, e: React.MouseEvent<HTMLAnchorElement>) {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(href)
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className={cn(
        "flex h-full flex-col border-r border-border bg-background transition-[width] duration-200 ease-in-out",
        collapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
    >
      {/* Logo */}
      {(logo || collapsedLogo) && (
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b border-border",
            collapsed ? "justify-center px-0" : "px-4"
          )}
        >
          {collapsed ? (collapsedLogo ?? logo) : logo}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={toggleCollapsed}
        className={cn(
          "mx-auto my-2 flex h-7 w-7 items-center justify-center rounded-md",
          "text-muted-foreground hover:bg-muted hover:text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          "transition-colors"
        )}
        aria-label={collapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
      >
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
          style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Items */}
      <ul role="list" className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
        {items.map((item) => {
          const isActive = activeHref === item.href
          const hasChildren = !!item.children?.length
          const isOpen = openGroups.has(item.href)
          const Icon = item.icon

          if (hasChildren && !collapsed) {
            return (
              <li key={item.href}>
                <Collapsible.Root open={isOpen} onOpenChange={() => toggleGroup(item.href)}>
                  <Collapsible.Trigger
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      "hover:bg-muted hover:text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring",
                      "transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                    <span className="flex-1 truncate text-left">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{
                        transform: isOpen ? "rotate(90deg)" : "none",
                        transition: "transform 0.15s",
                        flexShrink: 0,
                      }}
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Collapsible.Trigger>

                  <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <ul role="list" className="mt-0.5 ml-7 space-y-0.5 border-l border-border pl-3 py-1">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon
                        const childActive = activeHref === child.href
                        return (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              onClick={(e) => handleNavigate(child.href, e)}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                                "hover:bg-muted hover:text-foreground",
                                "focus:outline-none focus:ring-2 focus:ring-ring",
                                "transition-colors",
                                childActive
                                  ? "text-primary font-medium"
                                  : "text-muted-foreground"
                              )}
                              aria-current={childActive ? "page" : undefined}
                            >
                              {ChildIcon && (
                                <ChildIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              )}
                              <span className="truncate">{child.label}</span>
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </Collapsible.Content>
                </Collapsible.Root>
              </li>
            )
          }

          return (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavigate(item.href, e)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md py-2 text-sm font-medium",
                  "hover:bg-muted hover:text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring",
                  "transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground",
                  collapsed ? "justify-center px-2" : "px-3"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && item.badge !== undefined && (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          )
        })}
      </ul>

      {/* Footer */}
      {footer && !collapsed && (
        <div className="shrink-0 border-t border-border p-3">{footer}</div>
      )}
    </nav>
  )
}
Sidebar.displayName = "Sidebar"

export { Sidebar }
