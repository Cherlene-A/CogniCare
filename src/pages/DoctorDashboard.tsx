import { useState } from "react";
import {
  Users, TrendingUp, Brain, Mic, Eye, PenTool, Download, Search, AlertTriangle, CheckCircle2, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RiskBadge from "@/components/RiskBadge";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
  BarChart, Bar, Legend, AreaChart, Area
} from "recharts";

const patients = [
  { id: "P001", name: "Ramesh Gupta", age: 72, risk: "low" as const, score: 87, lastVisit: "Today" },
  { id: "P002", name: "Sunita Devi", age: 68, risk: "medium" as const, score: 64, lastVisit: "2 days ago" },
  { id: "P003", name: "Mohan Lal", age: 75, risk: "high" as const, score: 42, lastVisit: "1 week ago" },
  { id: "P004", name: "Kamala Ben", age: 70, risk: "low" as const, score: 91, lastVisit: "3 days ago" },
];

const longitudinalData = [
  { month: "Jan", cognitive: 78, speech: 82, eye: 85, writing: 80 },
  { month: "Feb", cognitive: 76, speech: 80, eye: 83, writing: 78 },
  { month: "Mar", cognitive: 80, speech: 84, eye: 86, writing: 82 },
  { month: "Apr", cognitive: 82, speech: 83, eye: 88, writing: 84 },
  { month: "May", cognitive: 79, speech: 81, eye: 85, writing: 80 },
  { month: "Jun", cognitive: 84, speech: 86, eye: 90, writing: 86 },
  { month: "Jul", cognitive: 87, speech: 88, eye: 92, writing: 88 },
];

const behaviorData = [
  { name: "Sleep", before: 7.2, current: 6.8 },
  { name: "Activity", before: 65, current: 58 },
  { name: "Social", before: 80, current: 72 },
  { name: "Mood", before: 75, current: 70 },
];

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-elder-2xl font-bold text-foreground">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Clinical Overview • Longitudinal Data</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Patients", value: "24", icon: Users, color: "text-primary" },
          { label: "At Risk", value: "3", icon: AlertTriangle, color: "text-warning" },
          { label: "Stable", value: "21", icon: CheckCircle2, color: "text-success" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-3 border border-border shadow-card text-center"
          >
            <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
            <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Patient Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patients..."
          className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border bg-card text-elder-sm focus:border-primary focus:outline-none"
        />
      </div>

      {/* Patient List */}
      <div className="space-y-2">
        {filteredPatients.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPatient(p)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
              selectedPatient.id === p.id ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">{p.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground">Age {p.age} • {p.lastVisit}</p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-foreground">{p.score}</p>
              <RiskBadge level={p.risk} size="sm" />
            </div>
          </button>
        ))}
      </div>

      {/* Longitudinal Cognitive Trend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-5 border border-border shadow-card"
      >
        <h2 className="font-display text-elder-lg font-semibold text-foreground mb-1">
          Longitudinal Trend – {selectedPatient.name}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">Cognitive biomarkers over time</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={longitudinalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,20%,90%)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(200,20%,90%)", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Line type="monotone" dataKey="cognitive" stroke="hsl(178,58%,38%)" strokeWidth={2} name="Cognitive" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="speech" stroke="hsl(210,70%,52%)" strokeWidth={2} name="Speech" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="eye" stroke="hsl(152,60%,40%)" strokeWidth={2} name="Eye" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="writing" stroke="hsl(38,92%,55%)" strokeWidth={2} name="Writing" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Behavioral Pattern Changes */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-5 border border-border shadow-card"
      >
        <h2 className="font-display text-elder-lg font-semibold text-foreground mb-4">Behavioral Pattern Changes</h2>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={behaviorData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,20%,90%)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(200,20%,90%)", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="before" fill="hsl(200,20%,85%)" name="Baseline" radius={[4, 4, 0, 0]} />
              <Bar dataKey="current" fill="hsl(178,58%,38%)" name="Current" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Risk Heatmap simplified */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-5 border border-border shadow-card"
      >
        <h2 className="font-display text-elder-lg font-semibold text-foreground mb-4">Risk Heatmap</h2>
        <div className="grid grid-cols-4 gap-2">
          {["Memory", "Attention", "Language", "Executive", "Visuospatial", "Speech", "Motor", "Processing"].map((domain, i) => {
            const risk = i === 7 || i === 2 ? "medium" : i === 5 ? "high" : "low";
            const bg = risk === "low" ? "bg-risk-low/20" : risk === "medium" ? "bg-risk-medium/20" : "bg-risk-high/20";
            const text = risk === "low" ? "text-risk-low" : risk === "medium" ? "text-risk-medium" : "text-risk-high";
            return (
              <div key={domain} className={`${bg} rounded-lg p-3 text-center`}>
                <p className={`text-xs font-semibold ${text}`}>{risk.toUpperCase()}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{domain}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Export */}
      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="flex-1 gap-2">
          <Download className="w-5 h-5" />
          Export Summary
        </Button>
        <Button variant="hero" size="lg" className="flex-1 gap-2">
          <FileText className="w-5 h-5" />
          Clinical Report
        </Button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
