import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ArrowLeft, CheckCircle2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";

const EyeTrackingTest = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "tracking" | "done">("intro");
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });

  const startTracking = () => {
    setPhase("tracking");
    // Simulate dot movement
    let count = 0;
    const interval = setInterval(() => {
      setDotPosition({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      });
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setPhase("done");
      }
    }, 1200);
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/test")} className="touch-target flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-elder-xl font-bold text-foreground">Eye Tracking Test</h1>
          <p className="text-sm text-muted-foreground">Estimated time: 4 minutes</p>
        </div>
        <VoicePromptButton label="Help" />
      </div>

      {phase === "intro" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-elder-base text-foreground">How it works</h2>
                <p className="text-sm text-muted-foreground">Follow the moving dot</p>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                "Hold your device at arm's length",
                "A dot will appear and move around the screen",
                "Follow the dot with your eyes only",
                "Keep your head still",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-elder-sm text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Button variant="hero" size="xl" className="w-full" onClick={startTracking}>
            Start Eye Tracking
          </Button>
        </motion.div>
      )}

      {phase === "tracking" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-card rounded-2xl border border-border shadow-card overflow-hidden"
          style={{ height: "400px" }}
        >
          <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground z-10 bg-card/80 px-3 py-1.5 rounded-full">
            <Target className="w-4 h-4 text-primary" />
            Follow the dot
          </div>
          <motion.div
            className="absolute w-6 h-6 rounded-full bg-gradient-hero shadow-elevated"
            animate={{ left: `${dotPosition.x}%`, top: `${dotPosition.y}%` }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
          />
        </motion.div>
      )}

      {phase === "done" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <div>
            <h2 className="font-display text-elder-xl font-bold text-foreground">Test Complete!</h2>
            <p className="text-muted-foreground mt-1">Eye tracking data recorded successfully</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-card text-left">
            <h3 className="font-display font-semibold text-foreground mb-3">Preliminary Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking Accuracy</span>
                <span className="font-semibold text-foreground">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stability Score</span>
                <span className="font-semibold text-foreground">88/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Response Time</span>
                <span className="font-semibold text-foreground">Normal</span>
              </div>
            </div>
          </div>
          <Button variant="hero" size="xl" className="w-full" onClick={() => navigate("/test/writing")}>
            Continue to Writing Test
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EyeTrackingTest;
