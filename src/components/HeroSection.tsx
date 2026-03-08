import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import fikaCup from "@/assets/fika-cup.png";
import heroBg from "@/assets/hero-bg.jpg";
import fikaLogo from "@/assets/fika-logo.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
      </div>

      {/* Warm glow decorations */}
      <div className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-accent/6 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-foreground mb-6">
              Grab.
              <br />
              <span className="text-primary">Sip.</span>
              <br />
              Go.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-md mb-10 leading-relaxed">
              Premium coffee, tea & snacks crafted for your pace. No waiting, no fuss — just great flavors that move with you.
            </p>

            <div className="flex gap-4">
              <Button
                variant="default"
                size="lg"
                className="text-base px-8 py-6 rounded-full font-body font-semibold shadow-lg shadow-primary/20"
                onClick={() => navigate("/order")}
              >
                Order Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 rounded-full font-body font-semibold border-border text-foreground hover:bg-muted"
                onClick={() => navigate("/menu")}
              >
                View Menu
              </Button>
            </div>
          </motion.div>

          {/* Animated branded coffee cup with FIKA TAKEAWAY above */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center justify-center relative"
          >
            <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

            {/* Logo above the cup */}
            <motion.img
              src={fikaLogo}
              alt="Fika Takeaway"
              className="w-56 md:w-64 lg:w-72 mb-6 relative z-10 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)] brightness-110"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />

            <motion.img
              src={fikaCup}
              alt="Fika Takeaway branded coffee cup"
              className="w-56 md:w-72 lg:w-[360px] drop-shadow-2xl relative z-10"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
