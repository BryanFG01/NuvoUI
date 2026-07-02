import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { DataTable } from "./index"

const users = [
  { id: 1, name: "Ana García",   email: "ana@test.com",    status: "active"   },
  { id: 2, name: "Carlos López", email: "carlos@test.com", status: "inactive" },
]

const cols = [
  { key: "name",  label: "Nombre" },
  { key: "email", label: "Email"  },
]

describe("DataTable", () => {
  it("renderiza los headers de columnas", () => {
    render(<DataTable data={users} columns={cols} />)
    expect(screen.getByText("Nombre")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("renderiza todos los datos", () => {
    render(<DataTable data={users} columns={cols} />)
    expect(screen.getByText("Ana García")).toBeInTheDocument()
    expect(screen.getByText("Carlos López")).toBeInTheDocument()
  })

  it("muestra emptyText cuando data está vacío", () => {
    render(<DataTable data={[]} columns={cols} emptyText="Sin datos." />)
    expect(screen.getByText("Sin datos.")).toBeInTheDocument()
  })

  it("muestra skeleton cuando loading=true", () => {
    const { container } = render(<DataTable data={[]} columns={cols} loading />)
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument()
  })

  it("renderiza celdas con render function (Capa 2)", () => {
    render(
      <DataTable
        data={users}
        columns={[
          { key: "status", label: "Estado", render: (v) => <span data-testid="custom">{String(v)}</span> },
        ]}
      />
    )
    expect(screen.getAllByTestId("custom")).toHaveLength(2)
  })

  it("renderiza con compound columns (Capa 3)", () => {
    render(
      <DataTable data={users}>
        <DataTable.Column columnKey="name" label="Nombre">
          {({ value }) => <span data-testid="col3">{value as string}</span>}
        </DataTable.Column>
      </DataTable>
    )
    expect(screen.getAllByTestId("col3")).toHaveLength(2)
  })

  it("muestra controles de paginación cuando paginate=true", () => {
    render(<DataTable data={users} columns={cols} paginate pageSize={1} />)
    expect(screen.getByRole("button", { name: /anterior/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /siguiente/i })).toBeInTheDocument()
  })
})
