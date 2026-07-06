"use client"

import {
  Badge, Button, Card, CardContent, CardHeader, CardTitle,
  Chart, DataTable, StatCard,
} from "@nuvo-ui/ui"
import { Role, Stats, Status, User } from "../../types"
import { ACTIVITY, BY_ROLE, ROLE_BADGE, STAT_BADGE } from "../../data"

interface DashboardSectionProps {
  stats: Stats
  users: User[]
  onNavigateToUsers: () => void
}

export function DashboardSection({ stats, users, onNavigateToUsers }: DashboardSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Bienvenido de nuevo</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Resumen general del sistema de usuarios.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total usuarios"  value={stats.total}    trend="neutral" />
        <StatCard title="Activos"         value={stats.active}   trend="up" change={Math.round(stats.active / stats.total * 100)} changeLabel="%" />
        <StatCard title="Inactivos"       value={stats.inactive} trend={stats.inactive > 0 ? "down" : "neutral"} />
        <StatCard title="Administradores" value={stats.admins}   trend="neutral" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Actividad semanal</CardTitle></CardHeader>
          <CardContent>
            <Chart type="area" data={ACTIVITY} xKey="dia" yKey="sesiones" color={["hsl(var(--primary))"]} height={180} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Por rol</CardTitle></CardHeader>
          <CardContent>
            <Chart type="pie" data={BY_ROLE} xKey="rol" yKey="total" height={180} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Últimos registros</CardTitle>
          <Button variant="ghost" size="sm" onClick={onNavigateToUsers}>Ver todos →</Button>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <DataTable<User>
            data={[...users].slice(-4).reverse()}
            columns={[
              {
                key: "name",
                label: "Nombre",
                render: (_, r) => (
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.email}</p>
                  </div>
                ),
              },
              {
                key: "role",
                label: "Rol",
                render: v => <Badge variant={ROLE_BADGE[v as Role]} size="sm">{v as string}</Badge>,
              },
              {
                key: "status",
                label: "Estado",
                render: v => (
                  <Badge variant={STAT_BADGE[v as Status]} dot size="sm">
                    {v === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                ),
              },
              {
                key: "joinedAt",
                label: "Alta",
                render: v => (
                  <span className="text-xs text-muted-foreground">
                    {new Date(v as string).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
