/**
 * DataGrid — tabla avanzada con edición inline
 *
 * <DataGrid
 *   data={users}
 *   columns={[
 *     { key: "name",   label: "Nombre", sortable: true, editable: true },
 *     { key: "status", label: "Estado", type: "select", options: ["active","inactive"] },
 *   ]}
 *   selectable
 *   exportable
 *   searchable
 *   idKey="id"
 *   onCellEdit={(id, key, value) => updateUser(id, key, value)}
 *   onRowSelect={(rows) => setSelected(rows)}
 * />
 */
import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef as TanstackColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { cn } from "../../lib/utils"

// ─── Tipos públicos ────────────────────────────────────────────────────────────
export interface DataGridColumnDef<T extends Record<string, unknown> = Record<string, unknown>> {
  key: string
  label?: string
  sortable?: boolean
  editable?: boolean
  type?: "text" | "number" | "date" | "select"
  options?: string[]
  width?: number
  render?: (value: unknown, row: T) => React.ReactNode
}

export interface DataGridProps<T extends Record<string, unknown> = Record<string, unknown>> {
  data: T[]
  columns: DataGridColumnDef<T>[]
  idKey?: string
  selectable?: boolean
  searchable?: boolean
  exportable?: boolean
  paginate?: boolean
  pageSize?: number
  loading?: boolean
  emptyText?: string
  onCellEdit?: (id: unknown, key: string, value: unknown) => void
  onRowSelect?: (rows: T[]) => void
  className?: string
}

// ─── CSV export ───────────────────────────────────────────────────────────────
function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: DataGridColumnDef<T>[],
  filename = "export.csv"
): void {
  const headers = columns.map((c) => c.label ?? c.key)
  const rows = data.map((row) =>
    columns.map((c) => {
      const val = (row as Record<string, unknown>)[c.key]
      const str = String(val ?? "")
      return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str
    })
  )
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url  = URL.createObjectURL(blob)
  const a    = Object.assign(document.createElement("a"), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </td>
      ))}
    </tr>
  )
}

// ─── EditableCell ──────────────────────────────────────────────────────────────
interface EditableCellProps {
  value: string
  type: DataGridColumnDef["type"]
  options?: string[]
  onCommit: (value: string) => void
  onCancel: () => void
}

function EditableCell({ value: initial, type = "text", options, onCommit, onCancel }: EditableCellProps) {
  const [val, setVal] = React.useState(initial)
  const ref = React.useRef<HTMLInputElement & HTMLSelectElement>(null)

  React.useEffect(() => { ref.current?.focus(); ref.current?.select?.() }, [])

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter")  { e.preventDefault(); onCommit(val) }
    if (e.key === "Escape") { e.preventDefault(); onCancel() }
  }

  if (type === "select" && options) {
    return (
      <select
        ref={ref as React.RefObject<HTMLSelectElement>}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={() => onCommit(val)}
        onKeyDown={handleKey}
        className={cn(
          "w-full rounded border border-primary bg-background px-2 py-0.5 text-sm text-foreground",
          "focus:outline-none focus:ring-1 focus:ring-primary"
        )}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  }

  return (
    <input
      ref={ref as React.RefObject<HTMLInputElement>}
      type={type === "number" ? "number" : type === "date" ? "date" : "text"}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => onCommit(val)}
      onKeyDown={handleKey}
      className={cn(
        "w-full rounded border border-primary bg-background px-2 py-0.5 text-sm text-foreground",
        "focus:outline-none focus:ring-1 focus:ring-primary"
      )}
    />
  )
}

