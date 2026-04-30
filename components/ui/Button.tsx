import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, className, children, disabled, ...props }, ref) => {

    const base =
      "inline-flex items-center justify-center gap-2 font-sans font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none btn-shimmer relative overflow-hidden";

    const variants = {
      primary:   "bg-brand-blue text-white hover:bg-brand-blue-dark active:scale-[0.98] shadow-sm hover:shadow-blue",
      secondary: "bg-brand-cloud text-brand-charcoal hover:bg-brand-blue-xl active:scale-[0.98]",
      outline:   "border-2 border-brand-blue-light text-brand-charcoal hover:border-brand-blue hover:text-brand-blue-dark bg-transparent active:scale-[0.98]",
      ghost:     "text-brand-charcoal hover:bg-brand-cloud bg-transparent active:scale-[0.98]",
      gold:      "bg-brand-gold text-white hover:bg-amber-600 active:scale-[0.98] shadow-gold font-semibold tracking-wide",
      danger:    "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
    };

    const sizes = {
      sm:  "text-ui-sm  px-3.5 py-1.5 h-8",
      md:  "text-ui-base px-5   py-2.5 h-10",
      lg:  "text-ui-lg  px-7   py-3.5 h-12",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
