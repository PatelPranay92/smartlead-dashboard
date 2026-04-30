import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning" | "info" | "purple" | "secondary";
  className?: string;
}

const variantStyles = {
  default: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  purple: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  secondary: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function getCallStatusVariant(status: string): BadgeProps["variant"] {
  switch (status) {
    case "New Lead": return "default";
    case "Follow Up": return "warning";
    case "Converted": return "success";
    case "Not Interested": return "danger";
    default: return "secondary";
  }
}

export function getDealStatusVariant(status: string): BadgeProps["variant"] {
  switch (status) {
    case "Open": return "info";
    case "Won": return "success";
    case "Lost": return "danger";
    default: return "secondary";
  }
}

export function getSourceVariant(source: string): BadgeProps["variant"] {
  switch (source) {
    case "SmartLead": return "purple";
    case "Website": return "info";
    case "Referral": return "success";
    case "Social Media": return "purple";
    case "Email Campaign": return "default";
    case "Trade Show": return "secondary";
    default: return "secondary";
  }
}


