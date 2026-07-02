"use client"

import { Chart } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, PropsTable, DocDivider } from "../doc-ui"

const monthly = [
  { mes: "Ene", ventas: 4200, costos: 2400 },
  { mes: "Feb", ventas: 3800, costos: 1900 },
  { mes: "Mar", ventas: 6100, costos: 3100 },
  { mes: "Abr", ventas: 5400, costos: 2700 },
  { mes: "May", ventas: 7200, costos: 3800 },
  { mes: "Jun", ventas: 8900, costos: 4200 },
]

const pie = [
  { categoria: "Orgánico",    valor: 42 },
  { categoria: "Redes",       valor: 28 },
  { categoria: "Email",       valor: 18 },
  { categoria: "Referidos",   valor: 12 },
]

export default function ChartPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Chart</DocTitle>
        <DocSubtitle>
          Wrapper de Recharts con API JSON pura. Soporta line, bar, area y pie.
          Responsive por defecto. Tooltip y colores personalizables.
        </DocSubtitle>
      </div>

      <DocInstall component="chart" />
      <DocDivider />

      <DocSection title="Line chart">
        <Preview>
          <Chart type="line" data={monthly} xKey="mes" yKey="ventas" color="#3b82f6" height={250} />
        </Preview>
        <Code code={`<Chart
  type="line"
  data={monthly}
  xKey="mes"
  yKey="ventas"
  color="#3b82f6"
  height={250}
/>`} />
      </DocSection>

      <DocSection title="Bar chart — múltiples series">
        <Preview>
          <Chart
            type="bar"
            data={monthly}
            xKey="mes"
            yKey={["ventas", "costos"]}
            color={["#3b82f6", "#10b981"]}
            legend
            height={250}
          />
        </Preview>
        <Code code={`<Chart
  type="bar"
  data={monthly}
  xKey="mes"
  yKey={["ventas", "costos"]}   // múltiples series
  color={["#3b82f6", "#10b981"]}
  legend
/>`} />
      </DocSection>

      <DocSection title="Area chart">
        <Preview>
          <Chart type="area" data={monthly} xKey="mes" yKey="ventas" color="#8b5cf6" height={250} />
        </Preview>
        <Code code={`<Chart type="area" data={data} xKey="mes" yKey="ventas" color="#8b5cf6" />`} />
      </DocSection>

      <DocSection title="Pie chart">
        <Preview>
          <Chart
            type="pie"
            data={pie}
            xKey="categoria"
            yKey="valor"
            height={280}
            legend
          />
        </Preview>
        <Code code={`<Chart
  type="pie"
  data={[
    { categoria: "Orgánico",  valor: 42 },
    { categoria: "Redes",     valor: 28 },
    { categoria: "Email",     valor: 18 },
  ]}
  xKey="categoria"
  yKey="valor"
  legend
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "type",             type: '"line" | "bar" | "area" | "pie"', description: "Tipo de gráfica" },
            { name: "data",             type: "Record<string, unknown>[]",       description: "Array de puntos de datos" },
            { name: "xKey",             type: "string", default: '"name"',       description: "Campo para el eje X" },
            { name: "yKey",             type: "string | string[]", default: '"value"', description: "Campo(s) para el eje Y. Array = múltiples series" },
            { name: "color",            type: "string | string[]", default: "paleta",  description: "Color(es) hex de las series" },
            { name: "height",           type: "number",            default: "300",     description: "Altura en píxeles" },
            { name: "legend",           type: "boolean",           default: "false",   description: "Muestra la leyenda" },
            { name: "grid",             type: "boolean",           default: "true",    description: "Muestra la cuadrícula" },
            { name: "tooltipFormatter", type: "function",          default: "—",       description: "Formateador personalizado para el tooltip" },
          ]}
        />
      </DocSection>
    </div>
  )
}
