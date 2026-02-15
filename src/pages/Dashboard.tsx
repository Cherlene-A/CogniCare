import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Activity, Brain, CalendarDays, ArrowRight, Lightbulb, TrendingUp
} from "lucide-react";
import RiskBadge from "@/components/RiskBadge";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart
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
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(200, 20%, 90%)",
                  fontSize: "14px",
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="hsl(178, 58%, 38%)"
                strokeWidth={2.5}
                fill="url(#scoreGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
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
