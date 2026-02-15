import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "low" | "medium" | "high";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const config = {
  low: { label: "Low Risk", bg: "bg-risk-low/10", text: "text-risk-low", dot: "bg-risk-low" },
  medium: { label: "Medium Risk", bg: "bg-risk-medium/10", text: "text-risk-medium", dot: "bg-risk-medium" },
  high: { label: "High Risk", bg: "bg-risk-high/10", text: "text-risk-high", dot: "bg-risk-high" },
};

const sizeClasses = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base font-semibold",
};

const RiskBadge = ({ level, size = "md", className }: RiskBadgeProps) => {
  const c = config[level];
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full font-medium", c.bg, c.text, sizeClasses[size], className)}>
      <span className={cn("w-2 h-2 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
};

export default RiskBadge;
