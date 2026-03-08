import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import fikaCup from "@/assets/fika-cup.png";

const CtaSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-accent relative overflow-hidden">
      {/* Background branded cup watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none">
        <img src={fikaCup} alt="" className="w-80 opacity-10 select-none" />
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent-foreground/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent-foreground/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-accent-foreground mb-6 leading-tight">
            Start Your Day
            <br />
            with Fika
          </h2>
          <p className="text-accent-foreground/80 text-lg font-body mb-10 leading-relaxed">
            Life moves fast. Your coffee should too. Order now and experience the difference.
          </p>
          <Button
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 text-base px-10 py-6 rounded-full font-body font-semibold shadow-xl group"
          >
            Order Your Coffee
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
