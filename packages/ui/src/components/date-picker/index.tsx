import * as React from "react"
import { cn } from "../../lib/utils"

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string
  helperText?: string
  errorMessage?: string
  value?: string
  onChange?: (value: string) => void
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    { className, label, helperText, errorMessage, value, onChange, id, min, max, ...props },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId    = id ?? generatedId
    const hasError   = !!errorMessage
    const errorId    = hasError ? `${inputId}-error` : undefined
    const helperId   = helperText ? `${inputId}-helper` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="date"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange?.(e.target.value)}
          aria-invalid={hasError || undefined}
          aria-describedby={errorId ?? helperId}
          className={cn(
            "h-9 w-full rounded-md border bg-background px-3 py-1 text-sm text-foreground",
            "[color-scheme:dark]",
            "transition-colors focus:outline-none focus:ring-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError
              ? "border-destructive focus:border-destructive focus:ring-destructive/30"
              : "border-border focus:border-primary focus:ring-primary/30",
            className
          )}
          {...props}
        />
        {errorMessage && (
          <p id={errorId} className="text-xs text-destructive" role="alert">
            {errorMessage}
          </p>
        )}
        {!errorMessage && helperText && (
          <p id={helperId} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
