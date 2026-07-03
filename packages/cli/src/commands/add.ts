import * as path from "path"
import * as fs from "fs-extra"
import pc from "picocolors"
import ora from "ora"
import { fetchComponent, fetchRegistry } from "../utils/registry"
import { writeComponentFile } from "../utils/files"
import { installDeps } from "../utils/deps"

interface LibreriaConfig {
  version: string
  componentsDir: string
  typescript: boolean
  tailwind: { config: string; css: string }
}

interface RegistryEntry {
  name: string
  description: string
  file: string
  dependencies: string[]
  devDependencies?: string[]
  registryDependencies?: string[]  // otros componentes NuvoUI requeridos
}

interface Registry {
  components: RegistryEntry[]
}

export async function addCommand(componentNames: string[]): Promise<void> {
  console.log(pc.bold(pc.cyan("\n  nuvo-ui — add\n")))

  // 1. Leer configuración del proyecto
  const configPath = path.join(process.cwd(), "nuvo-ui.json")
  if (!(await fs.pathExists(configPath))) {
    console.log(
      pc.red(
        "  No se encontró nuvo-ui.json.\n  Ejecuta primero: " +
          pc.bold("pnpm dlx nuvo-ui init") +
          "\n"
      )
    )
    process.exit(1)
  }

  const config = (await fs.readJson(configPath)) as LibreriaConfig

  // 2. Consultar el registro remoto
  const registrySpinner = ora("Consultando registro de componentes...").start()
  let registry: Registry
  try {
    registry = await fetchRegistry()
    registrySpinner.succeed("Registro consultado")
  } catch (err) {
    registrySpinner.fail(`No se pudo acceder al registro: ${String(err)}`)
    process.exit(1)
  }

  const available = new Map(registry.components.map((c) => [c.name, c]))

  // 3. Validar componentes solicitados + resolver dependencias de registro
  const requested = new Set<string>()
  const toInstall: RegistryEntry[] = []

  function resolve(name: string): void {
    if (requested.has(name)) return
    requested.add(name)
    const entry = available.get(name)
    if (!entry) {
      console.log(pc.yellow(`  ⚠  "${name}" no existe en el registro. Disponibles: ${[...available.keys()].join(", ")}`))
      return
    }
    // Resolver dependencias de componentes primero (para que queden antes en el array)
    for (const dep of entry.registryDependencies ?? []) resolve(dep)
    toInstall.push(entry)
  }

  for (const name of componentNames) resolve(name)

  if (toInstall.length === 0) {
    console.log(pc.red("\n  No se agregó ningún componente.\n"))
    process.exit(1)
  }

  // 4. Descargar y escribir cada componente
  const allDeps = new Set<string>()
  const allDevDeps = new Set<string>()
  const ext = config.typescript ? "tsx" : "jsx"

  for (const entry of toInstall) {
    const spinner = ora(`Descargando ${entry.name}...`).start()
    try {
      const source = await fetchComponent(entry.name)
      // Escribe como carpeta: components/ui/button/index.tsx
      // así los imports relativos entre componentes (../calendar) funcionan
      const targetPath = path.join(process.cwd(), config.componentsDir, entry.name, `index.${ext}`)

      await writeComponentFile(targetPath, source)

      entry.dependencies.forEach((d) => allDeps.add(d))
      entry.devDependencies?.forEach((d) => allDevDeps.add(d))

      const rel = path.relative(process.cwd(), targetPath)
      spinner.succeed(`${pc.green(entry.name)}  →  ${pc.gray(rel)}`)
    } catch (err) {
      spinner.fail(`Error descargando ${entry.name}: ${String(err)}`)
    }
  }

  // 5. Instalar dependencias npm
  if (allDeps.size > 0) {
    const spinner = ora("Instalando dependencias...").start()
    try {
      await installDeps([...allDeps], false)
      spinner.succeed(`Dependencias: ${pc.gray([...allDeps].join(", "))}`)
    } catch {
      spinner.fail("Error instalando dependencias. Instálalas manualmente:")
      console.log(pc.gray(`  pnpm add ${[...allDeps].join(" ")}`))
    }
  }

  if (allDevDeps.size > 0) {
    const spinner = ora("Instalando devDependencies...").start()
    try {
      await installDeps([...allDevDeps], true)
      spinner.succeed(`Dev deps: ${pc.gray([...allDevDeps].join(", "))}`)
    } catch {
      spinner.fail("Error instalando devDependencies")
    }
  }

  console.log(
    pc.bold(pc.green(`\n  ✓ ${valid.length} componente(s) listo(s) en ${config.componentsDir}\n`))
  )
}
