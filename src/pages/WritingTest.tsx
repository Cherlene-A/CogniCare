import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PenTool, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion } from "framer-motion";

const WritingTest = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    ctx.strokeStyle = "hsl(210, 45%, 11%)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/test")} className="touch-target flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-elder-xl font-bold text-foreground">Writing Analysis</h1>
          <p className="text-sm text-muted-foreground">Estimated time: 3 minutes</p>
        </div>
        <VoicePromptButton label="Help" />
      </div>

      {!completed ? (
        <>
          {/* Drawing Area */}
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-primary" />
                <span className="font-display font-semibold text-foreground">Draw or write below</span>
              </div>
              <button onClick={clearCanvas} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground touch-target">
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
            </div>
            <canvas
              ref={canvasRef}
              width={350}
              height={200}
              className="w-full cursor-crosshair touch-none bg-background"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          </div>

          {/* Text Input */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <p className="text-sm text-muted-foreground mb-3">Or type the following sentence:</p>
            <p className="text-elder-base text-foreground font-medium mb-3 italic">
              "The quick brown fox jumps over the lazy dog"
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type here..."
              className="w-full h-24 p-3 rounded-xl border-2 border-border bg-background text-elder-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
            />
          </div>

          <Button
            variant="hero"
            size="xl"
            className="w-full"
            disabled={!hasDrawn && !text}
            onClick={() => setCompleted(true)}
          >
            Submit Writing Sample
          </Button>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <div>
            <h2 className="font-display text-elder-xl font-bold text-foreground">All Tests Complete!</h2>
            <p className="text-muted-foreground mt-1">Your results are being analyzed by AI</p>
          </div>
          <Button variant="hero" size="xl" className="w-full" onClick={() => navigate("/report")}>
            View Your Report
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default WritingTest;
