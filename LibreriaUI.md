Eres un experto en desarrollo de librerías UI open source. Tu tarea es crear desde cero una librería de componentes UI para dashboards llamada "my-ui" (reemplaza este nombre por el que yo elija), siguiendo exactamente el mismo modelo de distribución que shadcn/ui: un CLI que el usuario ejecuta con pnpm dlx y que descarga los componentes directamente en su proyecto, sin instalar la librería como dependencia.

## STACK OBLIGATORIO

- Monorepo con pnpm workspaces
- React 18+ con TypeScript estricto
- Tailwind CSS v3 para estilos (cero CSS externo)
- Radix UI como capa de primitivos accesibles
- commander.js para el CLI
- Node.js 18+ para el CLI
- Recharts para componentes de gráficas
- class-variance-authority (cva) para variantes de componentes
- clsx + tailwind-merge para manejo de clases

## ESTRUCTURA DEL PROYECTO A GENERAR

Crea esta estructura completa con todos los archivos:

my-ui/
├── pnpm-workspace.yaml
├── package.json (raíz, privado)
├── tsconfig.base.json
├── .gitignore
├── README.md
│
├── packages/
│ ├── cli/
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ └── src/
│ │ ├── index.ts ← entry point del CLI
│ │ ├── commands/
│ │ │ ├── init.ts ← comando: pnpm dlx my-ui init
│ │ │ └── add.ts ← comando: pnpm dlx my-ui add <componente>
│ │ └── utils/
│ │ ├── registry.ts ← descarga componentes desde GitHub
│ │ ├── files.ts ← escribe archivos en el proyecto del usuario
│ │ └── deps.ts ← instala dependencias con pnpm
│ │
│ └── ui/
│ ├── package.json
│ ├── tsconfig.json
│ ├── tailwind.config.ts
│ ├── registry.json ← mapa de todos los componentes disponibles
│ └── src/
│ ├── lib/
│ │ └── utils.ts ← cn() helper (clsx + tailwind-merge)
│ └── components/
│ ├── button/
│ │ ├── index.tsx
│ │ └── button.config.json
│ ├── table/
│ │ ├── index.tsx
│ │ └── table.config.json
│ ├── sidebar/
│ │ ├── index.tsx
│ │ └── sidebar.config.json
│ ├── card/
│ │ ├── index.tsx
│ │ └── card.config.json
│ ├── chart/
│ │ ├── index.tsx
│ │ └── chart.config.json
│ ├── data-grid/
│ │ ├── index.tsx
│ │ └── data-grid.config.json
│ ├── input/
│ │ ├── index.tsx
│ │ └── input.config.json
│ ├── modal/
│ │ ├── index.tsx
│ │ └── modal.config.json
│ ├── badge/
│ │ ├── index.tsx
│ │ └── badge.config.json
│ └── stat-card/
│ ├── index.tsx
│ └── stat-card.config.json
│
└── apps/
└── docs/
├── package.json
├── next.config.js
└── app/
└── page.tsx ← landing básica de la docs

## LO QUE DEBE HACER CADA ARCHIVO

### pnpm-workspace.yaml

Declarar packages/_ y apps/_ como workspaces.

### packages/cli/src/index.ts

Entry point del CLI. Registra los comandos init y add usando commander.js. El bin debe llamarse "my-ui".

### packages/cli/src/commands/init.ts

- Pregunta al usuario dónde está su carpeta de componentes (default: components/ui)
- Pregunta si usa TypeScript (default: sí)
- Genera un archivo my-ui.json en la raíz del proyecto del usuario con esa config
- Muestra instrucciones para agregar el plugin de Tailwind si no lo tiene

### packages/cli/src/commands/add.ts

- Acepta uno o más nombres de componentes: my-ui add table sidebar
- Lee my-ui.json del proyecto actual para saber dónde copiar
- Consulta registry.json desde la URL raw de GitHub del repo
- Para cada componente: descarga el archivo .tsx, lo escribe en la ruta correcta
- Lee el .config.json del componente y corre pnpm add con las dependencias necesarias
- Muestra un resumen de lo instalado

### packages/cli/src/utils/registry.ts

Función fetchRegistry(component: string): descarga desde
https://raw.githubusercontent.com/<tu-usuario>/my-ui/main/packages/ui/src/components/<component>/index.tsx
y desde el .config.json correspondiente.

### packages/ui/registry.json

