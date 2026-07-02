import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Input } from "./index"

describe("Input", () => {
  it("renderiza con label vinculado", () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })

  it("muestra helperText", () => {
    render(<Input helperText="Ingresa tu email" />)
    expect(screen.getByText("Ingresa tu email")).toBeInTheDocument()
  })

  it("muestra errorMessage y oculta helperText", () => {
    render(<Input helperText="Helper" errorMessage="Campo requerido" />)
    expect(screen.getByText("Campo requerido")).toBeInTheDocument()
    expect(screen.queryByText("Helper")).not.toBeInTheDocument()
  })

  it("marca el input como inválido cuando hay errorMessage", () => {
    render(<Input errorMessage="Error" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("llama onChange cuando cambia el valor", () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } })
    expect(handleChange).toHaveBeenCalled()
  })

  it("el error tiene role=alert para accesibilidad", () => {
    render(<Input errorMessage="Error de validación" />)
    expect(screen.getByRole("alert")).toHaveTextContent("Error de validación")
  })
})
