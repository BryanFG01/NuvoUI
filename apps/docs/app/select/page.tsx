"use client"

import * as React from "react"
import { MultiSelect, Select } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function SelectPage() {
  const [pais, setPais] = React.useState("")
  const [roles, setRoles] = React.useState<string[]>([])

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Select</DocTitle>
        <DocSubtitle>Selector de opciones con grupos, búsqueda y validación.</DocSubtitle>
      </div>

      <DocInstall component="select" />
      <DocDivider />

      <DocSection title="Básico">
        <div className="max-w-xs">
          <Select
            label="Rol"
            placeholder="Seleccionar rol..."
            options={[
              { value: "admin",  label: "Administrador" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Visor", disabled: true },
            ]}
          />
        </div>
      </DocSection>

      <DocSection title="Con grupos">
        <div className="max-w-xs">
          <Select
            label="País"
            placeholder="Seleccionar país..."
            value={pais}
            onValueChange={setPais}
            groups={[
              {
                label: "América",
                options: [
                  { value: "mx", label: "México" },
                  { value: "co", label: "Colombia" },
                  { value: "ar", label: "Argentina" },
                ],
              },
              {
                label: "Europa",
                options: [
                  { value: "es", label: "España" },
                  { value: "fr", label: "Francia" },
                ],
              },
            ]}
            helperText="País de facturación."
          />
          {pais && <p className="mt-1 text-xs text-muted-foreground">Seleccionado: {pais}</p>}
        </div>
      </DocSection>

      <DocSection title="Con error">
        <div className="max-w-xs">
          <Select
            label="Estado"
            placeholder="Seleccionar..."
            errorMessage="Este campo es obligatorio."
            options={[
              { value: "activo",   label: "Activo" },
              { value: "inactivo", label: "Inactivo" },
            ]}
          />
        </div>
      </DocSection>

      <DocSection title="Multiselect con checkbox">
        <div className="max-w-xs">
          <MultiSelect
            label="Roles"
            placeholder="Seleccionar roles..."
            value={roles}
            onValueChange={setRoles}
            selectAllLabel="Seleccionar todo"
            helperText="Marca uno o varios roles."
            options={[
              { value: "admin",  label: "Administrador" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Visor", disabled: true },
            ]}
          />
          {roles.length > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">Seleccionado: {roles.join(", ")}</p>
          )}
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { MultiSelect, Select } from "@nuvo-ui/ui"

<Select
  label="País"
  value={country}
  onValueChange={setCountry}
  groups={[
    { label: "América", options: [{ value: "mx", label: "México" }] },
    { label: "Europa",  options: [{ value: "es", label: "España"  }] },
  ]}
/>

<MultiSelect
  label="Roles"
  value={roles}
  onValueChange={setRoles}
  selectAllLabel="Seleccionar todo"
  options={[
    { value: "admin",  label: "Administrador" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Visor", disabled: true },
  ]}
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <p className="mb-2 text-sm font-semibold text-foreground">Select</p>
        <PropsTable props={[
          { name: "options",       type: "SelectOption[]",      default: "[]",  description: "Opciones planas: { value, label, disabled? }" },
          { name: "groups",        type: "SelectGroup[]",        default: "[]",  description: "Grupos con label: { label?, options[] }" },
          { name: "value",         type: "string",              default: "—",   description: "Valor controlado" },
          { name: "defaultValue",  type: "string",              default: "—",   description: "Valor inicial" },
          { name: "onValueChange", type: "(v: string) => void", default: "—",   description: "Callback al cambiar" },
          { name: "placeholder",   type: "string",              default: '"Seleccionar..."', description: "Texto cuando no hay selección" },
          { name: "errorMessage",  type: "string",              default: "—",   description: "Mensaje de error" },
          { name: "helperText",    type: "string",              default: "—",   description: "Texto de ayuda" },
          { name: "disabled",      type: "boolean",             default: "false", description: "Deshabilita el select" },
        ]} />

        <p className="mb-2 mt-6 text-sm font-semibold text-foreground">MultiSelect</p>
        <PropsTable props={[
          { name: "options",        type: "SelectOption[]",      default: "[]",  description: "Opciones con checkbox" },
          { name: "value",          type: "string[]",            default: "[]",   description: "Valores seleccionados" },
          { name: "defaultValue",   type: "string[]",            default: "[]",   description: "Valores iniciales" },
          { name: "onValueChange",  type: "(v: string[]) => void", default: "—",   description: "Callback al cambiar selección" },
          { name: "selectAllLabel", type: "string",              default: '"Seleccionar todo"', description: "Texto del control de seleccionar todo" },
          { name: "placeholder",    type: "string",              default: '"Seleccionar..."', description: "Texto cuando no hay selección" },
          { name: "errorMessage",   type: "string",              default: "—",   description: "Mensaje de error" },
          { name: "helperText",     type: "string",              default: "—",   description: "Texto de ayuda" },
          { name: "disabled",       type: "boolean",             default: "false", description: "Deshabilita el multiselect" },
        ]} />
      </DocSection>
    </div>
  )
}
