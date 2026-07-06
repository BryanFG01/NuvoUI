"use client"

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@nuvo-ui/ui"
import { Role, Status, User } from "../../types"
import { ROLE_BADGE, STAT_BADGE } from "../../data"

interface RolesSectionProps {
  users: User[]
}

export function RolesSection({ users }: RolesSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Roles y permisos</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Usuarios agrupados por rol.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {(["Admin", "Editor", "Viewer"] as Role[]).map(role => {
          const list = users.filter(u => u.role === role)
          return (
            <Card key={role}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">{role}</CardTitle>
                <Badge variant={ROLE_BADGE[role]}>{list.length}</Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                {list.map(u => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{u.name}</p>
                      <p className="text-[11px] text-muted-foreground">{u.email}</p>
                    </div>
                    <Badge variant={STAT_BADGE[u.status as Status]} dot size="sm">
                      {u.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                ))}
                {list.length === 0 && (
                  <p className="text-sm text-muted-foreground">Sin usuarios.</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
