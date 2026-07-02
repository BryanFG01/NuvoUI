"use client"

import * as React from "react"
import { Sidebar, Badge } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider, DocNote } from "../doc-ui"

// ─── Íconos inline (no requieren librería extra) ──────────────────────────────
const HomeIcon  = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>

const NAV_ITEMS = [
  { label: "Dashboard",   href: "/",         icon: HomeIcon },
  { label: "Analíticas",  href: "/analytics", icon: ChartIcon },
  {
    label: "Usuarios",
    href: "/users",
    icon: UsersIcon,
    badge: 3,
    children: [
      { label: "Todos",         href: "/users" },
      { label: "Invitaciones",  href: "/users/invites" },
      { label: "Roles",         href: "/users/roles" },
    ],
  },
  { label: "Configuración", href: "/settings", icon: SettingsIcon },
]

export default function SidebarPage() {
  const [active, setActive] = React.useState("/")

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Sidebar</DocTitle>
        <DocSubtitle>
          Navegación lateral colapsable. API 100% JSON — pasa un array de items.
          Submenús con Radix Collapsible. Estado de colapso persistido en localStorage.
        </DocSubtitle>
      </div>

      <DocInstall component="sidebar" />
      <DocDivider />

      <DocSection title="Demo interactivo" description="Haz click en 'Usuarios' para ver el submenú. La flecha izquierda colapsa el sidebar.">
        <Preview className="p-0 overflow-hidden">
          <div className="flex h-80">
            <Sidebar
              items={NAV_ITEMS}
              activeHref={active}
              onNavigate={setActive}
              storageKey="docs-sidebar-demo"
              logo={
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">L</span>
                  <span className="font-semibold text-foreground text-sm">Mi App</span>
                </div>
              }
            />
            <div className="flex flex-1 items-center justify-center bg-muted/30 text-sm text-muted-foreground">
              Ruta activa: <strong className="ml-1 text-foreground">{active}</strong>
            </div>
          </div>
        </Preview>
        <Code code={`import { Sidebar } from "@/components/ui/sidebar"

const items = [
  { label: "Dashboard",  href: "/",      icon: HomeIcon },
  { label: "Analíticas", href: "/stats", icon: ChartIcon },
  {
    label: "Usuarios",
    href: "/users",
    icon: UsersIcon,
    badge: 3,               // número en badge rojo
    children: [             // submenú colapsable
      { label: "Todos",        href: "/users" },
      { label: "Invitaciones", href: "/users/invites" },
    ],
  },
]

// En Next.js:
const pathname = usePathname()
const router   = useRouter()

<Sidebar
  items={items}
  activeHref={pathname}
  onNavigate={(href) => router.push(href)}
  logo={<MyLogo />}
  storageKey="mi-app-sidebar"   // clave de localStorage
/>`} />
        <DocNote>
          El estado de colapso se persiste en <code>localStorage</code> con la clave
          que pases en <code>storageKey</code>. Cada instancia puede tener su propia clave.
        </DocNote>
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "items",            type: "SidebarItem[]",            description: "Array de items de navegación" },
            { name: "activeHref",       type: "string",     default: "—", description: "Href activo (resalta el item correspondiente)" },
            { name: "onNavigate",       type: "(href: string) => void", default: "—", description: "Callback al hacer click en un item" },
            { name: "logo",             type: "ReactNode",  default: "—", description: "Contenido del logo (modo expandido)" },
            { name: "collapsedLogo",    type: "ReactNode",  default: "—", description: "Logo alternativo cuando el sidebar está colapsado" },
            { name: "footer",           type: "ReactNode",  default: "—", description: "Contenido del pie (solo visible en modo expandido)" },
            { name: "defaultCollapsed", type: "boolean",    default: "false", description: "Estado inicial de colapso" },
            { name: "storageKey",       type: "string",     default: '"nuvo-ui-sidebar"', description: "Clave de localStorage para persistir el estado" },
          ]}
        />
        <PropsTable
          props={[
            { name: "label",    type: "string",      description: "Texto del item" },
            { name: "href",     type: "string",      description: "URL de destino" },
            { name: "icon",     type: "ElementType", default: "—", description: "Ícono SVG como componente React" },
            { name: "badge",    type: "string | number", default: "—", description: "Contador en badge primario" },
            { name: "children", type: "SidebarChildItem[]", default: "—", description: "Sub-items del menú colapsable" },
          ]}
        />
      </DocSection>
    </div>
  )
}
