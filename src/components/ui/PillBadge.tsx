interface PillBadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "primary";
}

const variants = {
  default: "bg-surface-container-high text-on-surface-variant",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  error: "bg-error-container text-on-error-container",
  primary: "bg-primary/10 text-primary",
};

export default function PillBadge({ label, variant = "default" }: PillBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-label-md font-medium ${variants[variant]}`}>
      {label}
    </span>
  );
}
