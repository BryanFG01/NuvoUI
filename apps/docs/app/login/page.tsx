"use client"

import * as React from "react"
import { Login } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false)
  const [error,   setError]   = React.useState<string | undefined>()

  async function handleSubmit({ email, password }: { email: string; password: string }) {
    setError(undefined)
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    if (password.length < 6) {
      setError("Contraseña incorrecta. Inténtalo de nuevo.")
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Login</DocTitle>
        <DocSubtitle>
          Pantalla de inicio de sesión con glassmorphism — borde degradado, backdrop blur y validación
          custom con burbujas. Sin fondo propio: el padre controla el contexto visual.
        </DocSubtitle>
      </div>

      <DocInstall component="login" />
      <DocDivider />

      <DocSection title="Preview">
        <div className="overflow-hidden rounded-xl border border-border" style={{ height: 560 }}>
          <Login
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Prueba: deja un campo vacío para ver la burbuja de validación. Ingresa contraseña menor a 6 caracteres para ver el error del servidor.
        </p>
      </DocSection>

      <DocSection title="Uso en página completa">
        <Code code={`// page.tsx — envuelve en h-screen para ocupar toda la pantalla
import { Login } from "@nuvo-ui/ui"

export default function LoginPage() {
  return (
    <div className="h-screen">
      <Login
        onSubmit={async ({ email, password }) => {
          await signIn(email, password)
        }}
      />
    </div>
  )
}`} />
      </DocSection>

      <DocSection title="Con estado de error">
        <Code code={`const [error, setError] = useState<string | undefined>()

<Login
  error={error}
  onSubmit={async ({ email, password }) => {
    try {
      await signIn(email, password)
    } catch {
      setError("Credenciales incorrectas. Inténtalo de nuevo.")
    }
  }}
/>`} />
      </DocSection>

      <DocSection title="Con estado de carga">
        <Code code={`const [loading, setLoading] = useState(false)

<Login
  loading={loading}
  onSubmit={async (values) => {
    setLoading(true)
    await signIn(values.email, values.password)
    setLoading(false)
  }}
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "onSubmit",  type: "(values: { email: string; password: string }) => void | Promise<void>", description: "Callback al enviar el formulario" },
            { name: "loading",   type: "boolean",          default: "false", description: "Muestra spinner y deshabilita el formulario" },
            { name: "error",     type: "string",           default: "—",     description: "Mensaje de error visible sobre el formulario" },
            { name: "title",     type: "string",           default: '"Bienvenido de nuevo"',      description: "Título de la tarjeta" },
            { name: "subtitle",  type: "string",           default: '"Ingresa tus credenciales…"', description: "Subtítulo descriptivo" },
            { name: "logo",      type: "ReactNode",        default: "—",     description: "Nodo opcional mostrado encima del título" },
            { name: "className", type: "string",           default: "—",     description: "Clases extra en el contenedor raíz" },
          ]}
        />
      </DocSection>
    </div>
  )
}
