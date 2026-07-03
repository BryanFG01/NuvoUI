import * as path from "path"
import * as fs from "fs-extra"

// Prevents path traversal: ensures targetPath stays inside the project directory
function assertWithinProject(targetPath: string): void {
  const resolved   = path.resolve(targetPath)
  const projectDir = path.resolve(process.cwd())
  // path.relative handles case-insensitive filesystems (Windows/macOS) correctly
  const relative   = path.relative(projectDir, resolved)
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(
      `Ruta de destino fuera del directorio del proyecto.\n  Target: ${resolved}\n  Project: ${projectDir}`
    )
  }
}

export async function writeComponentFile(targetPath: string, content: string): Promise<void> {
  assertWithinProject(targetPath)
  const resolved = path.resolve(targetPath)
  await fs.ensureDir(path.dirname(resolved))
  await fs.writeFile(resolved, content, "utf-8")
}

export async function readProjectConfig<T>(filename: string): Promise<T | null> {
  const filePath = path.join(process.cwd(), filename)
  if (!(await fs.pathExists(filePath))) return null
  return fs.readJson(filePath) as Promise<T>
}
