import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Activity, Brain, CalendarDays, ArrowRight, Lightbulb, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Minus, Clock, Target
} from "lucide-react";
import RiskBadge from "@/components/RiskBadge";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";
import {
  XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart
} from "recharts";

const weeklyData = [
  { day: "Mon", score: 78 },
  { day: "Tue", score: 82 },
  { day: "Wed", score: 75 },
  { day: "Thu", score: 80 },
  { day: "Fri", score: 85 },
  { day: "Sat", score: 83 },
  { day: "Sun", score: 87 },
];

const timelineData = [
  { date: "Today", score: 87, change: 4, tests: ["Cognitive", "Speech"] },
  { date: "Yesterday", score: 83, change: -2, tests: ["Eye Tracking"] },
  { date: "2 days ago", score: 85, change: 5, tests: ["Cognitive", "Writing"] },
  { date: "3 days ago", score: 80, change: 0, tests: ["Speech"] },
  { date: "4 days ago", score: 80, change: 2, tests: ["Cognitive"] },
];

const baselineComparison = {
  baseline: 76,
  current: 87,
  deviation: +11,
  status: "above" as const,
};

const TrendArrow = ({ change }: { change: number }) => {
  if (change > 0) return <ArrowUpRight className="w-4 h-4 text-success" />;
  if (change < 0) return <ArrowDownRight className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6 space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-muted-foreground text-sm">Good Morning 👋</p>
            <h1 className="font-display text-elder-2xl font-bold text-foreground">Welcome back</h1>
          </div>
          <VoicePromptButton />
        </div>
      </motion.div>

      {/* Today's Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-hero rounded-2xl p-6 text-primary-foreground shadow-elevated"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-primary-foreground/70 text-sm font-medium">Today's Cognitive Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-5xl font-display font-extrabold">87</span>
              <span className="text-primary-foreground/70 text-lg">/100</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Brain className="w-7 h-7" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RiskBadge level="low" size="md" className="bg-primary-foreground/20 text-primary-foreground" />
          <div className="flex items-center gap-1 text-sm text-primary-foreground/80">
            <TrendingUp className="w-4 h-4" />
            <span>+2 from last week</span>
          </div>
        </div>
      </motion.div>

      {/* Baseline Comparison Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 border border-border shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="font-display text-elder-lg font-semibold text-foreground">Baseline Comparison</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-xs text-muted-foreground mb-1">Your Baseline</p>
            <p className="text-2xl font-display font-bold text-muted-foreground">{baselineComparison.baseline}</p>
          </div>
          <div className="flex flex-col items-center px-4">
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
              baselineComparison.deviation >= 0
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}>
              {baselineComparison.deviation >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {baselineComparison.deviation >= 0 ? "+" : ""}{baselineComparison.deviation}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">deviation</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-xs text-muted-foreground mb-1">Current</p>
            <p className="text-2xl font-display font-bold text-foreground">{baselineComparison.current}</p>
          </div>
        </div>
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-hero rounded-full transition-all"
            style={{ width: `${(baselineComparison.current / 100) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Performing <span className="text-success font-medium">above baseline</span> — no areas of concern
        </p>
      </motion.div>

      {/* Weekly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-5 border border-border shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-elder-lg font-semibold text-foreground">Weekly Trend</h2>
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(178, 58%, 38%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(178, 58%, 38%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis domain={[60, 100]} hide />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid hsl(200, 20%, 90%)", fontSize: "14px" }} />
              <Area type="monotone" dataKey="score" stroke="hsl(178, 58%, 38%)" strokeWidth={2.5} fill="url(#scoreGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Day-by-Day Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-2xl p-5 border border-border shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="font-display text-elder-lg font-semibold text-foreground">Day-by-Day Timeline</h2>
        </div>
        <div className="space-y-0">
          {timelineData.map((day, i) => (
            <div key={day.date} className="flex gap-3">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full shrink-0 ${i === 0 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                {i < timelineData.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
              </div>
              {/* Content */}
              <div className={`pb-4 flex-1 ${i === 0 ? "" : "opacity-80"}`}>
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>{day.date}</p>
                  <div className="flex items-center gap-1">
                    <TrendArrow change={day.change} />
                    <span className={`text-sm font-semibold ${
                      day.change > 0 ? "text-success" : day.change < 0 ? "text-destructive" : "text-muted-foreground"
                    }`}>
                      {day.score}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  {day.tests.map((t) => (
                    <span key={t} className="text-[10px] bg-muted px-2 py-0.5 rounded-md text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="bg-card rounded-xl p-4 border border-border shadow-card">
          <CalendarDays className="w-5 h-5 text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Last Test</p>
          <p className="font-display font-semibold text-foreground">Today</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border shadow-card">
          <Activity className="w-5 h-5 text-accent mb-2" />
          <p className="text-xs text-muted-foreground">Tests This Month</p>
          <p className="font-display font-semibold text-foreground">12</p>
        </div>
      </motion.div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-accent/5 rounded-2xl p-5 border border-accent/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h3 className="font-display font-semibold text-foreground">AI Insight</h3>
        </div>
        <p className="text-elder-sm text-foreground leading-relaxed">
          Your cognitive performance has been stable this week. Memory recall scores improved by 5%. 
          Continue daily exercises to maintain your baseline. No areas of concern detected.
        </p>
      </motion.div>

      {/* Workflow Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="bg-card rounded-2xl p-4 border border-border shadow-card"
      >
        <p className="text-xs text-muted-foreground mb-3 font-medium">Assessment Pipeline</p>
        <div className="flex items-center justify-between">
          {["Test", "AI Analysis", "Deviation", "Risk", "Alert"].map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`flex flex-col items-center`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i <= 3 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                <span className="text-[9px] text-muted-foreground mt-1 text-center leading-tight">{step}</span>
              </div>
              {i < 4 && <div className={`w-4 h-0.5 mx-0.5 mb-4 ${i <= 2 ? "bg-primary/30" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Start Test CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          variant="hero"
          size="xl"
          className="w-full gap-2"
          onClick={() => navigate("/test")}
        >
          Start Assessment
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Medical Disclaimer */}
      <p className="text-xs text-muted-foreground text-center leading-relaxed pb-2">
        ⚕️ CogniCare is a screening tool. Results do not constitute medical diagnosis.
      </p>
    </div>
  );
};

export default Dashboard;
