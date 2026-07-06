"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function TabsPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Tabs</DocTitle>
        <DocSubtitle>Navegación por pestañas accesible con variantes line y pill.</DocSubtitle>
      </div>

      <DocInstall component="tabs" />
      <DocDivider />

      <DocSection title="Line (por defecto)">
        <Tabs defaultValue="perfil">
          <TabsList>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="notif" disabled>Notificaciones</TabsTrigger>
          </TabsList>
          <TabsContent value="perfil">
            <p className="text-sm text-muted-foreground">Configuración del perfil público.</p>
          </TabsContent>
          <TabsContent value="cuenta">
            <p className="text-sm text-muted-foreground">Gestión de la cuenta y plan.</p>
          </TabsContent>
          <TabsContent value="seguridad">
            <p className="text-sm text-muted-foreground">Contraseña, 2FA y sesiones activas.</p>
          </TabsContent>
        </Tabs>
      </DocSection>

      <DocSection title="Pill">
        <Tabs defaultValue="dia" variant="pill">
          <TabsList>
            <TabsTrigger value="dia">Hoy</TabsTrigger>
            <TabsTrigger value="semana">Semana</TabsTrigger>
            <TabsTrigger value="mes">Mes</TabsTrigger>
            <TabsTrigger value="año">Año</TabsTrigger>
          </TabsList>
          <TabsContent value="dia"><p className="text-sm text-muted-foreground">Datos del día de hoy.</p></TabsContent>
          <TabsContent value="semana"><p className="text-sm text-muted-foreground">Datos de la semana actual.</p></TabsContent>
          <TabsContent value="mes"><p className="text-sm text-muted-foreground">Datos del mes en curso.</p></TabsContent>
          <TabsContent value="año"><p className="text-sm text-muted-foreground">Resumen anual.</p></TabsContent>
        </Tabs>
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@nuvo-ui/ui"

<Tabs defaultValue="tab1" variant="pill">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Contenido 1</TabsContent>
  <TabsContent value="tab2">Contenido 2</TabsContent>
</Tabs>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props — Tabs">
        <PropsTable props={[
          { name: "variant",       type: '"line" | "pill"', default: '"line"', description: "Estilo visual de las pestañas" },
          { name: "defaultValue",  type: "string",          default: "—",      description: "Tab activo por defecto (no controlado)" },
          { name: "value",         type: "string",          default: "—",      description: "Tab activo controlado" },
          { name: "onValueChange", type: "(v: string) => void", default: "—",  description: "Callback al cambiar de tab" },
        ]} />
      </DocSection>
    </div>
  )
}
