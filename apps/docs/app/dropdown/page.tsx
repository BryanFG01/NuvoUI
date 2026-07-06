"use client"

import { DropdownMenu, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator, DropdownLabel, Button } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

function EditIcon()   { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg> }
function CopyIcon()   { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> }
function TrashIcon()  { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg> }
function ShareIcon()  { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> }

export default function DropdownPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Dropdown</DocTitle>
        <DocSubtitle>Menú contextual accesible con items, separadores, labels y atajos de teclado.</DocSubtitle>
      </div>

      <DocInstall component="dropdown" />
      <DocDivider />

      <DocSection title="Básico">
        <DropdownMenu>
          <DropdownTrigger>
            <Button variant="outline">Acciones ▾</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownLabel>Documento</DropdownLabel>
            <DropdownItem icon={<EditIcon />}  shortcut="⌘E">Editar</DropdownItem>
            <DropdownItem icon={<CopyIcon />}  shortcut="⌘D">Duplicar</DropdownItem>
            <DropdownItem icon={<ShareIcon />}>Compartir</DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={<TrashIcon />} destructive shortcut="⌫">Eliminar</DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </DocSection>

      <DocSection title="Posición izquierda">
        <DropdownMenu>
          <DropdownTrigger>
            <Button variant="ghost" size="sm">···</Button>
          </DropdownTrigger>
          <DropdownContent align="end">
            <DropdownItem>Ver detalles</DropdownItem>
            <DropdownItem>Exportar PDF</DropdownItem>
            <DropdownSeparator />
            <DropdownItem destructive>Archivar</DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import {
  DropdownMenu, DropdownTrigger, DropdownContent,
  DropdownItem, DropdownSeparator, DropdownLabel
} from "@nuvo-ui/ui"

<DropdownMenu>
  <DropdownTrigger>
    <Button>Acciones</Button>
  </DropdownTrigger>
  <DropdownContent align="start">
    <DropdownLabel>Sección</DropdownLabel>
    <DropdownItem icon={<EditIcon />} shortcut="⌘E" onClick={edit}>
      Editar
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem destructive onClick={remove}>Eliminar</DropdownItem>
  </DropdownContent>
</DropdownMenu>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props — DropdownContent">
        <PropsTable props={[
          { name: "align",      type: '"start" | "center" | "end"',           default: '"start"',   description: "Alineación respecto al trigger" },
          { name: "side",       type: '"top" | "right" | "bottom" | "left"',  default: '"bottom"',  description: "Lado donde se abre el menú" },
          { name: "sideOffset", type: "number",                                default: "4",          description: "Desplazamiento desde el trigger" },
        ]} />
      </DocSection>

      <DocSection title="Props — DropdownItem">
        <PropsTable props={[
          { name: "icon",        type: "ReactNode",   default: "—",     description: "Ícono a la izquierda" },
          { name: "shortcut",    type: "string",      default: "—",     description: "Atajo de teclado mostrado a la derecha" },
          { name: "destructive", type: "boolean",     default: "false", description: "Estilo rojo para acciones peligrosas" },
          { name: "disabled",    type: "boolean",     default: "false", description: "Deshabilita el item" },
          { name: "onClick",     type: "() => void",  default: "—",     description: "Acción al seleccionar" },
        ]} />
      </DocSection>
    </div>
  )
}
