"use client"

import { Skeleton } from "@nuvo-ui/ui"
import { DocTitle, DocSubtitle, DocInstall, DocSection, Code, PropsTable, DocDivider } from "../doc-ui"

export default function SkeletonPage() {
  return (
    <div className="space-y-10">
      <div>
        <DocTitle>Skeleton</DocTitle>
        <DocSubtitle>Placeholder animado para contenido mientras se carga.</DocSubtitle>
      </div>

      <DocInstall component="skeleton" />
      <DocDivider />

      <DocSection title="Rect">
        <div className="space-y-2 max-w-sm">
          <Skeleton height={24} width="80%" />
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} width="60%" />
        </div>
      </DocSection>

      <DocSection title="Texto (líneas)">
        <div className="max-w-sm">
          <Skeleton lines={4} />
        </div>
      </DocSection>

      <DocSection title="Circle / Avatar">
        <div className="flex gap-3 items-center">
          <Skeleton circle width={40} />
          <Skeleton circle width={48} />
          <Skeleton circle width={64} />
        </div>
      </DocSection>

      <DocSection title="Card completa">
        <div className="rounded-xl border border-border p-4 max-w-sm space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton circle width={40} />
            <div className="flex-1 space-y-1.5">
              <Skeleton height={14} width="50%" />
              <Skeleton height={12} width="35%" />
            </div>
          </div>
          <Skeleton height={120} />
          <Skeleton lines={2} />
        </div>
      </DocSection>

      <DocDivider />

      <DocSection title="Props">
        <PropsTable props={[
          { name: "width",   type: "string | number", default: "—",       description: "Ancho del skeleton" },
          { name: "height",  type: "string | number", default: '"1rem"',   description: "Alto del skeleton (rect)" },
          { name: "circle",  type: "boolean",          default: "false",    description: "Forma circular — usa width como diámetro" },
          { name: "lines",   type: "number",           default: "—",        description: "Genera N líneas de texto con la última al 60%" },
          { name: "className",type: "string",          default: "—",        description: "Clases adicionales" },
        ]} />
      </DocSection>
    </div>
  )
}
