import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider as ModeProvider } from "@nuvo-ui/ui"
import { ThemeProvider as AccentProvider } from "./theme"
import { DocsShell } from "./docs-shell"

export const metadata: Metadata = {
  title: "nuvo-ui — Documentación",
  description: "Componentes UI para dashboards. JSON-first, accesible, TypeScript.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        {/* ModeProvider: light/dark/system (@nuvo-ui/ui, con efecto de ola) */}
        {/* AccentProvider: color de acento del sitio de docs (blue/purple/...) */}
        <ModeProvider storageKey="nuvo-ui-mode">
          <AccentProvider>
            <DocsShell>{children}</DocsShell>
          </AccentProvider>
        </ModeProvider>
      </body>
    </html>
  )
}
