"use client"

import { Button, ThemeSwitcher } from "@nuvo-ui/ui"
import { Section } from "../types"
import { NAV_CONFIG } from "../data"
import { IconPlus } from "../icons"

interface TopHeaderProps {
  section: Section
  onNewUser: () => void
}

export function TopHeader({ section, onNewUser }: TopHeaderProps) {
  const label = NAV_CONFIG.find(n => n.id === section)?.label ?? ""

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="hidden text-muted-foreground/40 sm:inline">/</span>
        <span className="hidden text-xs text-muted-foreground sm:inline">NuvoUI Demo</span>
      </div>
      <div className="flex items-center gap-2">
        {section === "usuarios" && (
          <Button size="sm" onClick={onNewUser}>
            <span className="mr-1.5"><IconPlus /></span>
            Nuevo
          </Button>
        )}
        <ThemeSwitcher />
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          A
        </div>
      </div>
    </header>
  )
}
