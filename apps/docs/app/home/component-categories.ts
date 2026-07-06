// Componentes disponibles en el home, agrupados igual que el sidebar de docs (docs-shell.tsx).

export interface ComponentEntry {
  name: string
  cmd:  string
  desc: string
}

export interface ComponentCategory {
  label: string
  items: ComponentEntry[]
}

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    label: "Formularios",
    items: [
      { name: "Button",        cmd: "button",         desc: "6 variantes, 4 tamaños, asChild" },
      { name: "Checkbox",      cmd: "checkbox",        desc: "Accesible, con label, descripción e indeterminate" },
      { name: "DatePicker",    cmd: "date-picker",     desc: "Selector de fecha con calendario custom, sin dependencias" },
      { name: "DynamicFilter", cmd: "dynamic-filter",  desc: "Filtros configurables por JSON (7 tipos de campo)" },
      { name: "FileUpload",    cmd: "file-upload",     desc: "Drag & drop con preview y validación de tamaño" },
      { name: "Input",         cmd: "input",           desc: "Label, helper text, validación inline" },
      { name: "Radio",         cmd: "radio",           desc: "RadioGroup + Radio con label y descripción" },
      { name: "Select",        cmd: "select",          desc: "Grupos, placeholder, MultiSelect con checkboxes" },
      { name: "Switch",        cmd: "switch",          desc: "Toggle accesible con label y descripción" },
      { name: "Textarea",      cmd: "textarea",        desc: "Label, helper text, variantes error/success" },
    ],
  },
  {
    label: "Layout",
    items: [
      { name: "Avatar",   cmd: "avatar",   desc: "Imagen, iniciales, status dot y AvatarGroup apilable" },
      { name: "Badge",    cmd: "badge",    desc: "6 variantes de color, dot indicator" },
      { name: "Card",     cmd: "card",     desc: "Header, Title, Description, Content, Footer" },
      { name: "Divider",  cmd: "divider",  desc: "Separador horizontal/vertical con etiqueta opcional" },
      { name: "Dropdown", cmd: "dropdown", desc: "DropdownMenu con items, separadores, atajos de teclado" },
      { name: "Modal",    cmd: "modal",    desc: "Radix Dialog + Modal.Footer composable" },
      { name: "Tooltip",  cmd: "tooltip",  desc: "Posición y delay configurables" },
    ],
  },
  {
    label: "Datos",
    items: [
      { name: "Chart",     cmd: "chart",      desc: "line, bar, area, pie — Recharts wrapper" },
      { name: "DataGrid",  cmd: "data-grid",  desc: "Edición inline, selección, exportar CSV" },
      { name: "DataTable", cmd: "data-table", desc: "API 3 capas: JSON / render / compound" },
      { name: "StatCard",  cmd: "stat-card",  desc: "Métrica con trend y formato automático" },
    ],
  },
  {
    label: "Navegación",
    items: [
      { name: "Breadcrumb", cmd: "breadcrumb", desc: "Separador personalizable" },
      { name: "Pagination", cmd: "pagination", desc: "Ellipsis automático y navegación accesible" },
      { name: "Tabs",       cmd: "tabs",       desc: "line/pill con Radix — keyboard navigation" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { name: "Alert",    cmd: "alert",    desc: "info/success/warning/error, dismiss opcional" },
      { name: "Skeleton", cmd: "skeleton", desc: "Placeholder con variantes text/rect/circle" },
      { name: "Spinner",  cmd: "spinner",  desc: "Variantes de tamaño y color" },
      { name: "Toast",    cmd: "toast",    desc: "ToastProvider, useToast hook, auto-dismiss" },
    ],
  },
  {
    label: "Avanzados",
    items: [
      { name: "FloatingActions", cmd: "floating-actions", desc: "Botones flotantes arrastrables, N acciones por JSON" },
      { name: "Login",           cmd: "login",            desc: "Glassmorphism, borde degradado, validación con burbujas" },
      { name: "Sidebar",         cmd: "sidebar",          desc: "Colapsable, submenús y localStorage" },
      { name: "Stepper",         cmd: "stepper",          desc: "Horizontal/vertical, estados complete/active/upcoming" },
      { name: "Timeline",        cmd: "timeline",         desc: "Vertical, con ícono, fecha y variantes de color" },
    ],
  },
  {
    label: "Reportería",
    items: [
      { name: "DashboardLayout", cmd: "dashboard-layout", desc: "Sidebar, header y footer como slots" },
      { name: "ExportCSV",       cmd: "export-csv",       desc: "Mapeo de columnas, formato y BOM UTF-8" },
      { name: "PrintButton",     cmd: "print-button",     desc: "Imprime solo una región de la página (PrintArea)" },
      { name: "ThemeProvider",   cmd: "theme-provider",   desc: "dark/light/system, persistencia, efecto de ola" },
    ],
  },
]

export const TOTAL_COMPONENTS = COMPONENT_CATEGORIES.reduce((n, c) => n + c.items.length, 0)
