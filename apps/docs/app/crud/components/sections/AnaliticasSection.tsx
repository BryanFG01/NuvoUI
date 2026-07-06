"use client"

import { Card, CardContent, CardHeader, CardTitle, Chart, StatCard } from "@nuvo-ui/ui"
import { Stats } from "../../types"
import { ACTIVITY, BY_ROLE, MONTHLY } from "../../data"

interface AnaliticasSectionProps {
  stats: Stats
}

export function AnaliticasSection({ stats }: AnaliticasSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Analíticas</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Métricas y tendencias del sistema.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total usuarios"  value={stats.total}    trend="neutral" />
        <StatCard title="Activos"         value={stats.active}   trend="up" change={Math.round(stats.active / stats.total * 100)} changeLabel="%" />
        <StatCard title="Inactivos"       value={stats.inactive} trend="down" />
        <StatCard title="Administradores" value={stats.admins}   trend="neutral" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Registros mensuales</CardTitle></CardHeader>
          <CardContent>
            <Chart
              type="bar"
              data={MONTHLY}
              xKey="mes"
              yKey={["registros", "activos"]}
              color={["hsl(var(--primary))", "hsl(var(--muted-foreground))"]}
              legend
              height={220}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Actividad semanal</CardTitle></CardHeader>
          <CardContent>
            <Chart type="line" data={ACTIVITY} xKey="dia" yKey="sesiones" color={["hsl(var(--primary))"]} height={220} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Distribución por rol</CardTitle></CardHeader>
          <CardContent>
            <Chart type="pie" data={BY_ROLE} xKey="rol" yKey="total" height={200} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Tendencia de altas</CardTitle></CardHeader>
          <CardContent>
            <Chart type="area" data={MONTHLY} xKey="mes" yKey="registros" color={["hsl(var(--primary))"]} height={200} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
