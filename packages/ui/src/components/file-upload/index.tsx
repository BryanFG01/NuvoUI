"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FileUploadFile {
  file: File
  id: string
  error?: string
}

export interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSizeMb?: number
  maxFiles?: number
  label?: string
  helperText?: string
  disabled?: boolean
  onChange?: (files: FileUploadFile[]) => void
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ─── File icon ────────────────────────────────────────────────────────────────

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="16 16 12 12 8 16"/>
      <line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FileUpload({
  accept,
  multiple = false,
  maxSizeMb = 5,
  maxFiles = 10,
  label = "Arrastra archivos aquí o",
  helperText,
  disabled,
  onChange,
  className,
}: FileUploadProps) {
  const inputRef  = React.useRef<HTMLInputElement>(null)
  const [files,   setFiles]   = React.useState<FileUploadFile[]>([])
  const [dragging, setDragging] = React.useState(false)

  function addFiles(incoming: File[]) {
    const maxBytes = maxSizeMb * 1024 * 1024
    const next: FileUploadFile[] = incoming.slice(0, maxFiles - files.length).map(f => ({
      file: f,
      id:   Math.random().toString(36).slice(2),
      error: f.size > maxBytes ? `Máximo ${maxSizeMb} MB` : undefined,
    }))
    const updated = multiple ? [...files, ...next] : next
    setFiles(updated)
    onChange?.(updated)
  }

  function removeFile(id: string) {
    const updated = files.filter(f => f.id !== id)
    setFiles(updated)
    onChange?.(updated)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    addFiles(Array.from(e.dataTransfer.files))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(Array.from(e.target.files))
    e.target.value = ""
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Zona de carga de archivos"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={e => { if ((e.key === "Enter" || e.key === " ") && !disabled) inputRef.current?.click() }}
        onDragOver={e => { e.preventDefault(); !disabled && setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors cursor-pointer",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/30",
          disabled && "cursor-not-allowed opacity-50 pointer-events-none"
        )}
      >
        <span className={cn("text-muted-foreground", dragging && "text-primary")}>
          <UploadIcon />
        </span>
        <div>
          <p className="text-sm text-foreground">
            {label}{" "}
            <span className="font-semibold text-primary">haz clic para seleccionar</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {accept
              ? `Formatos: ${accept}`
              : "Cualquier formato"} · Máx. {maxSizeMb} MB
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="hidden"
      />

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map(f => (
            <li
              key={f.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm",
                f.error
                  ? "border-destructive/40 bg-destructive/5"
                  : "border-border bg-muted/30"
              )}
            >
              <span className={cn("shrink-0", f.error ? "text-destructive" : "text-muted-foreground")}>
                <FileIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{f.file.name}</p>
                <p className={cn("text-xs", f.error ? "text-destructive" : "text-muted-foreground")}>
                  {f.error ?? formatBytes(f.file.size)}
                </p>
              </div>
              <button
                type="button"
                aria-label={`Quitar ${f.file.name}`}
                onClick={() => removeFile(f.id)}
                className="shrink-0 text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
