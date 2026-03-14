"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Types ───────────────────────────────────────────────────────────────────

type InputVariant = "default" | "search" | "password";
type InputSize = "sm" | "md" | "lg";

interface LyrixInputProps extends Omit<React.ComponentProps<"input">, "size"> {
    variant?: InputVariant;
    inputSize?: InputSize;
    label?: React.ReactNode;
    hint?: string;
    error?: string;
    success?: string;
    clearable?: boolean;
    onClear?: () => void;
    containerClassName?: string;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeMap: Record<InputSize, string> = {
    sm: "h-8 text-xs px-3",
    md: "h-11 text-sm px-4",
    lg: "h-13 text-base px-5",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LyrixInput({
    variant = "default",
    inputSize = "md",
    label,
    hint,
    error,
    success,
    clearable,
    onClear,
    className,
    containerClassName,
    id,
    value,
    onChange,
    ...props
}: LyrixInputProps) {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = id ?? React.useId();

    const isPassword = variant === "password";
    const isSearch = variant === "search";

    const inputType = isPassword
        ? showPassword
            ? "text"
            : "password"
        : isSearch
            ? "search"
            : props.type ?? "text";

    const hasLeftIcon = isSearch;
    const hasRightSlot = isPassword || (clearable && value);

    const stateClass = error
        ? "border-destructive focus-visible:ring-destructive/30 focus-visible:border-destructive"
        : success
            ? "border-primary focus-visible:ring-primary/30 focus-visible:border-primary"
            : "focus-visible:ring-primary/30 focus-visible:border-primary";

    return (
        <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
            {/* Label */}
            {label && (
                <Label
                    htmlFor={inputId}
                    className="text-sm font-medium text-foreground"
                >
                    {label}
                    {props.required && (
                        <span className="text-destructive ml-1">*</span>
                    )}
                </Label>
            )}

            {/* Input wrapper */}
            <div className="relative flex items-center">
                {/* Left icon — search only */}
                {isSearch && (
                    <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                )}

                <Input
                    {...props}
                    id={inputId}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    className={cn(
                        sizeMap[inputSize],
                        stateClass,
                        "bg-background transition-all duration-150",
                        // remove browser search cancel button
                        "[&::-webkit-search-cancel-button]:hidden",
                        hasLeftIcon && "pl-9",
                        hasRightSlot && "pr-10",
                        className
                    )}
                />

                {/* Right slot */}
                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                )}

                {clearable && value && !isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={onClear}
                        className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear input"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Bottom hint / error / success */}
            {(hint || error || success) && (
                <p
                    className={cn("text-xs font-mono", {
                        "text-destructive": error,
                        "text-primary": success,
                        "text-muted-foreground": hint && !error && !success,
                    })}
                >
                    {error ?? success ?? hint}
                </p>
            )}
        </div>
    );
}