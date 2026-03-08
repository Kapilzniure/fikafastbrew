import { motion } from "framer-motion";
import { Coffee, Clock, Coins } from "lucide-react";
import fikaCup from "@/assets/fika-cup.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background branded cup watermark */}
      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 pointer-events-none">
        <img src={fikaCup} alt="" className="w-80 opacity-[0.03] dark:opacity-[0.05] select-none" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight text-foreground">
              Coffee Made for
              <br />
              <span className="text-primary">Busy Lives</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-body max-w-lg">
              Fika Takeaway isn't just coffee — it's your daily ritual, simplified. We believe great coffee shouldn't slow you down. Our drinks are crafted with premium beans, prepared fast, and priced fairly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 gap-5"
          >
            {[
              { icon: Clock, title: "Ready in Under 2 Minutes", desc: "Speed is in our DNA. Your coffee is ready before you finish checking your phone." },
              { icon: Coins, title: "Affordable Every Day", desc: "Premium quality without the premium price tag. Coffee that respects your budget." },
              { icon: Coffee, title: "Quality You Can Taste", desc: "Ethically sourced beans, expertly roasted, and brewed to perfection every single time." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="flex gap-5 p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 text-base">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
