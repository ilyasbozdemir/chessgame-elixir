import type { LucideIcon } from "lucide-react";
import { StatCard } from "./stat-card";

interface StatItem {
  label: string;
  value: number | string | null | undefined;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  iconColor: string;
}

interface StatsWrapperProps {
  stats: StatItem[];
}

export function StatsWrapper({ stats }: StatsWrapperProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <StatCard
            key={i}
            label={item.label}
            value={item.value ?? 0}
            icon={<item.icon className="w-6 h-6" />}
            gradient={item.gradient}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
          />
        ))}
      </div>
    </div>
  );
}