JSON con todos los componentes disponibles:
{
"components": [
{
"name": "button",
"description": "Botón accesible con variantes",
"dependencies": ["class-variance-authority"]
},
{
"name": "table",
"description": "Tabla con sorting, pagination y filtros",
"dependencies": ["@tanstack/react-table"]
},
{
"name": "sidebar",
"description": "Sidebar colapsable para dashboards",
"dependencies": ["@radix-ui/react-collapsible"]
},
{
"name": "chart",
"description": "Wrapper de gráficas con Recharts",
"dependencies": ["recharts"]
},
{
"name": "data-grid",
"description": "Tabla avanzada con edición inline",
"dependencies": ["@tanstack/react-table", "@tanstack/react-virtual"]
},
{
"name": "modal",
"description": "Modal accesible con Radix Dialog",
"dependencies": ["@radix-ui/react-dialog"]
},
{
"name": "stat-card",
"description": "Card de métrica para dashboards",
"dependencies": []
}
]
}

## COMPONENTES — IMPLEMENTACIÓN COMPLETA

Implementa cada componente con estas especificaciones:

### button/index.tsx

- Variantes: default, destructive, outline, ghost, link
- Tamaños: sm, md, lg, icon
- Usa cva para variantes
- Extiende ButtonHTMLAttributes<HTMLButtonElement>
- Soporte para asChild con Radix Slot

### table/index.tsx

- Componentes: Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption
- Estilo zebra stripes opcional
- Responsive con overflow-x-auto
- Tipos exportados para cada sub-componente

### sidebar/index.tsx

- Colapsable (expandido/comprimido)
- Soporta íconos + labels
- Estado persistido en localStorage
- Tipo SidebarItem: { label, href, icon, children? }
- Variante con submenu anidado

### card/index.tsx

- Componentes: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Sombra sutil, border radius consistente

### chart/index.tsx

- Wrapper sobre Recharts
- Tipos: LineChart, BarChart, AreaChart, PieChart
- Props: data, xKey, yKey, color, height
- Responsive por defecto con ResponsiveContainer
- Tooltip personalizado

### data-grid/index.tsx

- Basado en @tanstack/react-table
- Sorting por columna al hacer click en header
- Paginación con controles previous/next
- Filtro global de búsqueda
- Columnas configurables con ColumnDef
- Skeleton loader mientras carga

### input/index.tsx

- Variantes: default, error, success
- Soporte para label, helperText, errorMessage
- Extiende InputHTMLAttributes<HTMLInputElement>

### modal/index.tsx

- Basado en @radix-ui/react-dialog
- Props: open, onOpenChange, title, description, children, footer
- Animación de entrada/salida con Tailwind
- Cierre con Escape y click fuera

### badge/index.tsx

- Variantes: default, success, warning, error, info
- Tamaños: sm, md
- Soporte para dot indicator

### stat-card/index.tsx

- Props: title, value, change (número), changeLabel, icon, trend (up|down|neutral)
- Muestra flecha verde/roja según trend
- Formato de número automático (1000 → 1K)

## ESTILOS Y TOKENS

En tailwind.config.ts del packages/ui define estos tokens de color para que el usuario pueda overridear en su proyecto:

colors: {
border: "hsl(var(--border))",
background: "hsl(var(--background))",
foreground: "hsl(var(--foreground))",
primary: {
DEFAULT: "hsl(var(--primary))",
foreground: "hsl(var(--primary-foreground))",
},
muted: {
DEFAULT: "hsl(var(--muted))",
foreground: "hsl(var(--muted-foreground))",
},
destructive: {
DEFAULT: "hsl(var(--destructive))",
foreground: "hsl(var(--destructive-foreground))",
},
}

## REGLAS DE CÓDIGO

1. TypeScript estricto en todos los archivos — no uses `any`
2. Todos los componentes exportan sus tipos (Props interfaces)
3. Cada componente tiene displayName configurado
4. Usa forwardRef en todos los componentes de formulario
5. No uses estilos inline — solo clases de Tailwind
6. No uses useEffect innecesarios
7. Todos los componentes son tree-shakeable (named exports)
8. Accesibilidad: aria-labels, roles correctos, navegación por teclado

## README.md

Genera un README profesional con:

- Badge de versión, licencia MIT, stars
- Sección de instalación del CLI con pnpm
- Quickstart en 3 pasos
- Lista de todos los componentes disponibles con descripción
- Ejemplo de uso de cada componente principal con código
- Sección de contribución
- Sección de customización de tokens Tailwind

## AL TERMINAR

Muéstrame:

1. El árbol completo de archivos creados
2. Cómo correr el proyecto en desarrollo: pnpm install && pnpm dev
3. Cómo probar el CLI localmente antes de publicar
4. El comando exacto para publicar el CLI en npm
5. Qué URL de GitHub debo configurar en registry.ts para que los usuarios puedan descargar los componentes

Ese prompt le da contexto completo al agente para que genere todo sin que tengas que ir mensaje por mensaje. Cuando lo ejecutes, después de que termine pregúntale:

"Ahora muéstrame cómo probar el CLI localmente con pnpm link"
"Agrega un componente DatePicker al registry"
"Genera la web de documentación con ejemplos en vivo"
