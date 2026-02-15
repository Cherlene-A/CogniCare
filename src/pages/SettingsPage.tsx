import { useState } from "react";
import {
  Globe, Shield, Bell, Eye, Contrast, FileText, ChevronRight, LogOut, Trash2, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("en");
  const [highContrast, setHighContrast] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-14 h-8 rounded-full transition-colors duration-200 relative ${
        value ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-1 w-6 h-6 rounded-full bg-card shadow-sm transition-transform duration-200 ${
          value ? "left-7" : "left-1"
        }`}
      />
    </button>
  );

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-elder-2xl font-bold text-foreground">Settings</h1>
        <VoicePromptButton />
      </div>

      {/* Language */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 border border-border shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="font-display text-elder-lg font-semibold text-foreground">Language</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`p-3 rounded-xl border-2 text-center font-medium transition-all touch-target ${
                selectedLang === lang.code
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-foreground hover:border-primary/30"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Accessibility */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-2xl border border-border shadow-card divide-y divide-border">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Contrast className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">High Contrast Mode</p>
              <p className="text-sm text-muted-foreground">Better visibility</p>
            </div>
          </div>
          <Toggle value={highContrast} onChange={() => setHighContrast(!highContrast)} />
        </div>
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Notifications</p>
              <p className="text-sm text-muted-foreground">Caregiver & test reminders</p>
            </div>
          </div>
          <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
        </div>
      </motion.div>

      {/* Privacy & Data */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border border-border shadow-card divide-y divide-border">
        {[
          { icon: Shield, label: "Privacy Policy", sub: "How we protect your data" },
          { icon: FileText, label: "Consent Management", sub: "Modify your consent settings" },
          { icon: Lock, label: "Data Export", sub: "Download your data" },
        ].map((item) => (
          <button key={item.label} className="w-full flex items-center justify-between p-5 text-left touch-target hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.sub}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </motion.div>

      {/* Caregiver Link */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Button
          variant="outline"
          size="lg"
          className="w-full gap-2"
          onClick={() => navigate("/caregiver")}
        >
          Manage Caregivers
          <ChevronRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Account Actions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full gap-2 text-foreground"
          onClick={() => navigate("/")}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
        <Button variant="ghost" size="lg" className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/5">
          <Trash2 className="w-5 h-5" />
          Delete Account
        </Button>
      </motion.div>

      <p className="text-xs text-muted-foreground text-center pb-2">
        CogniCare v1.0 • ⚕️ Screening tool only
      </p>
    </div>
  );
};

export default SettingsPage;
