# NuvoUI

[![GitHub](https://img.shields.io/badge/GitHub-BryanFG01%2FNuvoUI-181717?logo=github&logoColor=white)](https://github.com/BryanFG01/NuvoUI)
[![GitHub Stars](https://img.shields.io/github/stars/BryanFG01/NuvoUI?style=social)](https://github.com/BryanFG01/NuvoUI/stargazers)

Componentes UI de código abierto para dashboards. Instalas solo lo que necesitas — el CLI copia el código directamente en tu proyecto, sin añadir una dependencia npm que nunca controlas.

> Si te resulta útil, **deja una estrella en GitHub** — ayuda a que más gente lo encuentre.
> [github.com/BryanFG01/NuvoUI](https://github.com/BryanFG01/NuvoUI)

---

## Instalación rápida (3 pasos)

```bash
# 1. Inicializa en tu proyecto
pnpm dlx nuvo-ui init

# 2. Agrega los componentes que necesitas
pnpm dlx nuvo-ui add button data-table sidebar chart

# 3. Listo — el código está en tu proyecto
```

El CLI pregunta dónde guardar los componentes (ej: `components/ui/`) y luego instala las dependencias npm necesarias automáticamente.

---

## Variables CSS requeridas

Agrega esto en tu `globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --border: 214.3 31.8% 91.4%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}
```

---

## Componentes disponibles

| Componente | Descripción | API |
|---|---|---|
| `button` | Botón accesible con 6 variantes y 4 tamaños | CVA props |
| `badge` | Etiqueta de estado con dot indicator | JSON props |
| `card` | Card con Header, Title, Description, Content, Footer | Compound |
| `input` | Input con label, helper text y validación | forwardRef props |
| `textarea` | Textarea con label, helper text y variantes error/success | forwardRef props |
| `checkbox` | Checkbox accesible con label, descripción e indeterminate | JSON props |
| `radio` | RadioGroup + Radio accesible con label y descripción | JSON props |
| `switch` | Switch toggle accesible con label y descripción | JSON props |
| `select` | Select con grupos, placeholder y validación, incluye MultiSelect con checkboxes | JSON props |
| `modal` | Modal accesible con Radix Dialog y Modal.Footer | Compound |
| `stat-card` | Métrica de dashboard con trend y formato automático | JSON props |
| `data-table` | Tabla con sorting, paginación y búsqueda | JSON / Compound |
| `data-grid` | Tabla avanzada con TanStack Table v8 | JSON props |
| `sidebar` | Sidebar colapsable con submenús y localStorage | JSON items |
| `tabs` | Tabs line/pill con Radix — keyboard navigation incluida | Compound |
| `breadcrumb` | Navegación breadcrumb con separador personalizable | JSON props |
| `pagination` | Paginación con ellipsis automático y navegación accesible | JSON props |
| `chart` | Wrapper de Recharts: line, bar, area, pie | JSON props |
| `calendar` | Calendario custom sin dependencias: grid, year picker, min/max | JSON props |
| `date-picker` | Selector de fecha con calendario custom, sin dependencias | JSON props |
| `floating-actions` | Botones flotantes drag & drop configurables por JSON | JSON props |
| `dynamic-filter` | Filtros dinámicos configurables por JSON (7 tipos de campo) | JSON props |
| `spinner` | Spinner animado con variantes de tamaño y color | CVA props |
| `skeleton` | Skeleton placeholder con variantes text/rect/circle | JSON props |
| `alert` | Alert con variantes info/success/warning/error y dismiss opcional | CVA props |
| `toast` | Toast/Snackbar con ToastProvider, useToast hook y auto-dismiss | Compound |
| `divider` | Separador horizontal/vertical con etiqueta opcional | JSON props |
| `avatar` | Avatar con imagen, iniciales, status dot y AvatarGroup apilable | CVA props |
| `tooltip` | Tooltip accesible con Radix — posición y delay configurables | JSON props |
| `dropdown` | DropdownMenu con Radix — items, separadores, labels, atajos | Compound |
| `stepper` | Stepper horizontal/vertical con estados complete/active/upcoming | JSON props |
| `timeline` | Timeline vertical con ícono, fecha y variantes de color | JSON props |
| `file-upload` | Zona de carga drag & drop con preview y validación de tamaño | JSON props |
| `login` | Pantalla de login con glassmorphism y validación con burbujas | JSON props |
| `dashboard-layout` | Layout fijo con sidebar, header y footer como slots | Compound |
| `theme-provider` | Proveedor de tema dark/light/system con persistencia | Compound |
| `export-csv` | Botón de descarga CSV con mapeo de columnas y BOM UTF-8 | JSON props |
| `print-button` | Botón de impresión/PDF con soporte de PrintArea | JSON props |

---

## DataTable — 3 capas de API

```tsx
// Capa 1 — el 90% de las tablas (JSON puro)
<DataTable
  data={users}
  columns={[
    { key: "name",  label: "Nombre" },
    { key: "email", label: "Email"  },
    { key: "role",  label: "Rol"    },
  ]}
/>

// Capa 2 — celdas personalizadas (JSON + render)
<DataTable
  data={users}
  searchable
  columns={[
    { key: "name", label: "Nombre", sortable: true },
    {
      key: "status",
      label: "Estado",
      render: (value) => (
        <Badge variant={value === "active" ? "success" : "error"}>
          {value}
        </Badge>
      ),
    },
  ]}
/>

// Capa 3 — control total (compound components)
<DataTable data={users} paginate pageSize={10}>
  <DataTable.Column columnKey="name" label="Nombre" sortable>
    {({ value }) => <strong>{value}</strong>}
  </DataTable.Column>
  <DataTable.Column columnKey="status" label="Estado">
    {({ value }) => <Badge variant={value}>{value}</Badge>}
  </DataTable.Column>
</DataTable>
```

---

## DynamicFilter — JSON puro

Soporta 7 tipos de campo: `text`, `select`, `multiselect`, `date`, `daterange`, `boolean`, `number`.

```tsx
const [filters, setFilters] = React.useState({})

<DynamicFilter
  title="Filtros"
  filters={[
    { key: "search",   label: "Buscar",    type: "text",        placeholder: "Nombre o email..." },
    { key: "status",   label: "Estado",    type: "select",      options: [{ label: "Activo", value: "active" }] },
    { key: "tags",     label: "Etiquetas", type: "multiselect", options: [{ label: "React", value: "react" }] },
    { key: "created",  label: "Período",   type: "daterange" },
    { key: "verified", label: "Verificado",type: "boolean" },
  ]}
  value={filters}
  onChange={setFilters}
/>
```

El tipo `daterange` vincula automáticamente inicio y fin: la fecha final no puede ser anterior a la inicial.

---

## DatePicker — rango vinculado

```tsx
const [from, setFrom] = React.useState<string | undefined>()
const [to,   setTo]   = React.useState<string | undefined>()

function handleFrom(v: string | undefined) {
  setFrom(v)
  if (v && to && to < v) setTo(undefined)
}
function handleTo(v: string | undefined) {
  setTo(v)
  if (v && from && from > v) setFrom(undefined)
}

<DatePicker label="Fecha inicio" value={from} onChange={handleFrom} max={to}  />
<DatePicker label="Fecha fin"    value={to}   onChange={handleTo}   min={from} />
```

El calendario bloquea automáticamente las fechas fuera del rango — el usuario no puede seleccionarlas.

---

## FloatingActions — JSON puro

```tsx
const containerRef = React.useRef<HTMLDivElement>(null)

<div ref={containerRef} className="relative min-h-[300px]">
  <FloatingActions
    actions={[
      { id: "new",    icon: PlusIcon,   label: "Nuevo",   onClick: () => setOpen(true) },
      { id: "export", icon: ExportIcon, label: "Exportar",onClick: handleExport },
    ]}
    variant="default"
    contained
    containerRef={containerRef}
  />
</div>
```

Soporta drag & drop, variantes de color y modo `contained` para quedar dentro de un contenedor.

---

## Sidebar — JSON puro

```tsx
const navItems = [
  { label: "Dashboard",  href: "/",      icon: HomeIcon },
  { label: "Analíticas", href: "/stats", icon: ChartIcon },
  {
    label: "Usuarios",
    href: "/users",
    icon: UsersIcon,
    badge: 3,
    children: [
      { label: "Todos",        href: "/users" },
      { label: "Invitaciones", href: "/users/invites" },
    ],
  },
]

<Sidebar
  items={navItems}
  activeHref={pathname}
  onNavigate={(href) => router.push(href)}
  storageKey="mi-app-sidebar"
  width={240}
/>
```

Incluye colapso/expansión con animación slide-out y persistencia en `localStorage`.

---

## Chart — JSON puro

```tsx
<Chart type="line" data={data} xKey="mes" yKey="ventas" />

<Chart
  type="bar"
  data={data}
  xKey="mes"
  yKey={["ventas", "costos"]}
  color={["#3b82f6", "#10b981"]}
  legend
  height={400}
/>

<Chart type="pie" data={categorias} xKey="nombre" yKey="total" />
```

---

## StatCard — JSON puro

```tsx
<StatCard
  title="Ingresos del mes"
  value={125000}
  change={12.5}
  changeLabel="vs mes anterior"
  trend="up"
  icon={DollarSignIcon}
/>
```

---

## Modal — JSX composable

```tsx
const [open, setOpen] = React.useState(false)

<Modal
  open={open}
  onOpenChange={setOpen}
  title="Confirmar eliminación"
  description="Esta acción no se puede deshacer."
>
  <Modal.Footer>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
  </Modal.Footer>
</Modal>
```

---

## Customización de tokens Tailwind

```css
:root {
  --primary: 262 83% 58%;          /* Violeta */
  --primary-foreground: 0 0% 100%;
  --radius: 0.25rem;               /* Más cuadrado */
}
```

```ts
// tailwind.config
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
    },
  },
},
```

---

## Desarrollo local

```bash
git clone https://github.com/BryanFG01/NuvoUI
cd NuvoUI
pnpm install
pnpm dev
```

---

## Contribuir

1. Fork del repositorio
2. `git checkout -b feat/nuevo-componente`
3. Crea `packages/ui/src/components/nuevo/index.tsx`
4. Agrega el export en `packages/ui/src/index.ts`
5. Documenta en `apps/docs/app/nuevo/page.tsx`
6. Agrega la tarjeta en `apps/docs/app/page.tsx`
7. Abre un Pull Request

---

## Dale una estrella

Si NuvoUI te ahorra tiempo, considera dejar una estrella en GitHub.
Es la mejor manera de apoyar el proyecto y ayudar a que más desarrolladores lo encuentren.

**[Dejar estrella en GitHub](https://github.com/BryanFG01/NuvoUI)**

---

## Licencia

MIT © NuvoUI contributors