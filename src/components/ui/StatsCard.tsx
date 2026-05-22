interface StatsCardProps {
  value: string;
  label: string;
  icon?: string;
  accent?: "primary" | "secondary" | "tertiary";
}

const accentColors = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  tertiary: "text-tertiary bg-tertiary/10",
};

export default function StatsCard({ value, label, icon, accent = "primary" }: StatsCardProps) {
  return (
    <div className="card flex flex-col gap-2">
      {icon && (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${accentColors[accent]}`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      )}
      <span className="text-headline-lg font-semibold text-on-surface">{value}</span>
      <span className="text-label-md text-on-surface-variant">{label}</span>
    </div>
  );
}
