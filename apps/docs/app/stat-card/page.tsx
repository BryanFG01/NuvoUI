import { StatCard } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider } from "../doc-ui"

export default function StatCardPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>StatCard</DocTitle>
        <DocSubtitle>
          Card de métrica para dashboards. API 100% JSON. Formatea números automáticamente
          (1000 → 1K, 1000000 → 1M) y muestra tendencia con indicador de color.
        </DocSubtitle>
      </div>

      <DocInstall component="stat-card" />
      <DocDivider />

      <DocSection title="Ejemplo base">
        <Preview className="grid gap-4 sm:grid-cols-2">
          <StatCard title="Ingresos totales" value={125000} change={12.5} changeLabel="vs mes anterior" trend="up" />
          <StatCard title="Usuarios activos" value={8420}   change={3.2}  changeLabel="vs mes anterior" trend="up" />
          <StatCard title="Tasa de rebote"   value="42.3%"  change={1.8}  changeLabel="vs mes anterior" trend="down" formatValue={false} />
          <StatCard title="Tickets abiertos" value={34}     changeLabel="sin cambios" trend="neutral" />
        </Preview>
        <Code code={`<StatCard
  title="Ingresos totales"
  value={125000}        // se muestra como "125.0K"
  change={12.5}         // porcentaje de cambio
  changeLabel="vs mes anterior"
  trend="up"            // "up" | "down" | "neutral"
/>

<StatCard
  title="Tasa de rebote"
  value="42.3%"         // string = no se formatea
  change={1.8}
  trend="down"
  formatValue={false}
/>`} />
      </DocSection>

      <DocSection title="Con icono">
        <Preview className="grid gap-4 sm:grid-cols-2">
          <StatCard title="Ventas del mes" value={98500} change={8.1} trend="up"
            icon={() => (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            )}
          />
          <StatCard title="Nuevos usuarios" value={1240} change={22.4} trend="up"
            icon={() => (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            )}
          />
        </Preview>
        <Code code={`import { DollarSign } from "lucide-react"  // o cualquier ícono

<StatCard
  title="Ventas del mes"
  value={98500}
  change={8.1}
  trend="up"
  icon={DollarSign}
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "title",       type: "string",                  description: "Etiqueta de la métrica" },
            { name: "value",       type: "number | string",         description: "Valor principal a mostrar" },
            { name: "change",      type: "number",    default: "—", description: "Porcentaje de cambio" },
            { name: "changeLabel", type: "string",    default: "—", description: "Texto adicional junto al cambio" },
            { name: "trend",       type: '"up" | "down" | "neutral"', default: '"neutral"', description: "Determina el color e ícono del cambio" },
            { name: "icon",        type: "ElementType", default: "—", description: "Componente de ícono (lucide, heroicons, etc.)" },
            { name: "formatValue", type: "boolean",  default: "true", description: "Si es false, muestra el valor sin formatear" },
          ]}
        />
      </DocSection>
    </div>
  )
}
