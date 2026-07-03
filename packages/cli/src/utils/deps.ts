import { spawnSync } from "child_process"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

// Version specifier: only digits, letters, dots, hyphens, carets, tildes, equals
// Explicitly excludes shell metacharacters: > < | & ; $ ` ( ) { }
const SAFE_PKG_RE =
  /^(@[a-zA-Z0-9_][a-zA-Z0-9_.-]*\/)?[a-zA-Z0-9_][a-zA-Z0-9_.-]*(@[0-9a-zA-Z._^~=-]+)?$/

function assertSafePackageNames(packages: string[]): void {
  const invalid = packages.filter((p) => !SAFE_PKG_RE.test(p))
  if (invalid.length > 0) {
    throw new Error(`Nombres de paquetes inválidos: ${invalid.join(", ")}`)
  }
}

function detectPackageManager(): PackageManager {
  if (spawnSync("pnpm", ["--version"], { stdio: "ignore" }).status === 0) return "pnpm"
  if (spawnSync("bun",  ["--version"], { stdio: "ignore" }).status === 0) return "bun"
  if (spawnSync("yarn", ["--version"], { stdio: "ignore" }).status === 0) return "yarn"
  return "npm"
}

// Arguments passed as array — never interpolated into a shell string
const PM_ARGS: Record<PackageManager, (pkgs: string[], dev: boolean) => string[]> = {
  pnpm: (p, d) => ["add", ...(d ? ["-D"] : []), ...p],
  npm:  (p, d) => ["install", ...(d ? ["--save-dev"] : []), ...p],
  yarn: (p, d) => ["add", ...(d ? ["--dev"] : []), ...p],
  bun:  (p, d) => ["add", ...(d ? ["--dev"] : []), ...p],
}

export async function installDeps(packages: string[], dev: boolean): Promise<void> {
  assertSafePackageNames(packages)
  const pm     = detectPackageManager()
  const args   = PM_ARGS[pm](packages, dev)
  const result = spawnSync(pm, args, { stdio: "pipe", cwd: process.cwd() })
  if (result.status !== 0) {
    const msg = result.stderr?.toString().trim() ?? "Error desconocido"
    throw new Error(msg)
  }
}
