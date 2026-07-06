"use client"

import { ThemeProvider, ThemeSwitcher, useTheme } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider, DocNote } from "../doc-ui"

function ThemeDemo() {
  const { theme, resolved } = useTheme()
  return (
    <div className="space-y-4">
      <ThemeSwitcher />
      <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
        <p className="text-foreground">Tema seleccionado: <span className="font-semibold text-primary">{theme}</span></p>
        <p className="text-muted-foreground">Resuelto como: <span className="font-medium text-foreground">{resolved}</span></p>
      </div>
    </div>
  )
}

export default function ThemeProviderPage() {
  return (
    <ThemeProvider>
      <div className="space-y-10">
        <div>
          <DocTitle>ThemeProvider</DocTitle>
          <DocSubtitle>
            Proveedor de tema con soporte dark/light/system, persistencia en localStorage, ThemeSwitcher incluido
            y un efecto de ola al cambiar de tema.
          </DocSubtitle>
        </div>

        <DocInstall component="theme-provider" />
        <DocDivider />

        <DocSection
          title="ThemeSwitcher (demo)"
          description="Al hacer click, una ola circular se expande desde el botón y cubre la pantalla con el nuevo tema."
        >
          <ThemeDemo />
          <DocNote>
            La ola usa la View Transitions API nativa del navegador (Chrome, Edge). En navegadores sin soporte,
            o con <code>prefers-reduced-motion</code> activado, el cambio de tema es instantáneo — nunca se
            bloquea el toggle.
          </DocNote>
        </DocSection>

        <DocSection title="Setup en layout.tsx">
          <Code code={`// app/layout.tsx
import { ThemeProvider } from "@nuvo-ui/ui"

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`} />
        </DocSection>

        <DocSection title="Uso del hook useTheme">
          <Code code={`"use client"
import { useTheme } from "@nuvo-ui/ui"

function MyHeader() {
  const { theme, resolved, setTheme } = useTheme()

  return (
    // El segundo argumento es opcional: sin él, la ola nace en el centro de la pantalla.
    <button onClick={(e) => setTheme(resolved === "dark" ? "light" : "dark", { x: e.clientX, y: e.clientY })}>
      Modo actual: {resolved}
    </button>
  )
}`} />
        </DocSection>

        <DocSection title="ThemeSwitcher standalone">
          <Code code={`import { ThemeSwitcher } from "@nuvo-ui/ui"

// Muestra botones Dark / Light / System
<ThemeSwitcher />

// Requiere ThemeProvider en un ancestro
`} />
        </DocSection>

        <DocDivider />

        <DocSection title="Props — ThemeProvider">
          <PropsTable props={[
            { name: "defaultTheme", type: '"dark" | "light" | "system"', default: '"dark"',          description: "Tema inicial cuando no hay nada en localStorage" },
            { name: "storageKey",   type: "string",                       default: '"nuvo-ui-mode"',  description: "Clave de localStorage" },
            { name: "children",     type: "ReactNode",                    default: "—",               description: "Árbol de componentes" },
          ]} />
        </DocSection>

        <DocSection title="Retorno de useTheme">
          <PropsTable props={[
            { name: "theme",    type: '"dark" | "light" | "system"', default: "—", description: "Tema seleccionado por el usuario" },
            { name: "resolved", type: '"dark" | "light"',             default: "—", description: "Tema real aplicado (system se resuelve aquí)" },
            { name: "setTheme", type: "(theme: Theme, origin?: { x: number; y: number }) => void", default: "—", description: "Cambia el tema, persiste en localStorage y dispara la ola desde origin (o el centro si se omite)" },
          ]} />
        </DocSection>
      </div>
    </ThemeProvider>
  )
}
