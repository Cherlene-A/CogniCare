import { Outlet } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Shield, Wifi, WifiOff } from "lucide-react";
import { useState } from "react";

const AppLayout = () => {
  const [isOffline] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Status bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-12 px-4 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-elder-base text-gradient-primary">CogniCare</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-success" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {isOffline ? (
                <><WifiOff className="w-3.5 h-3.5 text-warning" /><span>Offline</span></>
              ) : (
                <><Wifi className="w-3.5 h-3.5 text-success" /><span>Online</span></>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="pt-14 px-4 max-w-lg mx-auto">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default AppLayout;
