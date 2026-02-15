import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Phone, Mail, Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";

interface Caregiver {
  id: string;
  name: string;
  phone: string;
  email: string;
  relation: string;
}

const CaregiverAlerts = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    { id: "1", name: "Priya Sharma", phone: "+91 98765 43210", email: "priya@email.com", relation: "Daughter" },
    { id: "2", name: "Dr. Rajesh Kumar", phone: "+91 87654 32109", email: "dr.rajesh@clinic.com", relation: "Physician" },
  ]);

  const [showAdd, setShowAdd] = useState(false);

  const recentAlerts = [
    { type: "info", message: "Weekly report shared with Priya Sharma", time: "2 hours ago" },
    { type: "warning", message: "Slight deviation in speech pattern detected", time: "1 day ago" },
    { type: "success", message: "All cognitive scores within normal range", time: "3 days ago" },
  ];

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-elder-2xl font-bold text-foreground">Caregiver Alerts</h1>
          <p className="text-muted-foreground">Manage your care network</p>
        </div>
        <VoicePromptButton />
      </div>

      {/* Recent Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="font-display text-elder-lg font-semibold text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Recent Alerts
        </h2>
        {recentAlerts.map((alert, i) => (
          <div key={i} className="bg-card rounded-xl p-4 border border-border shadow-card flex items-start gap-3">
            {alert.type === "warning" ? (
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            ) : alert.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            ) : (
              <Bell className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-elder-sm text-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Linked Caregivers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-elder-lg font-semibold text-foreground">Linked Caregivers</h2>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1 text-sm font-medium text-primary touch-target"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-card rounded-xl p-4 border-2 border-primary/20 space-y-3"
          >
            <input placeholder="Name" className="w-full h-12 px-4 rounded-lg border-2 border-border bg-background text-elder-sm focus:border-primary focus:outline-none" />
            <input placeholder="Phone Number" className="w-full h-12 px-4 rounded-lg border-2 border-border bg-background text-elder-sm focus:border-primary focus:outline-none" />
            <input placeholder="Email Address" className="w-full h-12 px-4 rounded-lg border-2 border-border bg-background text-elder-sm focus:border-primary focus:outline-none" />
            <input placeholder="Relationship" className="w-full h-12 px-4 rounded-lg border-2 border-border bg-background text-elder-sm focus:border-primary focus:outline-none" />
            <Button variant="hero" className="w-full" onClick={() => setShowAdd(false)}>Add Caregiver</Button>
          </motion.div>
        )}

        {caregivers.map((cg) => (
          <div key={cg.id} className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-display font-semibold text-elder-base text-foreground">{cg.name}</p>
                <p className="text-sm text-primary font-medium">{cg.relation}</p>
              </div>
              <button className="text-muted-foreground hover:text-destructive touch-target">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{cg.phone}</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{cg.email}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CaregiverAlerts;
