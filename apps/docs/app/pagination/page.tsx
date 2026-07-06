"use client"

import * as React from "react"
import { Pagination } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function PaginationPage() {
  const [page1, setPage1] = React.useState(1)
  const [page2, setPage2] = React.useState(5)

  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Pagination</DocTitle>
        <DocSubtitle>Navegación entre páginas con ellipsis automático y accesibilidad completa.</DocSubtitle>
      </div>

      <DocInstall component="pagination" />
      <DocDivider />

      <DocSection title="Pocas páginas">
        <div className="space-y-2">
          <Pagination currentPage={page1} totalPages={5} onChange={setPage1} />
          <p className="text-xs text-muted-foreground">Página actual: {page1}</p>
        </div>
      </DocSection>

      <DocSection title="Muchas páginas (con ellipsis)">
        <div className="space-y-2">
          <Pagination currentPage={page2} totalPages={20} onChange={setPage2} />
          <p className="text-xs text-muted-foreground">Página actual: {page2} de 20</p>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`"use client"
import { Pagination } from "@nuvo-ui/ui"

const [page, setPage] = React.useState(1)

<Pagination
  currentPage={page}
  totalPages={20}
  onChange={setPage}
  siblingCount={1} // páginas a cada lado del actual
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "currentPage",  type: "number",           default: "—",  description: "Página activa (1-indexed)" },
          { name: "totalPages",   type: "number",           default: "—",  description: "Total de páginas" },
          { name: "onChange",     type: "(page: number) => void", default: "—", description: "Callback al cambiar de página" },
          { name: "siblingCount", type: "number",           default: "1",  description: "Páginas visibles a cada lado del actual" },
          { name: "className",    type: "string",           default: "—",  description: "Clases adicionales" },
        ]} />
      </DocSection>
    </div>
  )
}
