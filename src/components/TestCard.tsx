import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  onClick?: () => void;
  completed?: boolean;
  className?: string;
}

const TestCard = ({ icon: Icon, title, description, duration, onClick, completed, className }: TestCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left touch-target",
        completed
          ? "bg-success/5 border-success/20"
          : "bg-card border-border hover:border-primary/30 hover:shadow-card active:scale-[0.98]",
        className
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
        completed ? "bg-success/10" : "bg-primary/10"
      )}>
        <Icon className={cn("w-7 h-7", completed ? "text-success" : "text-primary")} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-elder-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground shrink-0 bg-muted px-2 py-1 rounded-md">
        {duration}
      </div>
    </button>
  );
};

export default TestCard;
