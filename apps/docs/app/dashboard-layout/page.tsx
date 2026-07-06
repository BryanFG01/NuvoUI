"use client"

import * as React from "react"
import {
  DashboardLayout, DashboardHeader, DashboardSidebar, DashboardNav,
  ExportCSV, Chart,
} from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

// ─── Icons ────────────────────────────────────────────────────────────────────

function GridIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> }
function UsersIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function BarIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> }

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ data, color = "hsl(var(--primary))" }: { data: number[]; color?: string }) {
  const w = 80, h = 28, pad = 2
  const min = Math.min(...data), max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / range) * (h - pad * 2)
    return `${x},${y}`
  }).join(" ")
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

interface MetricCardProps {
  label:    string
  value:    string
  trend:    number
  sparkline:number[]
}

function MetricCard({ label, value, trend, sparkline }: MetricCardProps) {
  const up    = trend >= 0
  const color = up ? "text-green-500" : "text-destructive"
  const spColor = up ? "hsl(148 60% 45%)" : "hsl(var(--destructive))"
  return (
    <div className="rounded-xl border border-border bg-background p-4 flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-bold text-foreground leading-none">{value}</span>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${color}`}>
          {up ? "↑" : "↓"} {Math.abs(trend)}%
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Sparkline data={sparkline} color={spColor} />
        <span className="text-[10px] text-muted-foreground">vs mes ant.</span>
      </div>
    </div>
  )
}

// ─── ChartCard ────────────────────────────────────────────────────────────────

const CHART_DATA = [
  { name: "Ene", value: 42000 },
  { name: "Feb", value: 51000 },
  { name: "Mar", value: 47000 },
  { name: "Abr", value: 61000 },
  { name: "May", value: 70000 },
  { name: "Jun", value: 65000 },
]

type ChartType = "line" | "bar" | "area"

function ChartCard() {
  const [type, setType] = React.useState<ChartType>("area")
  const btns: { t: ChartType; label: string }[] = [
    { t: "line", label: "L" },
    { t: "bar",  label: "B" },
    { t: "area", label: "A" },
  ]
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Ingresos por mes</p>
          <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
        </div>
        <div className="flex gap-1">
          {btns.map(b => (
            <button
              key={b.t}
              onClick={() => setType(b.t)}
              className={`h-6 w-7 rounded text-[10px] font-bold transition-colors ${
                type === b.t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <Chart
        type={type}
        data={CHART_DATA}
        xKey="name"
        yKey="value"
        height={180}
      />
    </div>
  )
}

// ─── ReportTable ──────────────────────────────────────────────────────────────

const TRANSACTIONS = [
  { usuario: "Juan Díaz",    monto: "$1,200", estado: "Pagado",    fecha: "01 Jul" },
  { usuario: "María Pérez",  monto: "$980",   estado: "Pendiente", fecha: "02 Jul" },
  { usuario: "Carlos López", monto: "$3,450", estado: "Pagado",    fecha: "03 Jul" },
  { usuario: "Sofía Ruiz",   monto: "$760",   estado: "Fallido",   fecha: "03 Jul" },
  { usuario: "Ana Gómez",    monto: "$2,100", estado: "Pagado",    fecha: "04 Jul" },
]

const STATUS_COLOR: Record<string, string> = {
  Pagado:    "text-green-500",
  Pendiente: "text-yellow-500",
  Fallido:   "text-destructive",
}

function ReportTable() {
  const csvData = TRANSACTIONS.map(t => ({ ...t }))
  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Últimas transacciones</p>
        <ExportCSV
          data={csvData}
          filename="transacciones"
          size="sm"
          label="CSV ↓"
          columns={[
            { key: "usuario", header: "Usuario" },
            { key: "monto",   header: "Monto"   },
            { key: "estado",  header: "Estado"  },
            { key: "fecha",   header: "Fecha"   },
          ]}
        />
      </div>
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/30">
          <tr>
            {["Usuario", "Monto", "Estado", "Fecha"].map(h => (
              <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRANSACTIONS.map((t, i) => (
            <tr key={i} className="border-b border-border/40 hover:bg-muted/20">
              <td className="px-4 py-2.5 font-medium text-foreground">{t.usuario}</td>
              <td className="px-4 py-2.5 font-mono text-foreground">{t.monto}</td>
              <td className="px-4 py-2.5">
                <span className={`flex items-center gap-1.5 font-medium ${STATUS_COLOR[t.estado]}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {t.estado}
                </span>
              </td>
              <td className="px-4 py-2.5 text-muted-foreground">{t.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Metrics data ─────────────────────────────────────────────────────────────

const METRICS: MetricCardProps[] = [
  { label: "Usuarios",  value: "1,280", trend:  12.4, sparkline: [40, 55, 50, 70, 65, 80, 90, 100] },
  { label: "Activos",   value: "976",   trend:   8.1, sparkline: [30, 45, 60, 55, 70, 80, 75, 90]  },
  { label: "Ingresos",  value: "$48k",  trend:  21.3, sparkline: [20, 30, 25, 50, 60, 55, 70, 90]  },
  { label: "Churn",     value: "2.4%",  trend:  -3.2, sparkline: [80, 70, 65, 60, 55, 50, 45, 40]  },
]

const NAV_ITEMS = [
  { label: "Dashboard", icon: <GridIcon />,  active: true  },
  { label: "Usuarios",  icon: <UsersIcon />, active: false, badge: 12 },
  { label: "Reportes",  icon: <BarIcon />,   active: false },
]

// ─── Full demo ────────────────────────────────────────────────────────────────

function ReportingDemo() {
  return (
    <div className="overflow-hidden rounded-xl border border-border" style={{ height: 620 }}>
      <DashboardLayout
        sidebarWidth="180px"
        headerHeight="48px"
        footerHeight="36px"
        sidebar={
          <DashboardSidebar
            header={<span className="text-sm font-bold text-foreground">NuvoUI</span>}
            footer="MIT · React · Tailwind"
          >
            <DashboardNav items={NAV_ITEMS} />
          </DashboardSidebar>
        }
        header={
          <DashboardHeader
            left={<span className="text-sm font-semibold text-foreground">Dashboard</span>}
            right={<span className="text-xs text-muted-foreground">Jul 2024</span>}
          />
        }
        footer={<span>NuvoUI v0.1 · Reporte generado automáticamente</span>}
      >
        <div className="space-y-4 p-4">
          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {METRICS.map(m => <MetricCard key={m.label} {...m} />)}
          </div>

          {/* Chart */}
          <ChartCard />

          {/* Table */}
          <ReportTable />
        </div>
      </DashboardLayout>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardLayoutPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>DashboardLayout</DocTitle>
        <DocSubtitle>
          Layout fijo con sidebar, header y footer como slots — base para dashboards y reportes.
        </DocSubtitle>
      </div>

      <DocInstall component="dashboard-layout" />
      <DocDivider />

      <DocSection title="Preview — Reporting Dashboard">
        <ReportingDemo />
      </DocSection>

      <DocSection title="Uso full-page">
        <Code code={`// Para usar como página completa, envuelve en h-screen
import {
  DashboardLayout, DashboardHeader,
  DashboardSidebar, DashboardNav
} from "@nuvo-ui/ui"

export default function AppPage() {
  return (
    <div className="h-screen">
      <DashboardLayout
        sidebarWidth="240px"
        sidebar={
          <DashboardSidebar header={<Logo />}>
            <DashboardNav items={navItems} />
          </DashboardSidebar>
        }
        header={
          <DashboardHeader
            left={<h1>Dashboard</h1>}
            right={<ThemeSwitcher />}
          />
        }
      >
        <div className="p-6">Contenido principal</div>
      </DashboardLayout>
    </div>
  )
}`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props — DashboardLayout">
        <PropsTable props={[
          { name: "sidebar",      type: "ReactNode", default: "—",       description: "Contenido del sidebar (usa DashboardSidebar)" },
          { name: "header",       type: "ReactNode", default: "—",       description: "Header superior (usa DashboardHeader)" },
          { name: "footer",       type: "ReactNode", default: "—",       description: "Footer inferior" },
          { name: "sidebarWidth", type: "string",    default: '"240px"', description: "Ancho del sidebar" },
          { name: "headerHeight", type: "string",    default: '"56px"',  description: "Alto del header" },
          { name: "footerHeight", type: "string",    default: '"48px"',  description: "Alto del footer" },
          { name: "children",     type: "ReactNode", default: "—",       description: "Área de contenido principal (scrollable)" },
        ]} />
      </DocSection>
    </div>
  )
}
