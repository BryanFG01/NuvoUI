"use client"

import * as React from "react"
import {
  FloatingActions,
  type FloatingAction,
} from "@nuvo-ui/ui"
import {
  DocTitle,
  DocSubtitle,
  DocInstall,
  DocSection,
  Preview,
  Code,
  PropsTable,
  DocDivider,
  DocNote,
} from "../doc-ui"

// ─── Iconos inline para el demo ────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

// ─── Demo interactivo ──────────────────────────────────────────────────────────

function DemoActions() {
  const [log, setLog] = React.useState<string[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)

  const actions: FloatingAction[] = [
    {
      key: "edit",
      label: "Editar",
      icon: <EditIcon />,
      variant: "info",
      onClick: () => setLog((prev) => [`Editar — ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 4)),
    },
    {
      key: "export",
      label: "Exportar",
      icon: <DownloadIcon />,
      variant: "success",
      onClick: () => setLog((prev) => [`Exportar — ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 4)),
    },
    {
      key: "share",
      label: "Compartir",
      icon: <ShareIcon />,
      variant: "warning",
      onClick: () => setLog((prev) => [`Compartir — ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 4)),
    },
    {
      key: "delete",
      label: "Eliminar",
      icon: <TrashIcon />,
      variant: "danger",
      onClick: () => setLog((prev) => [`Eliminar — ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 4)),
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-[260px] overflow-hidden">
      <div className="space-y-2 pr-16">
        {log.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Clic en el botón inferior derecho para ver las acciones. Puedes arrastrarlo.
          </p>
        ) : (
          log.map((entry, i) => (
            <div key={i} className="rounded-md border border-border bg-muted/30 px-3 py-2 text-xs text-foreground font-mono">
              ✓ {entry}
            </div>
          ))
        )}
      </div>
      <FloatingActions
        actions={actions}
        contained
        containerRef={containerRef as React.RefObject<HTMLElement>}
      />
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function FloatingActionsPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>FloatingActions</DocTitle>
        <DocSubtitle>
          Botón flotante y arrastrable que despliega N acciones configuradas por JSON.
          Cada acción puede abrir un modal, ejecutar una función o disparar cualquier lógica.
        </DocSubtitle>
      </div>

      <DocInstall component="floating-actions" />

      <DocSection title="Demo">
        <Preview>
          <DemoActions />
        </Preview>
        <DocNote>
          El botón es arrastrable. Haz click y mantenlo presionado para moverlo a cualquier
          posición de la pantalla. Suelta sin arrastrar para abrir/cerrar el menú.
        </DocNote>
      </DocSection>

      <DocDivider />

      <DocSection
        title="FloatingActions — grupo"
        description="Configura N acciones via un array de objetos. Ideal para pantallas de detalle o CRUD."
      >
        <Code
          code={`import { FloatingActions, type FloatingAction } from "@/components/ui/floating-actions"
import { Pencil, Trash2, Download } from "lucide-react"

const actions: FloatingAction[] = [
  {
    key:     "edit",
    label:   "Editar",
    icon:    <Pencil size={16} />,
    variant: "info",
    onClick: () => setEditOpen(true),      // abre tu modal
  },
  {
    key:     "export",
    label:   "Exportar CSV",
    icon:    <Download size={16} />,
    variant: "success",
    onClick: () => handleExport(),
  },
  {
    key:      "delete",
    label:    "Eliminar",
    icon:     <Trash2 size={16} />,
    variant:  "danger",
    onClick:  () => setDeleteOpen(true),
    disabled: !canDelete,               // deshabilitar condicionalmente
  },
]

export default function Page() {
  return (
    <>
      {/* tu contenido */}
      <FloatingActions actions={actions} />
    </>
  )
}`}
        />
      </DocSection>

      <DocSection
        title="FloatingButton — acción única"
        description="Cuando solo necesitas un botón flotante sin menú desplegable."
      >
        <Code
          code={`import { FloatingButton } from "@/components/ui/floating-actions"
import { Plus } from "lucide-react"

<FloatingButton
  label="Nuevo registro"
  icon={<Plus size={16} />}
  variant="success"
  onClick={() => setCreateOpen(true)}
/>`}
        />
      </DocSection>

      <DocSection
        title="Icono y color del botón principal"
        description="Personaliza el icono y la variante del botón toggle de FloatingActions."
      >
        <Code
          code={`// Icono personalizado + variante en el botón principal
import { Settings } from "lucide-react"

<FloatingActions
  actions={actions}
  icon={<Settings size={18} />}
  variant="warning"
/>`}
        />
        <DocNote>
          El icono solo aplica al estado cerrado. Cuando el menú está abierto siempre
          muestra una X para cerrar.
        </DocNote>
      </DocSection>

      <DocDivider />

      <DocSection title="Props — FloatingActions">
        <PropsTable
          props={[
            {
              name: "actions",
              type: "FloatingAction[]",
              description: "Array de acciones configuradas como JSON. Ver tabla FloatingAction abajo.",
            },
            {
              name: "variant",
              type: '"default" | "success" | "warning" | "info" | "danger"',
              default: '"default"',
              description: "Color del botón principal de toggle.",
            },
            {
              name: "icon",
              type: "ReactNode",
              description: "Icono del botón principal en estado cerrado. Por defecto: grid 2x2.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Props — FloatingButton">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Texto visible del botón y su tooltip.",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Función ejecutada al hacer clic (no al arrastrar).",
            },
            {
              name: "icon",
              type: "ReactNode",
              description: "Icono a la izquierda del texto. Por defecto: +",
            },
            {
              name: "variant",
              type: '"default" | "success" | "warning" | "info" | "danger"',
              default: '"default"',
              description: "Color de fondo del botón.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Deshabilita el botón.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Tipo FloatingAction">
        <PropsTable
          props={[
            {
              name: "key",
              type: "string",
              description: "Identificador único de la acción (usado como React key).",
            },
            {
              name: "label",
              type: "string",
              description: "Texto de la etiqueta flotante y del tooltip.",
            },
            {
              name: "icon",
              type: "ReactNode",
              description: "Icono del botón individual. Por defecto: +",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Función ejecutada al seleccionar la acción.",
            },
            {
              name: "variant",
              type: '"default" | "success" | "warning" | "info" | "danger"',
              default: '"default"',
              description: "Color del botón y de la etiqueta de esa acción.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Deshabilita la acción individual.",
            },
          ]}
        />
      </DocSection>
    </div>
  )
}
