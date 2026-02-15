import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Globe, CheckCircle2, ArrowRight, Info } from "lucide-react";
import VoicePromptButton from "@/components/VoicePromptButton";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
];

const steps = [
  { id: "language", title: "Choose Your Language" },
  { id: "consent", title: "Your Privacy Matters" },
  { id: "baseline", title: "How It Works" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState("en");
  const [consentGiven, setConsentGiven] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      <VoicePromptButton className="self-end mb-4" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="lang"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-elder-2xl font-bold text-foreground">{steps[0].title}</h1>
                <p className="text-muted-foreground">Select your preferred language</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`p-4 rounded-xl border-2 text-left transition-all touch-target ${
                    selectedLang === lang.code
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <p className="font-display font-semibold text-elder-base text-foreground">{lang.native}</p>
                  <p className="text-sm text-muted-foreground">{lang.label}</p>
                </button>
              ))}
            </div>

            <Button variant="hero" size="xl" className="w-full mt-8 gap-2" onClick={() => setStep(1)}>
              Continue <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="consent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <h1 className="font-display text-elder-2xl font-bold text-foreground mb-2">{steps[1].title}</h1>
            <p className="text-elder-base text-muted-foreground mb-6">We take your data privacy seriously</p>

            <div className="space-y-4 mb-8">
              {[
                "Your data is encrypted end-to-end",
                "We never share data without your consent",
                "You can delete your data anytime",
                "Results are for screening purposes only",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <p className="text-elder-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>

            <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-border bg-card cursor-pointer touch-target mb-6">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="w-6 h-6 rounded-md border-2 border-primary accent-primary mt-0.5"
              />
              <span className="text-elder-sm text-foreground">
                I agree to the terms and consent to cognitive health screening
              </span>
            </label>

            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(0)}>Back</Button>
              <Button
                variant="hero"
                size="lg"
                className="flex-1 gap-2"
                disabled={!consentGiven}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="baseline"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <h1 className="font-display text-elder-2xl font-bold text-foreground mb-2">{steps[2].title}</h1>
            <p className="text-elder-base text-muted-foreground mb-8">We create your personal baseline</p>

            <div className="space-y-4 mb-8">
              {[
                { num: "1", title: "Take Initial Tests", desc: "Complete a series of fun cognitive exercises" },
                { num: "2", title: "We Learn Your Baseline", desc: "AI establishes your personal cognitive profile" },
                { num: "3", title: "Regular Monitoring", desc: "Track changes from your baseline over time" },
                { num: "4", title: "Early Alerts", desc: "Get notified if deviations are detected" },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-bold">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-elder-base text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 p-3 rounded-lg flex items-start gap-2 mb-6">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                This tool is for screening only. It does not diagnose any condition. Always consult a doctor.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button variant="hero" size="xl" className="flex-1" onClick={() => navigate("/login")}>
                Create Account
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
