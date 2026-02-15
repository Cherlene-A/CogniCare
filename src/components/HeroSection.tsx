import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import heroBrain from "@/assets/hero-brain.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Advanced Dementia Detection System
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Assess Cognitive Health{" "}
              <span className="text-gradient-primary">Through AI-Powered</span>{" "}
              Testing
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Comprehensive cognitive assessment through gamified tasks, speech analysis, 
              and behavioral monitoring. Supporting multiple languages with explainable AI scoring.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity gap-2 px-8">
                Start Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8">
                Healthcare Login
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Tests Completed</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">12+</p>
                <p className="text-sm text-muted-foreground">Languages</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft animate-float">
              <img
                src={heroBrain}
                alt="AI Brain neural network visualization for cognitive health analysis"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
