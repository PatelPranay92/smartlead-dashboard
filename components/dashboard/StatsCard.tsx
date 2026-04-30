import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  growth: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  prefix?: string;
}

export default function StatsCard({
  title,
  value,
  growth,
  icon: Icon,
  iconColor,
  iconBg,
  prefix = "",
}: StatsCardProps) {
  const isPositive = growth >= 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 flex justify-between items-start group hover:shadow-md transition-shadow duration-200">
      <div className="flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {prefix}{typeof value === "number" ? value.toLocaleString() : value}
        </p>
        <div
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
            isPositive
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {isPositive ? "+" : ""}{growth}% vs last month
        </div>
      </div>
      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ml-4 group-hover:scale-110 transition-transform duration-200",
          iconBg
        )}
      >
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
    </div>
  );
}


