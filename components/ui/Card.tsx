import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat" | "elevated" | "bordered";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  variant = "default",
  hover = false,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  const base = "rounded-xl bg-white";

  const variants = {
    default:  "border border-brand-cloud shadow-card",
    flat:     "border border-brand-cloud",
    elevated: "shadow-card-hover",
    bordered: "border-2 border-brand-blue-light",
  };

  const paddings = {
    none: "",
    sm:   "p-4",
    md:   "p-5 md:p-6",
    lg:   "p-6 md:p-8",
  };

  const hoverStyles = hover
    ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-brand-blue-light cursor-pointer"
    : "";

  return (
    <div
      className={cn(base, variants[variant], paddings[padding], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-sans font-medium text-ui-lg text-brand-charcoal", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-ui-base text-gray-500", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 pt-4 border-t border-brand-cloud flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
