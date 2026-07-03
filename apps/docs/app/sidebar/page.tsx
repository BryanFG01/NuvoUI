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
          Navegación lateral colapsable. Se desliza fuera de pantalla con animación suave y
          una pestaña que permite re-expandirlo. API JSON: lista plana de items o agrupada
          por secciones. Submenús con Radix Collapsible. Estado persistido en localStorage.
        </DocSubtitle>
      </div>

      <DocInstall component="sidebar" />
      <DocDivider />

      <DocSection title="Demo interactivo" description="Clic en «Usuarios» para el submenú. El chevron izquierdo colapsa el sidebar — desliza fuera de pantalla con una pestaña › para re-expandir.">
        <Preview className="p-0 overflow-hidden">
          <div className="flex h-80">
            <Sidebar
              items={NAV_ITEMS}
              activeHref={active}
              onNavigate={setActive}
              storageKey="docs-sidebar-demo"
              logo={
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">L</span>
                  <span className="font-semibold text-foreground text-sm">Mi App</span>
                </div>
              }
              footer={
                <p className="text-[10px] text-muted-foreground/60">MIT · v1.0.0</p>
              }
            />
            <div className="flex flex-1 items-center justify-center bg-muted/30 text-sm text-muted-foreground">
              Ruta activa: <strong className="ml-1 text-foreground">{active}</strong>
            </div>
          </div>
        </Preview>
        <Code code={`import { Sidebar } from "@/components/ui/sidebar"

// Flat list
const items = [
  { label: "Dashboard",  href: "/",      icon: HomeIcon },
  { label: "Analíticas", href: "/stats", icon: ChartIcon },
  {
    label: "Usuarios",
    href: "/users",
    icon: UsersIcon,
    badge: 3,               // badge en rojo
    children: [             // submenú colapsable
      { label: "Todos",        href: "/users" },
      { label: "Invitaciones", href: "/users/invites" },
    ],
  },
]

// O agrupado por secciones
const sections = [
  { section: "Principal", items: [{ label: "Dashboard", href: "/" }] },
  { section: "Gestión",   items: [{ label: "Usuarios",  href: "/users" }] },
]

// En Next.js:
const pathname = usePathname()
const router   = useRouter()

<Sidebar
  items={items}              // o sections={sections}
  activeHref={pathname}
  onNavigate={(href) => router.push(href)}
  logo={<MyLogo />}
  footer={<p>v1.0</p>}
  storageKey="mi-app-sidebar"
/>`} />
        <DocNote>
          El estado de colapso se persiste en <code>localStorage</code> con la clave
          que pases en <code>storageKey</code>. Cada instancia puede tener su propia clave.
        </DocNote>
      </DocSection>

      <DocDivider />

      <DocSection title="Props — Sidebar">
        <PropsTable
          props={[
            { name: "items",            type: "SidebarItem[]",          default: "—",     description: "Lista plana de items de navegación" },
            { name: "sections",         type: "SidebarSection[]",       default: "—",     description: "Items agrupados por sección con encabezado. Alternativo a items." },
            { name: "activeHref",       type: "string",                 default: "—",     description: "Href activo — resalta el item correspondiente con barra lateral" },
            { name: "onNavigate",       type: "(href: string) => void", default: "—",     description: "Callback al hacer clic en un item (previene navegación nativa)" },
            { name: "logo",             type: "ReactNode",              default: "—",     description: "Área del logo en el header del sidebar" },
            { name: "footer",           type: "ReactNode",              default: "—",     description: "Contenido del pie, visible solo cuando está expandido" },
            { name: "defaultCollapsed", type: "boolean",                default: "false", description: "Estado inicial de colapso" },
            { name: "storageKey",       type: "string",                 default: '"nuvo-ui-sidebar"', description: "Clave de localStorage — cada instancia puede tener la suya" },
            { name: "width",            type: "number",                 default: "240",   description: "Ancho en px del sidebar cuando está expandido" },
            { name: "className",        type: "string",                 default: "—",     description: "Clases extra en el contenedor raíz" },
          ]}
        />
      </DocSection>

      <DocSection title="Tipo SidebarItem">
        <PropsTable
          props={[
            { name: "label",    type: "string",           description: "Texto del item" },
            { name: "href",     type: "string",           description: "URL de destino" },
            { name: "icon",     type: "ElementType",      default: "—", description: "Ícono como componente React (recibe className)" },
            { name: "badge",    type: "string | number",  default: "—", description: "Contador en badge primario" },
            { name: "children", type: "SidebarChildItem[]", default: "—", description: "Sub-items del menú colapsable (Radix Collapsible)" },
          ]}
        />
      </DocSection>
    </div>
  )
}
