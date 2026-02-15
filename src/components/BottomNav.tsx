import { NavLink, useLocation } from "react-router-dom";
import { Home, Activity, FileText, Settings, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/test", icon: Activity, label: "Tests" },
  { to: "/report", icon: FileText, label: "Report" },
  { to: "/doctor", icon: Stethoscope, label: "Doctor" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const active = location.pathname.startsWith(tab.to);
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-16 h-14 rounded-xl transition-all duration-200",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <tab.icon className={cn("w-6 h-6", active && "stroke-[2.5px]")} />
              <span className={cn("text-[11px] font-medium", active && "font-semibold")}>{tab.label}</span>
              {active && (
                <div className="absolute bottom-1 w-6 h-0.5 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
