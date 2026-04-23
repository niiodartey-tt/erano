import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "outline";
  size?: "sm" | "md";
}

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center font-sans font-500 rounded-full whitespace-nowrap";

  const variants = {
    default: "bg-brand-cloud text-brand-charcoal",
    primary: "bg-brand-blue-xl text-brand-blue-dark",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger:  "bg-red-50 text-red-700",
    info:    "bg-blue-50 text-blue-700",
    outline: "border border-brand-blue-light text-brand-blue-dark bg-transparent",
  };

  const sizes = {
    sm: "text-[0.625rem] px-2 py-0.5 tracking-wide uppercase font-semibold",
    md: "text-ui-sm px-2.5 py-1",
  };

  return (
    <span
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
