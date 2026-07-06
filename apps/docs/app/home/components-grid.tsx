"use client"

import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@nuvo-ui/ui"
import { COMPONENT_CATEGORIES } from "./component-categories"

export function ComponentsGrid() {
  return (
    <Tabs defaultValue="Formularios" variant="pill">
      <div className="overflow-x-auto">
        <TabsList>
          {COMPONENT_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.label} value={cat.label}>
              {cat.label}
              <span className="ml-1.5 text-[10px] text-muted-foreground">{cat.items.length}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {COMPONENT_CATEGORIES.map((cat) => (
        <TabsContent key={cat.label} value={cat.label}>
          <div className="grid gap-3 sm:grid-cols-2">
            {cat.items.map(({ name, cmd, desc }) => (
              <Link
                key={cmd}
                href={`/${cmd}`}
                className="group rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</span>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                    {cmd}
                  </code>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
