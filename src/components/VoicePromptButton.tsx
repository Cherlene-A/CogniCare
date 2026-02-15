import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoicePromptButtonProps {
  label?: string;
  className?: string;
}

const VoicePromptButton = ({ label = "Listen", className }: VoicePromptButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`gap-2 border-primary/20 text-primary hover:bg-primary/5 ${className}`}
      onClick={() => {
        // Voice prompt placeholder
      }}
    >
      <Volume2 className="w-4 h-4" />
      {label}
    </Button>
  );
};

export default VoicePromptButton;
