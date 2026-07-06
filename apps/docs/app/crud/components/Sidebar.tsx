"use client"

import * as React from "react"
import { Badge, cn } from "@nuvo-ui/ui"
import { Section } from "../types"
import { NAV_CONFIG } from "../data"
import {
  IconGrid, IconUsers, IconChart, IconShield,
  IconBack, IconChevronLeft, IconChevronRight,
} from "../icons"

const ICON_MAP: Record<Section, React.ReactNode> = {
  dashboard:  <IconGrid />,
  usuarios:   <IconUsers />,
  analiticas: <IconChart />,
  roles:      <IconShield />,
}

interface SidebarProps {
  section: Section
  onNavigate: (s: Section) => void
  userCount: number
  collapsed: boolean
  onToggleCollapsed: () => void
}

export function Sidebar({ section, onNavigate, userCount, collapsed, onToggleCollapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden md:flex shrink-0 flex-col border-r border-border bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-14" : "w-56"
      )}
    >
      {/* Brand */}
      <div className="flex h-14 items-center justify-between border-b border-border px-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-sm font-bold leading-none text-foreground">NuvoUI</p>
              <p className="text-[10px] text-muted-foreground">Dashboard</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapsed}
          title={collapsed ? "Expandir menú" : "Colapsar menú"}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {!collapsed && (
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            General
          </p>
        )}
        {NAV_CONFIG.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            title={collapsed ? label : undefined}
            className={cn(
              "relative flex w-full items-center rounded-md text-sm transition-colors",
              collapsed ? "justify-center px-0 py-2.5" : "gap-2.5 px-3 py-2",
              section === id
                ? "bg-primary/10 font-semibold text-primary"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            {section === id && !collapsed && (
              <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-r-full bg-primary" />
            )}
            <span className="shrink-0">{ICON_MAP[id]}</span>
            {!collapsed && (
              <>
                {label}
                {id === "usuarios" && (
                  <Badge variant="muted" size="sm" className="ml-auto">{userCount}</Badge>
                )}
              </>
            )}
            {collapsed && id === "usuarios" && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                {userCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-3 py-3">
        {collapsed ? (
          <a
            href="/"
            title="Volver a la docs"
            className="flex justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconBack />
          </a>
        ) : (
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconBack /> Volver a la docs
          </a>
        )}
      </div>
    </aside>
  )
}
