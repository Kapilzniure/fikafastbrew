import { motion } from "framer-motion";
import { Zap, BadgeDollarSign, Bean, Briefcase } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Service",
    desc: "Grab your coffee in under 2 minutes. No queues, no delays.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Price",
    desc: "Great taste doesn't have to cost a fortune. Quality for less.",
  },
  {
    icon: Bean,
    title: "Quality Beans",
    desc: "Single-origin, ethically sourced, freshly roasted every week.",
  },
  {
    icon: Briefcase,
    title: "Perfect for Busy Days",
    desc: "Designed for people on the move. Your pace, your coffee.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">Why Fika Takeaway</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Why Choose <span className="text-primary">Us</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group text-center p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <f.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
