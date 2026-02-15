import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import VoicePromptButton from "@/components/VoicePromptButton";

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-elder-2xl font-bold text-foreground">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isSignup ? "Join CogniCare today" : "Sign in to continue"}
          </p>
        </div>

        <VoicePromptButton className="mb-6 mx-auto flex" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border bg-card text-elder-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border bg-card text-elder-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-14 pl-12 pr-12 rounded-xl border-2 border-border bg-card text-elder-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button variant="hero" size="xl" className="w-full gap-2" type="submit">
            {isSignup ? "Create Account" : "Sign In"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            className="text-elder-sm text-primary font-medium touch-target"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8 leading-relaxed">
          ⚕️ CogniCare is a screening tool, not a medical diagnostic device.
        </p>
      </div>
    </div>
  );
};

export default Login;
