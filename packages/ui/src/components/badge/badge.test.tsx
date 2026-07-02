import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Badge } from "./index"

describe("Badge", () => {
  it("renderiza children", () => {
    render(<Badge>Activo</Badge>)
    expect(screen.getByText("Activo")).toBeInTheDocument()
  })

  it("renderiza el dot cuando dot=true", () => {
    const { container } = render(<Badge dot>Con dot</Badge>)
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it("no renderiza dot cuando dot=false (default)", () => {
    const { container } = render(<Badge>Sin dot</Badge>)
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
  })

  it("renderiza todas las variantes sin error", () => {
    const variants = ["default","success","warning","error","info","muted"] as const
    for (const variant of variants) {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>)
      expect(screen.getByText(variant)).toBeInTheDocument()
      unmount()
    }
  })

  it("aplica tamaño sm", () => {
    render(<Badge size="sm">Small</Badge>)
    expect(screen.getByText("Small")).toHaveClass("text-xs")
  })
})
