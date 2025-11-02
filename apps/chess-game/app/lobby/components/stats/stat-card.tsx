import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  gradient: string;
  iconBg: string;
  iconColor: string;
}

export function StatCard({
  icon,
  label,
  value,
  gradient,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all",
        `bg-gradient-to-br ${gradient}`
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          iconBg
        )}
      >
        <div className={cn("w-6 h-6", iconColor)}>{icon}</div>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold text-foreground tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
