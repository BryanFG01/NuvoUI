"use client"

import * as React from "react"
import { Input } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider } from "../doc-ui"

export default function InputPage() {
  const [value, setValue] = React.useState("")
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Input</DocTitle>
        <DocSubtitle>
          Campo de texto con label integrado, texto de ayuda y mensajes de error/éxito.
          forwardRef compatible. Extiende todos los atributos nativos de input.
        </DocSubtitle>
      </div>

      <DocInstall component="input" />
      <DocDivider />

      <DocSection title="Variantes">
        <Preview className="max-w-sm space-y-4">
          <Input label="Email" type="email" placeholder="tu@empresa.com"
            helperText="Nunca compartiremos tu email." />
          <Input label="Contraseña correcta" type="password" value="12345678"
            variant="success" helperText="Contraseña segura" onChange={() => {}} />
          <Input label="Campo requerido" placeholder="Escribe algo..."
            variant="error" errorMessage="Este campo es obligatorio." />
        </Preview>
        <Code code={`// Default con texto de ayuda
<Input
  label="Email"
  type="email"
  placeholder="tu@empresa.com"
  helperText="Nunca compartiremos tu email."
/>

// Éxito
<Input label="Email" variant="success" helperText="Email verificado" />

// Error
<Input
  label="Email"
  variant="error"
  errorMessage="El email no es válido."
/>`} />
      </DocSection>

      <DocSection title="Controlado">
        <Preview className="max-w-sm">
          <Input
            label="Buscar usuario"
            placeholder="Nombre o email..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            helperText={value ? `Buscando: "${value}"` : "Escribe para buscar"}
          />
        </Preview>
        <Code code={`const [value, setValue] = React.useState("")

<Input
  label="Buscar"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  helperText={value ? \`Buscando: "\${value}"\` : "Escribe para buscar"}
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "label",        type: "string",                             default: "—",        description: "Etiqueta del campo" },
            { name: "helperText",   type: "string",                             default: "—",        description: "Texto descriptivo bajo el input" },
            { name: "errorMessage", type: "string",                             default: "—",        description: "Error (sobreescribe helperText y fuerza variant=error)" },
            { name: "variant",      type: '"default" | "error" | "success"',    default: '"default"',description: "Estado visual del campo" },
            { name: "...",          type: "InputHTMLAttributes",                description: "Todos los atributos nativos de <input>" },
          ]}
        />
      </DocSection>
    </div>
  )
}
