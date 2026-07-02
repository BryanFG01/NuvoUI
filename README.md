<<<<<<< HEAD
# nuvo-ui

Componentes UI de código abierto para dashboards. Instalas solo lo que necesitas — el CLI copia el código directamente en tu proyecto, sin añadir una dependencia npm que nunca controlas.

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
| `modal` | Modal accesible con Radix Dialog y `Modal.Footer` | Compound |
| `stat-card` | Métrica de dashboard con trend y formato automático | JSON props |
| `data-table` | Tabla con API de 3 capas, sorting, paginación, búsqueda | JSON / Compound |
| `sidebar` | Sidebar colapsable con submenús y localStorage | JSON items |
| `chart` | Wrapper de Recharts: line, bar, area, pie | JSON props |

---

## DataTable — 3 capas de API

El componente central del dashboard. Usa la capa que necesitas:

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
    { key: "name",   label: "Nombre", sortable: true },
    {
      key: "status",
      label: "Estado",
      render: (value, row) => (
        <Badge variant={value === "active" ? "success" : "error"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "id",
      label: "",
      render: (_, row) => (
        <Button variant="ghost" size="sm" onClick={() => deleteUser(row.id)}>
          Eliminar
        </Button>
      ),
    },
  ]}
/>

// Capa 3 — control total (compound components)
<DataTable data={users} paginate pageSize={10}>
  <DataTable.Column columnKey="name" label="Nombre" sortable>
    {({ value, row }) => <strong>{value}</strong>}
  </DataTable.Column>
  <DataTable.Column columnKey="status" label="Estado">
    {({ value }) => <Badge variant={value}>{value}</Badge>}
  </DataTable.Column>
</DataTable>
```

---

## Sidebar — JSON puro

```tsx
const navItems = [
  { label: "Dashboard",  href: "/",       icon: HomeIcon },
  { label: "Analíticas", href: "/stats",  icon: ChartIcon },
  {
    label: "Usuarios",
    href: "/users",
    icon: UsersIcon,
    badge: 3,
    children: [
      { label: "Todos",         href: "/users" },
      { label: "Invitaciones",  href: "/users/invites" },
      { label: "Roles",         href: "/users/roles" },
    ],
  },
]

<Sidebar
  items={navItems}
  logo={<MyLogo />}
  activeHref={pathname}
  onNavigate={(href) => router.push(href)}
  storageKey="mi-app-sidebar"
/>
```

---

## Chart — JSON puro

```tsx
// Line chart
<Chart type="line" data={data} xKey="mes" yKey="ventas" />

// Bar chart con múltiples series
<Chart
  type="bar"
  data={data}
  xKey="mes"
  yKey={["ventas", "costos"]}
  color={["#3b82f6", "#10b981"]}
  legend
  height={400}
/>

// Pie chart
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
  <p className="text-sm text-muted-foreground">
    Se eliminarán todos los datos del usuario permanentemente.
  </p>
  <Modal.Footer>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
  </Modal.Footer>
</Modal>
```

---

## Customización de tokens Tailwind

Todos los colores derivan de variables CSS. Overridea en tu `globals.css`:

```css
:root {
  /* Cambia el color primario */
  --primary: 262 83% 58%;             /* Violeta */
  --primary-foreground: 0 0% 100%;

  /* Cambia el radio de bordes */
  --radius: 0.25rem;                   /* Más cuadrado */
}
```

Y en tu `tailwind.config`:

```ts
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // ...resto de tokens
    },
  },
},
```

---

## Desarrollo local

```bash
# Clonar y arrancar
git clone https://github.com/YOUR_GITHUB_USERNAME/nuvo-ui
cd nuvo-ui
pnpm install
pnpm dev

# Compilar el CLI
pnpm build:cli

# Probar el CLI localmente
cd packages/cli
pnpm build
pnpm link --global
nuvo-ui init
```

---

## Probar el CLI antes de publicar

```bash
# En la raíz del monorepo
cd packages/cli && pnpm build

# En un proyecto de prueba
cd /ruta/a/mi-proyecto-test
node /ruta/a/nuvo-ui/packages/cli/dist/index.js init
node /ruta/a/nuvo-ui/packages/cli/dist/index.js add button data-table
```

---

## Publicar en npm

```bash
# 1. Configura tu usuario de GitHub en packages/cli/src/utils/registry.ts
# 2. Haz push del repo a GitHub

# 3. Publica el CLI
cd packages/cli
pnpm build
npm publish --access public
```

El CLI se puede ejecutar sin instalación con:
```bash
pnpm dlx nuvo-ui add button
```

---

## URL de GitHub para el registry

En [packages/cli/src/utils/registry.ts](packages/cli/src/utils/registry.ts), cambia:

```ts
const GITHUB_BASE =
  "https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/nuvo-ui/main/packages/ui/src/components"
```

Por tu usuario real de GitHub. Así el CLI descargará los componentes directamente del repositorio.

---

## Contribuir

1. Fork del repositorio
2. `git checkout -b feat/nuevo-componente`
3. Crea `packages/ui/src/components/nuevo/index.tsx` + `nuevo.config.json`
4. Agrega la entrada en `packages/ui/registry.json`
5. Documenta en `apps/docs/app/page.tsx`
6. Abre un Pull Request

---

## Licencia

MIT © nuvo-ui contributors
=======
# NuvoUI
NuvoUI
>>>>>>> a026c4c (Initial commit)