// ─── DataGrid ─────────────────────────────────────────────────────────────────
function DataGrid<T extends Record<string, unknown>>({
  data,
  columns,
  idKey = "id",
  selectable = false,
  searchable = false,
  exportable = false,
  paginate = false,
  pageSize = 10,
  loading = false,
  emptyText = "Sin datos.",
  onCellEdit,
  onRowSelect,
  className,
}: DataGridProps<T>) {
  const [sorting, setSorting]           = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [selected, setSelected]         = React.useState<Set<string>>(new Set())
  const [visibleCols, setVisibleCols]   = React.useState<Set<string>>(new Set(columns.map((c) => c.key)))
  const [showColMenu, setShowColMenu]   = React.useState(false)
  const [editingCell, setEditingCell]   = React.useState<{ rowId: string; key: string } | null>(null)
  const colMenuRef = React.useRef<HTMLDivElement>(null)

  // Close column menu on outside click
  React.useEffect(() => {
    function handle(e: MouseEvent) {
      if (colMenuRef.current && !colMenuRef.current.contains(e.target as Node)) {
        setShowColMenu(false)
      }
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [])

  const visibleColumns = columns.filter((c) => visibleCols.has(c.key))

  const tanstackCols = React.useMemo<TanstackColumnDef<T>[]>(() => {
    const cols: TanstackColumnDef<T>[] = []

    if (selectable) {
      cols.push({
        id: "__select__",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getRowModel().rows.every((r) => selected.has(r.id))}
            onChange={(e) => {
              const next = new Set(selected)
              table.getRowModel().rows.forEach((r) => {
                e.target.checked ? next.add(r.id) : next.delete(r.id)
              })
              setSelected(next)
              onRowSelect?.(table.getRowModel().rows.filter((r) => next.has(r.id)).map((r) => r.original))
            }}
            className="rounded border-border accent-primary"
            aria-label="Seleccionar todos"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selected.has(row.id)}
            onChange={(e) => {
              const next = new Set(selected)
              e.target.checked ? next.add(row.id) : next.delete(row.id)
              setSelected(next)
              onRowSelect?.(
                row.getRowModel().rows.filter((r) => next.has(r.id)).map((r) => r.original)
              )
            }}
            className="rounded border-border accent-primary"
            aria-label={`Seleccionar fila ${row.index + 1}`}
          />
        ),
        size: 44,
        enableSorting: false,
      })
    }

    visibleColumns.forEach((col) => {
      cols.push({
        id: col.key,
        accessorFn: (row) => (row as Record<string, unknown>)[col.key],
        header: col.label ?? col.key,
        enableSorting: col.sortable ?? false,
        size: col.width,
        cell: ({ getValue, row }) => {
          const value    = getValue() as unknown
          const rowId    = row.id
          const isEditing = editingCell?.rowId === rowId && editingCell?.key === col.key

          if (isEditing && col.editable) {
            return (
              <EditableCell
                value={String(value ?? "")}
                type={col.type}
                options={col.options}
                onCommit={(newVal) => {
                  const id = (row.original as Record<string, unknown>)[idKey]
                  onCellEdit?.(id, col.key, newVal)
                  setEditingCell(null)
                }}
                onCancel={() => setEditingCell(null)}
              />
            )
          }

          const display = col.render ? col.render(value, row.original) : (value as React.ReactNode)

          if (col.editable) {
            return (
              <button
                className="w-full rounded px-1 text-left hover:bg-primary/10 focus:outline-none focus:ring-1 focus:ring-primary"
                onClick={() => setEditingCell({ rowId, key: col.key })}
                title="Click para editar"
                type="button"
              >
                {display}
              </button>
            )
          }

          return display
        },
      })
    })

    return cols
  }, [visibleColumns, selected, editingCell, selectable, onCellEdit, onRowSelect, idKey])

  const table = useReactTable({
    data,
    columns: tanstackCols,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(paginate ? { getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize } } } : {}),
  })

  const selectedCount = selected.size

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {searchable && (
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
            aria-label="Buscar en la tabla"
            className="h-8 w-48 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        )}
        {selectedCount > 0 && (
          <span className="text-xs text-muted-foreground">{selectedCount} seleccionados</span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {/* Column visibility */}
          <div className="relative" ref={colMenuRef}>
            <button
              onClick={() => setShowColMenu((v) => !v)}
              className="flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              type="button"
            >
              Columnas
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {showColMenu && (
              <div className="absolute right-0 top-9 z-20 min-w-[160px] rounded-lg border border-border bg-background p-2 shadow-lg">
                {columns.map((col) => (
                  <label key={col.key} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted">
                    <input
                      type="checkbox"
                      checked={visibleCols.has(col.key)}
                      onChange={(e) => {
                        const next = new Set(visibleCols)
                        e.target.checked ? next.add(col.key) : next.delete(col.key)
                        setVisibleCols(next)
                      }}
                      className="accent-primary"
                    />
                    <span className="text-foreground">{col.label ?? col.key}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* CSV Export */}
          {exportable && (
            <button
              onClick={() => exportToCSV(data, visibleColumns)}
              className="flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Exportar CSV
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full caption-bottom text-sm" role="grid">
          <thead className="border-b border-border bg-muted/50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const sorted = header.column.getIsSorted()
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      style={header.column.columnDef.size ? { width: header.column.columnDef.size } : undefined}
                      className={cn(
                        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                        header.column.getCanSort() && "cursor-pointer select-none hover:text-foreground transition-colors"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                      aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none"}
                    >
                      <span className="inline-flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-muted-foreground/50" aria-hidden="true">
                            {sorted === "asc" ? "↑" : sorted === "desc" ? "↓" : "↕"}
                          </span>
                        )}
                      </span>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} cols={visibleColumns.length + (selectable ? 1 : 0)} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="py-12 text-center text-sm text-muted-foreground">
                  {emptyText}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "transition-colors hover:bg-muted/30",
                    selected.has(row.id) && "bg-primary/5"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2.5 text-foreground">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginate && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Página {table.getState().pagination.pageIndex + 1} de {Math.max(1, table.getPageCount())}</span>
          <div className="flex gap-2">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="rounded-md border border-border px-3 py-1 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40" aria-label="Página anterior">← Anterior</button>
            <button onClick={() => table.nextPage()}     disabled={!table.getCanNextPage()}     className="rounded-md border border-border px-3 py-1 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40" aria-label="Página siguiente">Siguiente →</button>
          </div>
        </div>
      )}
    </div>
  )
}

DataGrid.displayName = "DataGrid"

export { DataGrid }
