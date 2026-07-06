"use client"

import { Button, Modal } from "@nuvo-ui/ui"
import { User } from "../types"

interface DeleteModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  user: User | null
  onDelete: () => void
}

export function DeleteModal({ open, onOpenChange, user, onDelete }: DeleteModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Eliminar usuario"
      description={user ? `¿Eliminar a ${user.name}? Esta acción no se puede deshacer.` : ""}
    >
      <Modal.Footer>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button variant="destructive" onClick={onDelete}>Sí, eliminar</Button>
      </Modal.Footer>
    </Modal>
  )
}
