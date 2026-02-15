import { Globe, Gamepad2, Cpu, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: Globe,
    title: "Select Your Language",
    description: "Choose from multiple vernacular languages for comfortable testing in your native tongue.",
  },
  {
    num: "02",
    icon: Gamepad2,
    title: "Complete Cognitive Tasks",
    description: "Engage with gamified memory, attention, language, and problem-solving exercises.",
  },
  {
    num: "03",
    icon: Cpu,
    title: "AI Analysis",
    description: "Advanced algorithms analyze performance, speech patterns, and reaction times in real-time.",
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Get Risk Score",
    description: "Receive comprehensive risk assessment with detailed breakdown and actionable recommendations.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple four-step process to assess cognitive health with clinical-grade accuracy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="text-6xl font-display font-extrabold text-primary/10 mb-4">
                {step.num}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 text-primary/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
