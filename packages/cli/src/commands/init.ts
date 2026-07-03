import * as path from "path"
import * as fs from "fs-extra"
import prompts from "prompts"
import pc from "picocolors"

interface LibreriaConfig {
  version: string
  componentsDir: string
  typescript: boolean
  tailwind: {
    config: string
    css: string
  }
}

const CSS_VARIABLES = `
  /* Pega esto en tu archivo CSS global (ej: src/app/globals.css) */
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
    .dark {
      --background: 222.2 84% 4.9%;
      --foreground: 210 40% 98%;
      --primary: 217.2 91.2% 59.8%;
      --primary-foreground: 222.2 47.4% 11.2%;
      --muted: 217.2 32.6% 17.5%;
      --muted-foreground: 215 20.2% 65.1%;
      --border: 217.2 32.6% 17.5%;
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 210 40% 98%;
      --ring: 224.3 76.3% 48%;
    }
  }
`

export async function initCommand(): Promise<void> {
  console.log(pc.bold(pc.cyan("\n  nuvo-ui — init\n")))

  const answers = await prompts(
    [
      {
        type: "text",
        name: "componentsDir",
        message: "¿Dónde guardar los componentes?",
        initial: "components/ui",
      },
      {
        type: "confirm",
        name: "typescript",
        message: "¿Usas TypeScript?",
        initial: true,
      },
      {
        type: "text",
        name: "tailwindConfig",
        message: "Ruta del archivo tailwind.config",
        initial: "tailwind.config.ts",
      },
      {
        type: "text",
        name: "tailwindCss",
        message: "Ruta del archivo CSS global",
        initial: "src/app/globals.css",
      },
    ],
    {
      onCancel: () => {
        console.log(pc.red("\n  Operación cancelada.\n"))
        process.exit(0)
      },
    }
  )

  const componentsDir = (answers.componentsDir as string).trim()
  const SAFE_DIR_RE   = /^[a-zA-Z0-9_][a-zA-Z0-9_/.-]*$/
  if (
    !SAFE_DIR_RE.test(componentsDir) ||
    componentsDir.startsWith("/") ||
    componentsDir.includes("..")
  ) {
    console.log(pc.red("\n  Ruta inválida. Usa una ruta relativa como: components/ui\n"))
    process.exit(1)
  }

  const config: LibreriaConfig = {
    version: "0.1.0",
    componentsDir,
    typescript: answers.typescript as boolean,
    tailwind: {
      config: answers.tailwindConfig as string,
      css: answers.tailwindCss as string,
    },
  }

  const configPath = path.join(process.cwd(), "nuvo-ui.json")
  await fs.writeJson(configPath, config, { spaces: 2 })

  console.log(pc.green("\n  ✓ Configuración guardada en nuvo-ui.json\n"))

  console.log("  Agrega esto en tu " + pc.cyan("tailwind.config") + ":\n")
  console.log(
    pc.gray(`    content: [
      "./${config.componentsDir}/**/*.{ts,tsx}",
      // ...resto de tu configuración
    ],`)
  )

  console.log("\n  Agrega estas variables CSS en tu " + pc.cyan(config.tailwind.css) + ":")
  console.log(pc.gray(CSS_VARIABLES))

  console.log(pc.bold("\n  Listo. Ahora agrega componentes con:\n"))
  console.log(pc.cyan("  pnpm dlx nuvo-ui add button data-table sidebar\n"))
}
