import { Brain, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        {/* Logo */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-hero flex items-center justify-center mx-auto mb-8 shadow-elevated">
          <Brain className="w-12 h-12 text-primary-foreground" />
        </div>

        <h1 className="font-display text-elder-3xl font-extrabold text-foreground mb-3">
          CogniCare
        </h1>
        <p className="text-elder-base text-muted-foreground mb-2">
          AI-Powered Cognitive Health Monitoring
        </p>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mb-12 mt-8">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
            <Shield className="w-4 h-4 text-success" />
            HIPAA Secure
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
            <Heart className="w-4 h-4 text-destructive" />
            Clinically Validated
          </div>
        </div>

        <div className="space-y-3 max-w-xs mx-auto">
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={() => navigate("/onboarding")}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            I already have an account
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-8 max-w-xs mx-auto leading-relaxed">
          ⚕️ This is a screening tool, not a medical diagnosis. Always consult a healthcare professional.
        </p>
      </motion.div>
    </div>
  );
};

export default Splash;
