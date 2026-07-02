"use client"

import * as React from "react"
import { Modal, Button, Input, Badge } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider, DocNote } from "../doc-ui"

export default function ModalPage() {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [formOpen, setFormOpen] = React.useState(false)

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Modal</DocTitle>
        <DocSubtitle>
          Modal accesible basado en Radix Dialog. Cierra con Escape y click fuera.
          Compound component: <code className="text-primary">Modal.Footer</code> para las acciones.
        </DocSubtitle>
      </div>

      <DocInstall component="modal" />
      <DocDivider />

      <DocSection title="Confirmación — uso más común">
        <Preview center>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Eliminar usuario
          </Button>
          <Modal
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="Confirmar eliminación"
            description="Esta acción no se puede deshacer. El usuario y todos sus datos serán eliminados permanentemente."
          >
            <Modal.Footer>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={() => setConfirmOpen(false)}>
                Sí, eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </Preview>
        <Code code={`const [open, setOpen] = React.useState(false)

<Button variant="destructive" onClick={() => setOpen(true)}>
  Eliminar usuario
</Button>

<Modal
  open={open}
  onOpenChange={setOpen}
  title="Confirmar eliminación"
  description="Esta acción no se puede deshacer."
>
  <Modal.Footer>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
  </Modal.Footer>
</Modal>`} />
      </DocSection>

      <DocSection title="Con formulario">
        <Preview center>
          <Button onClick={() => setFormOpen(true)}>Agregar usuario</Button>
          <Modal
            open={formOpen}
            onOpenChange={setFormOpen}
            title="Nuevo usuario"
            description="El usuario recibirá un email de invitación."
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nombre" placeholder="Ana" />
                <Input label="Apellido" placeholder="García" />
              </div>
              <Input label="Email" type="email" placeholder="ana@empresa.com" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Rol</label>
                <div className="flex gap-2">
                  {["Admin", "Editor", "Viewer"].map((role) => (
                    <Badge key={role} variant="muted" className="cursor-pointer hover:bg-primary/10 hover:text-primary">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button variant="outline" onClick={() => setFormOpen(false)}>Cancelar</Button>
              <Button onClick={() => setFormOpen(false)}>Enviar invitación</Button>
            </Modal.Footer>
          </Modal>
        </Preview>
        <Code code={`<Modal open={open} onOpenChange={setOpen} title="Nuevo usuario">
  <div className="space-y-4">
    <Input label="Nombre" placeholder="Ana" />
    <Input label="Email" type="email" placeholder="ana@empresa.com" />
  </div>
  <Modal.Footer>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button onClick={handleSubmit}>Enviar invitación</Button>
  </Modal.Footer>
</Modal>`} />
        <DocNote>
          El modal usa <code>focus trap</code> automático — el foco queda atrapado dentro
          mientras está abierto y vuelve al elemento disparador al cerrarse.
        </DocNote>
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "open",          type: "boolean",                  description: "Controla si el modal está abierto" },
            { name: "onOpenChange",  type: "(open: boolean) => void",   description: "Callback al cambiar estado" },
            { name: "title",         type: "string",    default: "—",  description: "Título del modal (Radix Dialog.Title)" },
            { name: "description",   type: "string",    default: "—",  description: "Descripción (Radix Dialog.Description)" },
            { name: "maxWidth",      type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Ancho máximo del panel" },
            { name: "children",      type: "ReactNode",                 description: "Contenido del modal" },
          ]}
        />
      </DocSection>
    </div>
  )
}
