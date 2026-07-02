import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "./theme"
import { DocsShell } from "./docs-shell"

export const metadata: Metadata = {
  title: "nuvo-ui — Documentación",
  description: "Componentes UI para dashboards. JSON-first, accesible, TypeScript.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ThemeProvider>
          <DocsShell>{children}</DocsShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
