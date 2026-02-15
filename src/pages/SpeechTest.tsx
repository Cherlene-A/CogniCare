import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";

const SpeechTest = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [completed, setCompleted] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setCompleted(true);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/test")} className="touch-target flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-elder-xl font-bold text-foreground">Speech Analysis</h1>
          <p className="text-sm text-muted-foreground">Estimated time: 3 minutes</p>
        </div>
        <VoicePromptButton label="Help" />
      </div>

      {/* Instructions */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
        <h2 className="font-display font-semibold text-elder-base text-foreground mb-3">Instructions</h2>
        <ul className="space-y-2">
          {[
            "Find a quiet place",
            "Tap the microphone button to start",
            "Read the text shown on screen clearly",
            "Speak at your normal pace",
          ].map((instruction, i) => (
            <li key={i} className="flex items-start gap-2 text-elder-sm text-foreground">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {instruction}
            </li>
          ))}
        </ul>
      </div>

      {/* Prompt Text */}
      <div className="bg-muted/50 rounded-2xl p-5 border border-border">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Read this aloud:</p>
        <p className="text-elder-lg text-foreground leading-relaxed font-medium">
          "The weather today is beautiful. I went to the market to buy some fresh vegetables and fruits. 
          My neighbor greeted me warmly on the way back home."
        </p>
      </div>

      {/* Recording Button */}
      <div className="flex flex-col items-center py-6">
        {completed ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <p className="font-display text-elder-lg font-semibold text-foreground">Recording Complete!</p>
            <p className="text-sm text-muted-foreground mt-1">AI is analyzing your speech patterns</p>
          </motion.div>
        ) : (
          <>
            <button
              onClick={toggleRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                isRecording
                  ? "bg-destructive shadow-elevated"
                  : "bg-gradient-hero shadow-soft hover:shadow-elevated"
              }`}
            >
              {isRecording && (
                <span className="absolute inset-0 rounded-full bg-destructive/30 animate-pulse-ring" />
              )}
              {isRecording ? (
                <MicOff className="w-10 h-10 text-destructive-foreground relative z-10" />
              ) : (
                <Mic className="w-10 h-10 text-primary-foreground relative z-10" />
              )}
            </button>
            <p className="text-elder-sm text-muted-foreground mt-4">
              {isRecording ? "Tap to stop recording" : "Tap to start recording"}
            </p>
            {isRecording && (
              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-destructive rounded-full"
                    animate={{ height: [8, 24, 8] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {completed && (
        <Button variant="hero" size="xl" className="w-full" onClick={() => navigate("/test/eye")}>
          Continue to Eye Tracking
        </Button>
      )}
    </div>
  );
};

export default SpeechTest;
