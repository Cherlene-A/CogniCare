import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, ArrowLeft, CheckCircle2, Timer, Puzzle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    type: "memory",
    question: "Which of these words was shown earlier?",
    prompt: "Remember these words: Apple, Chair, Mountain",
    options: ["Apple", "Banana", "Orange", "Grape"],
    correct: 0,
  },
  {
    type: "attention",
    question: "What number comes next? 2, 4, 8, 16, __",
    options: ["20", "24", "32", "30"],
    correct: 2,
  },
  {
    type: "language",
    question: "Which word doesn't belong in this group?",
    options: ["Dog", "Cat", "Chair", "Bird"],
    correct: 2,
  },
  {
    type: "problem",
    question: "If today is Wednesday, what day was it 3 days ago?",
    options: ["Sunday", "Monday", "Saturday", "Tuesday"],
    correct: 0,
  },
];

const CognitiveTest = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showPrompt, setShowPrompt] = useState(true);
  const [completed, setCompleted] = useState(false);

  const q = questions[currentQ];

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ + 1 >= questions.length) {
      setCompleted(true);
    } else {
      setCurrentQ(currentQ + 1);
      if (questions[currentQ + 1].prompt) {
        setShowPrompt(true);
      }
    }
  };

  const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0), 0);

  if (completed) {
    return (
      <div className="py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <div>
            <h2 className="font-display text-elder-2xl font-bold text-foreground">Test Complete!</h2>
            <p className="text-muted-foreground mt-1">Cognitive assessment finished</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Your Score</p>
            <p className="text-5xl font-display font-extrabold text-primary">{score}/{questions.length}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {score === questions.length ? "Excellent!" : score >= questions.length / 2 ? "Good performance" : "Keep practicing"}
            </p>
          </div>
          <Button variant="hero" size="xl" className="w-full" onClick={() => navigate("/test")}>
            Back to Tests
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/test")} className="touch-target flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-elder-xl font-bold text-foreground">Cognitive Test</h1>
          <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
        </div>
        <VoicePromptButton label="Help" />
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-hero rounded-full"
          animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Prompt (for memory questions) */}
      {showPrompt && q.prompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-accent/5 rounded-2xl p-5 border border-accent/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <Puzzle className="w-5 h-5 text-accent" />
            <span className="font-semibold text-foreground">Memorize</span>
          </div>
          <p className="text-elder-lg font-medium text-foreground">{q.prompt}</p>
          <Button size="sm" className="mt-4" onClick={() => setShowPrompt(false)}>
            I'm Ready
          </Button>
        </motion.div>
      )}

      {(!q.prompt || !showPrompt) && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
              <p className="text-elder-lg font-display font-semibold text-foreground">{q.question}</p>
            </div>

            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full p-4 rounded-xl border-2 text-left text-elder-base font-medium transition-all touch-target ${
                    selected === i
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            <Button
              variant="hero"
              size="xl"
              className="w-full"
              disabled={selected === null}
              onClick={handleNext}
            >
              {currentQ + 1 === questions.length ? "Finish Test" : "Next Question"}
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CognitiveTest;
