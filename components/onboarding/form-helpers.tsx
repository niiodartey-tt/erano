import { cn } from "@/lib/utils";

export function inputCls(hasError: boolean) {
  return cn(
    "w-full px-4 py-2.5 text-ui text-navy bg-white border rounded-lg transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1",
    hasError ? "border-red-400" : "border-line hover:border-navy/40",
  );
}

export function selectCls(hasError: boolean) {
  return cn(inputCls(hasError), "appearance-none bg-no-repeat bg-right pr-10 cursor-pointer");
}

export function Field({
  label,
  id,
  error,
  children,
  optional,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-ui-sm font-medium text-navy">
        {label}
        {optional && (
          <span className="text-body font-normal ml-1.5 text-xs">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function StepHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-section text-navy mb-1.5">{title}</h1>
      {subtitle && <p className="text-body-sm text-body">{subtitle}</p>}
    </div>
  );
}
