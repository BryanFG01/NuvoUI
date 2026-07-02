import { execSync } from "child_process"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

// Validates npm package names to prevent command injection
const SAFE_PKG_RE = /^(@[a-zA-Z0-9_][a-zA-Z0-9_.-]*\/)?[a-zA-Z0-9_][a-zA-Z0-9_.-]*(@[\w.^~<>=*|-]+)?$/

function assertSafePackageNames(packages: string[]): void {
  const invalid = packages.filter((p) => !SAFE_PKG_RE.test(p))
  if (invalid.length > 0) {
    throw new Error(`Nombres de paquetes inválidos: ${invalid.join(", ")}`)
  }
}

function detectPackageManager(): PackageManager {
  try { execSync("pnpm --version", { stdio: "ignore" }); return "pnpm" } catch {}
  try { execSync("bun --version",  { stdio: "ignore" }); return "bun"  } catch {}
  try { execSync("yarn --version", { stdio: "ignore" }); return "yarn" } catch {}
  return "npm"
}

const installCmd: Record<PackageManager, (pkgs: string[], dev: boolean) => string> = {
  pnpm: (p, d) => `pnpm add ${d ? "-D " : ""}${p.join(" ")}`,
  npm:  (p, d) => `npm install ${d ? "--save-dev " : ""}${p.join(" ")}`,
  yarn: (p, d) => `yarn add ${d ? "--dev " : ""}${p.join(" ")}`,
  bun:  (p, d) => `bun add ${d ? "--dev " : ""}${p.join(" ")}`,
}

export async function installDeps(packages: string[], dev: boolean): Promise<void> {
  assertSafePackageNames(packages)
  const pm  = detectPackageManager()
  const cmd = installCmd[pm](packages, dev)
  return new Promise((resolve, reject) => {
    try {
      execSync(cmd, { stdio: "pipe", cwd: process.cwd() })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
