import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Preview, Code, DocDivider, PropsTable } from "../doc-ui"

export default function CardPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Card</DocTitle>
        <DocSubtitle>
          Contenedor con borde sutil y sombra. Compound component: Card, CardHeader, CardTitle,
          CardDescription, CardContent y CardFooter, cada uno con sus propios estilos y forwardRef.
        </DocSubtitle>
      </div>

      <DocInstall component="card" />
      <DocDivider />

      <DocSection title="Estructura base">
        <Preview>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Resumen de cuenta</CardTitle>
              <CardDescription>Plan profesional · Renovación en 14 días</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Proyectos activos</span>
                <span className="font-medium">12 / 20</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Almacenamiento</span>
                <span className="font-medium">8.2 GB / 50 GB</span>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Badge variant="success" dot>Activo</Badge>
              <Button size="sm" variant="outline">Gestionar</Button>
            </CardFooter>
          </Card>
        </Preview>
        <Code code={`<Card>
  <CardHeader>
    <CardTitle>Resumen de cuenta</CardTitle>
    <CardDescription>Plan profesional · Renovación en 14 días</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Contenido */}
  </CardContent>
  <CardFooter>
    <Badge variant="success" dot>Activo</Badge>
    <Button size="sm" variant="outline">Gestionar</Button>
  </CardFooter>
</Card>`} />
      </DocSection>

      <DocSection title="Variaciones de uso">
        <Preview className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Solo header</CardTitle>
              <CardDescription>Sin footer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Contenido que va aquí. El CardContent tiene padding-top 0 para alinearse con el header.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Sin header — usa <code>pt-6</code> en CardContent para compensar.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Acción</Button>
            </CardFooter>
          </Card>
        </Preview>
      </DocSection>

      <DocDivider />

      <DocSection title="Sub-componentes">
        <PropsTable
          props={[
            { name: "Card",            type: "HTMLDivElement",         description: "Contenedor principal con borde y sombra" },
            { name: "CardHeader",      type: "HTMLDivElement",         description: "Sección superior con padding (p-6)" },
            { name: "CardTitle",       type: "HTMLHeadingElement",     description: "Título — renderiza como <h3>" },
            { name: "CardDescription", type: "HTMLParagraphElement",   description: "Descripción en color muted" },
            { name: "CardContent",     type: "HTMLDivElement",         description: "Contenido principal (p-6 pt-0)" },
            { name: "CardFooter",      type: "HTMLDivElement",         description: "Pie — flex row, ideal para acciones" },
          ]}
        />
      </DocSection>
    </div>
  )
}
