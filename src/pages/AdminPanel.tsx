import { useState } from "react";
import {
  Users, Activity, MessageSquare, Server, TrendingUp, Shield,
  ChevronRight, BarChart3, AlertTriangle, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid
} from "recharts";

const userStats = [
  { month: "Jul", users: 320 },
  { month: "Aug", users: 480 },
  { month: "Sep", users: 610 },
  { month: "Oct", users: 750 },
  { month: "Nov", users: 920 },
  { month: "Dec", users: 1100 },
];

const feedbackItems = [
  { id: 1, user: "User #4821", message: "Tests are easy to understand. Love the voice prompts!", rating: 5, date: "2 hours ago" },
  { id: 2, user: "User #3192", message: "Eye tracking was a bit confusing at first.", rating: 3, date: "5 hours ago" },
  { id: 3, user: "User #7563", message: "Hindi translation is excellent. Thank you!", rating: 5, date: "1 day ago" },
  { id: 4, user: "User #1045", message: "Would love more cognitive exercises.", rating: 4, date: "2 days ago" },
];

const systemMetrics = [
  { label: "API Uptime", value: "99.97%", icon: Server, status: "good" },
  { label: "Avg Response", value: "142ms", icon: Activity, status: "good" },
  { label: "Error Rate", value: "0.03%", icon: AlertTriangle, status: "good" },
  { label: "Active Sessions", value: "247", icon: Users, status: "neutral" },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "feedback" | "system">("overview");

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "feedback" as const, label: "Feedback", icon: MessageSquare },
    { id: "system" as const, label: "System", icon: Server },
  ];

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-elder-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">System overview & management</p>
        </div>
        <VoicePromptButton />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-muted/50 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Users", value: "1,100", change: "+12%", icon: Users },
              { label: "Tests Taken", value: "8,420", change: "+18%", icon: Activity },
              { label: "High Risk Alerts", value: "23", change: "-5%", icon: AlertTriangle },
              { label: "Avg Score", value: "82", change: "+3%", icon: TrendingUp },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-4 border border-border shadow-card">
                <stat.icon className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="font-display text-elder-lg font-bold text-foreground">{stat.value}</p>
                <p className={`text-xs font-medium mt-1 ${stat.change.startsWith("+") ? "text-success" : "text-destructive"}`}>
                  {stat.change} this month
                </p>
              </div>
            ))}
          </div>

          {/* User Growth Chart */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <h2 className="font-display text-elder-lg font-semibold text-foreground mb-4">User Growth</h2>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "14px" }} />
                  <Bar dataKey="users" fill="hsl(178, 58%, 38%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Privacy Note */}
          <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-xl">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              All user data displayed is anonymized. Individual identifying information is never exposed in the admin panel.
            </p>
          </div>
        </motion.div>
      )}

      {activeTab === "feedback" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-elder-lg font-semibold text-foreground">Recent Feedback</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">{feedbackItems.length} items</span>
          </div>
          {feedbackItems.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 border border-border shadow-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{item.user}</span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <p className="text-sm text-foreground mb-2">{item.message}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < item.rating ? "text-warning" : "text-muted"}`}>★</span>
                ))}
              </div>
            </div>
          ))}
          <Button variant="outline" size="lg" className="w-full gap-2">
            Export Feedback <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      {activeTab === "system" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="font-display text-elder-lg font-semibold text-foreground">System Health</h2>
          {systemMetrics.map((m) => (
            <div key={m.label} className="bg-card rounded-xl p-4 border border-border shadow-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <m.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <p className="font-display font-bold text-elder-lg text-foreground">{m.value}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
          ))}

          <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-display font-semibold text-foreground mb-3">Database Status</h3>
            <div className="space-y-3">
              {[
                { label: "PostgreSQL", status: "Connected", healthy: true },
                { label: "AI Model Server", status: "Operational", healthy: true },
                { label: "Storage", status: "72% used", healthy: true },
              ].map((db) => (
                <div key={db.label} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{db.label}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    db.healthy ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}>
                    {db.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <p className="text-xs text-muted-foreground text-center pb-2">
        ⚕️ CogniCare Admin • All data anonymized
      </p>
    </div>
  );
};

export default AdminPanel;
