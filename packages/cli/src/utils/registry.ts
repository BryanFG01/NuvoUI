const GITHUB_BASE =
  "https://raw.githubusercontent.com/BryanFG01/NuvoUI/main/packages/ui/src/components"

const REGISTRY_URL =
  "https://raw.githubusercontent.com/BryanFG01/NuvoUI/main/packages/ui/registry.json"

// Only lowercase letters, digits and hyphens — prevents path traversal and injection
const SAFE_NAME_RE = /^[a-z][a-z0-9-]{0,63}$/

function assertSafeName(name: string): void {
  if (!SAFE_NAME_RE.test(name)) {
    throw new Error(
      `Nombre de componente inválido: "${name}". Solo se permiten letras minúsculas, dígitos y guiones.`
    )
  }
}

interface RegistryComponent {
  name: string
  description: string
  file: string
  dependencies: string[]
  devDependencies?: string[]
}

interface Registry {
  components: RegistryComponent[]
}

export async function fetchRegistry(): Promise<Registry> {
  const res = await fetch(REGISTRY_URL, { signal: AbortSignal.timeout(10_000) })
  if (!res.ok) throw new Error(`HTTP ${res.status} al consultar el registro`)
  return res.json() as Promise<Registry>
}

export async function fetchComponent(name: string): Promise<string> {
  assertSafeName(name)
  const url = `${GITHUB_BASE}/${name}/index.tsx`
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) })
  if (!res.ok) throw new Error(`HTTP ${res.status} — no se encontró ${name} en ${url}`)
  const content = await res.text()
  if (content.length > 500_000) throw new Error(`El componente ${name} supera el tamaño máximo permitido`)
  return content
}
