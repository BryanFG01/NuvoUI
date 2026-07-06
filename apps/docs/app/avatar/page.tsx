"use client"

import { Avatar, AvatarGroup } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function AvatarPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Avatar</DocTitle>
        <DocSubtitle>Avatar con imagen, iniciales como fallback, indicador de estado y AvatarGroup apilable.</DocSubtitle>
      </div>

      <DocInstall component="avatar" />
      <DocDivider />

      <DocSection title="Tamaños">
        <div className="flex items-end gap-4">
          {(["xs", "sm", "md", "lg", "xl"] as const).map(size => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Avatar size={size} name="Bryan Fernandez" />
              <span className="text-xs text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Con imagen + fallback">
        <div className="flex items-center gap-4">
          <Avatar src="https://i.pravatar.cc/150?img=3" alt="Usuario" name="Ana López" />
          <Avatar src="/img-que-no-existe.png" name="Carlos García" />
          <Avatar name="María Pérez" />
          <Avatar />
        </div>
      </DocSection>

      <DocSection title="Estado (status dot)">
        <div className="flex items-center gap-4">
          <Avatar name="Online"  status="online"  />
          <Avatar name="Away"    status="away"    />
          <Avatar name="Busy"    status="busy"    />
          <Avatar name="Offline" status="offline" />
        </div>
      </DocSection>

      <DocSection title="AvatarGroup">
        <AvatarGroup
          size="md"
          max={4}
          avatars={[
            { name: "Ana López" },
            { name: "Carlos García" },
            { name: "María Pérez" },
            { name: "Juan Díaz" },
            { name: "Sofía Ruiz" },
            { name: "Pedro Morales" },
          ]}
        />
      </DocSection>

      <DocSection title="Uso">
        <Code code={`import { Avatar, AvatarGroup } from "@nuvo-ui/ui"

<Avatar src="/avatar.jpg" name="Bryan Fernandez" status="online" size="lg" />

<AvatarGroup
  size="sm"
  max={3}
  avatars={[
    { name: "Ana López",    status: "online" },
    { name: "Carlos García" },
    { src: "/foto.jpg", name: "María Pérez" },
  ]}
/>`} />
      </DocSection>

      <DocDivider />

      <DocSection title="Props — Avatar">
        <PropsTable props={[
          { name: "src",       type: "string",                                          default: "—",   description: "URL de la imagen" },
          { name: "alt",       type: "string",                                          default: "—",   description: "Texto alternativo para la imagen" },
          { name: "name",      type: "string",                                          default: "—",   description: "Nombre para generar iniciales como fallback" },
          { name: "size",      type: '"xs" | "sm" | "md" | "lg" | "xl"',               default: '"md"', description: "Tamaño del avatar" },
          { name: "status",    type: '"online" | "offline" | "away" | "busy"',          default: "—",   description: "Dot de estado (esquina inferior derecha)" },
        ]} />
      </DocSection>
    </div>
  )
}
