import { useNavigate } from "react-router-dom";
import { Brain, Mic, Eye, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestCard from "@/components/TestCard";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";

const TestStart = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-elder-2xl font-bold text-foreground">Cognitive Tests</h1>
          <p className="text-muted-foreground">Complete all tests for best results</p>
        </div>
        <VoicePromptButton />
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-5 border border-border shadow-card"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">Today's Progress</p>
          <span className="text-sm text-primary font-semibold">1/4 Complete</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-hero rounded-full transition-all duration-500" style={{ width: "25%" }} />
        </div>
      </motion.div>

      {/* Test Cards */}
      <div className="space-y-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <TestCard
            icon={Brain}
            title="Cognitive Test"
            description="Memory, attention & problem-solving"
            duration="5 min"
            completed={true}
            onClick={() => navigate("/test/cognitive")}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <TestCard
            icon={Mic}
            title="Speech Analysis"
            description="Voice patterns & fluency assessment"
            duration="3 min"
            onClick={() => navigate("/test/speech")}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <TestCard
            icon={Eye}
            title="Eye Tracking"
            description="Visual attention & tracking stability"
            duration="4 min"
            onClick={() => navigate("/test/eye")}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <TestCard
            icon={PenTool}
            title="Writing Analysis"
            description="Handwriting patterns & motor control"
            duration="3 min"
            onClick={() => navigate("/test/writing")}
          />
        </motion.div>
      </div>

      <Button
        variant="hero"
        size="xl"
        className="w-full gap-2"
        onClick={() => navigate("/test/speech")}
      >
        Continue Next Test
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default TestStart;
