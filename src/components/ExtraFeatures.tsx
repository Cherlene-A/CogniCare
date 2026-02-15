import { Watch, FileText, Video, Stethoscope, ShieldCheck, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const extras = [
  {
    icon: Watch,
    title: "Wearable Device Monitoring",
    description: "Integration with smartwatches and IoT devices to track sleep patterns, activity levels, and physiological markers that correlate with cognitive decline.",
    badge: "IoT",
  },
  {
    icon: FileText,
    title: "EHR Integration",
    description: "Seamless connection with Electronic Health Records for comprehensive patient profiles and longitudinal cognitive data sharing with healthcare providers.",
    badge: "Healthcare",
  },
  {
    icon: Video,
    title: "Telemedicine Support",
    description: "Built-in video consultations enabling remote follow-ups with neurologists and geriatric specialists based on assessment outcomes.",
    badge: "Telehealth",
  },
  {
    icon: Stethoscope,
    title: "Clinical Dashboard",
    description: "Professional dashboard for healthcare providers to monitor patient cohorts, compare baselines, and generate clinical reports for diagnosis support.",
    badge: "Pro",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA-Compliant Security",
    description: "End-to-end encryption, role-based access control, and audit trails ensuring all patient data meets healthcare compliance standards.",
    badge: "Security",
  },
  {
    icon: Smartphone,
    title: "Offline-First Mobile App",
    description: "Progressive web app that works offline in rural and low-connectivity areas, syncing results when connection is available.",
    badge: "Mobile",
  },
];

const ExtraFeatures = () => {
  return (
    <section id="about" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Extended Capabilities
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Beyond Basic Detection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced integrations and features that make ManaScope a complete ecosystem for dementia care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {extras.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover border border-border hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-gradient-accent transition-all duration-300">
                  <item.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {item.badge}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraFeatures;
