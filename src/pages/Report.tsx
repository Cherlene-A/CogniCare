import { useNavigate } from "react-router-dom";
import { FileText, Download, Stethoscope, ArrowLeft, TrendingUp, Eye, Mic, PenTool, Brain, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import RiskBadge from "@/components/RiskBadge";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Area, AreaChart
} from "recharts";

const trendData = [
  { date: "Jan", score: 72 },
  { date: "Feb", score: 75 },
  { date: "Mar", score: 74 },
  { date: "Apr", score: 78 },
  { date: "May", score: 80 },
  { date: "Jun", score: 82 },
  { date: "Jul", score: 85 },
  { date: "Aug", score: 83 },
  { date: "Sep", score: 87 },
];

const scores = [
  { icon: Brain, label: "Cognitive Score", value: "87/100", color: "text-primary" },
  { icon: Mic, label: "Speech Deviation", value: "Low", color: "text-success" },
  { icon: Eye, label: "Eye Tracking Stability", value: "92%", color: "text-primary" },
  { icon: PenTool, label: "Writing Analysis", value: "Normal", color: "text-success" },
];

const Report = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h1 className="font-display text-elder-2xl font-bold text-foreground">Risk Report</h1>
          <p className="text-muted-foreground">Last updated: Today</p>
        </div>
        <VoicePromptButton />
      </div>

      {/* Overall Risk */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-card text-center"
      >
        <p className="text-sm text-muted-foreground mb-2">Overall Risk Level</p>
        <RiskBadge level="low" size="lg" className="mx-auto" />
        <p className="text-5xl font-display font-extrabold text-foreground mt-4">87<span className="text-2xl text-muted-foreground">/100</span></p>
        <p className="text-sm text-muted-foreground mt-2">Composite Cognitive Score</p>
      </motion.div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-5 border border-border shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-elder-lg font-semibold text-foreground">Performance Over Time</h2>
          <TrendingUp className="w-5 h-5 text-success" />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(178, 58%, 38%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(178, 58%, 38%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 20%, 90%)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(200,20%,90%)", fontSize: "14px" }} />
              <Area type="monotone" dataKey="score" stroke="hsl(178, 58%, 38%)" strokeWidth={2.5} fill="url(#reportGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Individual Scores */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h2 className="font-display text-elder-lg font-semibold text-foreground">Detailed Scores</h2>
        {scores.map((s) => (
          <div key={s.label} className="bg-card rounded-xl p-4 border border-border shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="font-display font-semibold text-elder-base text-foreground">{s.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* AI Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-accent/5 rounded-2xl p-5 border border-accent/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-accent" />
          <h3 className="font-display font-semibold text-foreground">Personalized Explanation</h3>
        </div>
        <p className="text-elder-sm text-foreground leading-relaxed">
          Your cognitive scores are within normal range and show a positive upward trend over the past 9 months. 
          Memory recall and attention scores have improved consistently. Speech patterns remain stable with no 
          significant deviations detected. Eye tracking shows good visual attention control.
        </p>
      </motion.div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="flex-1 gap-2">
          <Download className="w-5 h-5" />
          Download PDF
        </Button>
        <Button variant="hero" size="lg" className="flex-1 gap-2" onClick={() => navigate("/doctor")}>
          <Stethoscope className="w-5 h-5" />
          Consult Doctor
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        ⚕️ These results are for screening purposes only and do not constitute a medical diagnosis.
      </p>
    </div>
  );
};

export default Report;
