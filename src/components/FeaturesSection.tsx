import { Brain, Languages, TrendingUp, AlertTriangle, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze cognitive performance, speech patterns, and behavioral markers for accurate detection.",
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Tests available in multiple vernacular languages ensuring accessibility for diverse populations.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor cognitive health over time with detailed analytics, trend visualization and performance baselines.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Assessment",
    description: "Comprehensive risk scoring with low, medium, and high classifications backed by explainable AI.",
  },
  {
    icon: Clock,
    title: "Early Detection",
    description: "Identify deviations from baseline performance early for timely clinical intervention and care planning.",
  },
  {
    icon: Users,
    title: "Caregiver Integration",
    description: "Keep families informed with automated alerts, progress reports, and telemedicine scheduling.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive Detection Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines multiple AI-driven approaches to provide the most accurate cognitive health assessment available.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
