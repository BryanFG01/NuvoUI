/**
 * Chart — API JSON pura
 *
 * <Chart type="line"  data={data} xKey="mes"  yKey="ventas" />
 * <Chart type="bar"   data={data} xKey="mes"  yKey={["ventas", "costos"]} color={["#3b82f6", "#10b981"]} />
 * <Chart type="area"  data={data} xKey="date" yKey="users"  height={400} legend />
 * <Chart type="pie"   data={data} xKey="name" yKey="value" />
 */
import * as React from "react"
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  type TooltipProps,
} from "recharts"
import { cn } from "../../lib/utils"

// ─── Tipos ────────────────────────────────────────────────────────────────────
export type ChartType = "line" | "bar" | "area" | "pie"

export interface ChartProps {
  type: ChartType
  data: Record<string, unknown>[]
  xKey?: string
  yKey?: string | string[]
  color?: string | string[]
  height?: number
  legend?: boolean
  grid?: boolean
  className?: string
  tooltipFormatter?: TooltipProps<number, string>["formatter"]
}

// ─── Colores por defecto — usan CSS vars del tema ─────────────────────────────
const DEFAULT_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(148 60% 45%)",
  "hsl(38 92% 50%)",
  "hsl(270 67% 60%)",
  "hsl(197 71% 53%)",
]

function resolveColors(color: string | string[] | undefined, count: number): string[] {
  if (!color) return DEFAULT_COLORS.slice(0, Math.max(count, 1))
  if (Array.isArray(color)) return color
  return [color]
}

// ─── Hook: detecta cambio de tema y devuelve una key que sube ─────────────────
function useThemeKey(): number {
  const [key, setKey] = React.useState(0)
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const observer = new MutationObserver(() => setKey(k => k + 1))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])
  return key
}

// ─── Estilos que referencian CSS vars (se reevalúan en cada render) ───────────
function makeAxisStyle() {
  return {
    tick: { fill: "hsl(var(--muted-foreground))", fontSize: 12 },
    axisLine: false as const,
    tickLine: false as const,
  }
}

function makeTooltipStyle() {
  return {
    background: "hsl(var(--background))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    color: "hsl(var(--foreground))",
    fontSize: 12,
    padding: "8px 12px",
  }
}

// ─── Componente ───────────────────────────────────────────────────────────────
function Chart({
  type,
  data,
  xKey = "name",
  yKey = "value",
  color,
  height = 300,
  legend = false,
  grid = true,
  className,
  tooltipFormatter,
}: ChartProps) {
  const themeKey = useThemeKey()
  const keys = Array.isArray(yKey) ? yKey : [yKey]
  const colors = resolveColors(color, keys.length)
  const commonMargin = { top: 5, right: 10, left: 0, bottom: 5 }

  // Se recalculan en cada render para capturar el tema actual
  const axisStyle = makeAxisStyle()
  const tooltipContentStyle = makeTooltipStyle()

  const renderInner = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data} margin={commonMargin}>
            {grid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />}
            <XAxis dataKey={xKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={tooltipFormatter} />
            {legend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {keys.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[i] ?? DEFAULT_COLORS[0]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        )

      case "area":
        return (
          <AreaChart data={data} margin={commonMargin}>
            {grid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />}
            <XAxis dataKey={xKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={tooltipFormatter} />
            {legend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {keys.map((key, i) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[i] ?? DEFAULT_COLORS[0]}
                fill={colors[i] ?? DEFAULT_COLORS[0]}
                fillOpacity={0.12}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        )

      case "pie": {
        const pieKey = Array.isArray(yKey) ? (yKey[0] ?? "value") : yKey
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={pieKey}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={Math.min((height / 2) - 20, 120)}
              label={({ name, percent }: { name: string; percent: number }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length] ?? DEFAULT_COLORS[0]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipContentStyle} formatter={tooltipFormatter} />
            {legend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          </PieChart>
        )
      }

      default:
        return (
          <LineChart data={data} margin={commonMargin}>
            {grid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />}
            <XAxis dataKey={xKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip contentStyle={tooltipContentStyle} formatter={tooltipFormatter} />
            {legend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {keys.map((key, i) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[i] ?? DEFAULT_COLORS[0]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        )
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {/* key={themeKey} fuerza remount completo de Recharts al cambiar el tema */}
      <ResponsiveContainer key={themeKey} width="100%" height={height}>
        {renderInner()}
      </ResponsiveContainer>
    </div>
  )
}
Chart.displayName = "Chart"

export { Chart }
