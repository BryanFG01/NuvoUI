import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Button } from "./index"

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Haz click</Button>)
    expect(screen.getByRole("button", { name: /haz click/i })).toBeInTheDocument()
  })

  it("llama onClick al hacer click", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it("queda disabled cuando se pasa disabled", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("no llama onClick cuando está disabled", () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it("renderiza todas las variantes sin error", () => {
    const variants = ["default","destructive","outline","secondary","ghost","link"] as const
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>)
      expect(screen.getByRole("button")).toBeInTheDocument()
      unmount()
    }
  })

  it("aplica clase de tamaño sm", () => {
    render(<Button size="sm">Pequeño</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-8")
  })
})
