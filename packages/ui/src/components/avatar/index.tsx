"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-semibold text-muted-foreground select-none",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
)

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => (w[0] ?? "").toUpperCase())
    .join("")
}

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  name?: string
  status?: "online" | "offline" | "away" | "busy"
  className?: string
}

const STATUS_COLORS = {
  online:  "bg-green-500",
  offline: "bg-muted-foreground",
  away:    "bg-yellow-500",
  busy:    "bg-destructive",
}

export function Avatar({ src, alt, name, size, status, className }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <span className={cn(avatarVariants({ size }), className)}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : name ? (
        <span aria-hidden="true">{getInitials(name)}</span>
      ) : (
        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )}
      {status && (
        <span
          aria-label={status}
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
            STATUS_COLORS[status],
            size === "xs" ? "h-1.5 w-1.5" :
            size === "sm" ? "h-2 w-2" :
            size === "lg" || size === "xl" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
          )}
        />
      )}
    </span>
  )
}

// ─── AvatarGroup ──────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: AvatarProps[]
  max?: number
  size?: AvatarProps["size"]
  className?: string
}

export function AvatarGroup({ avatars, max = 4, size = "md", className }: AvatarGroupProps) {
  const shown   = avatars.slice(0, max)
  const surplus = avatars.length - max

  const gapClass = size === "xs" ? "-ml-1.5" : size === "sm" ? "-ml-2" : size === "lg" || size === "xl" ? "-ml-3" : "-ml-2.5"

  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((av, i) => (
        <span key={i} className={cn("ring-2 ring-background rounded-full", i > 0 && gapClass)}>
          <Avatar {...av} size={size} />
        </span>
      ))}
      {surplus > 0 && (
        <span className={cn(avatarVariants({ size }), gapClass, "ring-2 ring-background bg-muted text-muted-foreground")}>
          +{surplus}
        </span>
      )}
    </div>
  )
}
