"use client"

import { PrintButton, PrintArea, ExportCSV } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

const REPORTE_DATA = [
  { mes: "Enero",    ventas: 48000, usuarios: 1200, churn: "2.1%" },
  { mes: "Febrero",  ventas: 52000, usuarios: 1350, churn: "1.8%" },
  { mes: "Marzo",    ventas: 61000, usuarios: 1500, churn: "2.4%" },
  { mes: "Abril",    ventas: 55000, usuarios: 1420, churn: "1.9%" },
  { mes: "Mayo",     ventas: 70000, usuarios: 1680, churn: "1.5%" },
]

export default function PrintButtonPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>PrintButton</DocTitle>
        <DocSubtitle>
          Botón de impresión / PDF con soporte de PrintArea para imprimir solo una región de la página.
        </DocSubtitle>
      </div>

      <DocInstall component="print-button" />
      <DocDivider />

      <DocSection title="Imprimir toda la página">
        <div className="flex gap-2">
          <PrintButton />
          <PrintButton variant="default" label="Guardar PDF" />
          <PrintButton variant="ghost" size="sm" label="Imprimir" />
        </div>
      </DocSection>

      <DocSection title="Imprimir solo una región (PrintArea)">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <PrintButton selector="#reporte-mensual" label="Imprimir reporte" />
            <ExportCSV data={REPORTE_DATA} filename="reporte-mensual" label="Exportar CSV" />
          </div>

          <PrintArea id="reporte-mensual">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="border-b border-border bg-muted/30 px-4 py-3">
                <h3 className="text-sm font-semibold text-foreground">Reporte mensual 2024</h3>
                <p className="text-xs text-muted-foreground">Ventas, usuarios y churn por mes</p>
              </div>
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/20">
                  <tr>
                    {["Mes", "Ventas", "Usuarios", "Churn"].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REPORTE_DATA.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="px-4 py-2.5 font-medium text-foreground">{row.mes}</td>
                      <td className="px-4 py-2.5 text-foreground">${row.ventas.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-foreground">{row.usuarios.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-foreground">{row.churn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PrintArea>
        </div>
      </DocSection>

      <DocSection title="Variantes">
        <div className="flex flex-wrap items-center gap-2">
          <PrintButton variant="default" size="sm" />
          <PrintButton variant="outline" size="md" />
          <PrintButton variant="ghost"   size="lg" />
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { PrintButton, PrintArea } from "@nuvo-ui/ui"

// Imprime toda la página
<PrintButton label="Imprimir" />

// Imprime solo el área con id="mi-reporte"
<PrintButton selector="#mi-reporte" label="Imprimir reporte" />

<PrintArea id="mi-reporte">
  {/* Solo este contenido se imprime */}
  <table>...</table>
</PrintArea>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props — PrintButton">
        <PropsTable props={[
          { name: "label",    type: "string",                          default: '"Imprimir"', description: "Texto del botón" },
          { name: "selector", type: "string",                          default: "—",          description: "CSS selector del elemento a imprimir. Sin selector imprime toda la página" },
          { name: "variant",  type: '"default" | "outline" | "ghost"',default: '"outline"',  description: "Estilo visual" },
          { name: "size",     type: '"sm" | "md" | "lg"',             default: '"md"',       description: "Tamaño" },
          { name: "onBefore", type: "() => void",                     default: "—",          description: "Callback antes de imprimir" },
          { name: "onAfter",  type: "() => void",                     default: "—",          description: "Callback después de imprimir" },
        ]} />
      </DocSection>

      <DocSection title="Props — PrintArea">
        <PropsTable props={[
          { name: "id",       type: "string",    default: '"print-area"', description: "ID del área. Debe coincidir con el selector de PrintButton" },
          { name: "children", type: "ReactNode", default: "—",            description: "Contenido imprimible" },
        ]} />
      </DocSection>
    </div>
  )
}
