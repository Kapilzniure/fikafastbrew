import { motion } from "framer-motion";
import { Coffee, Clock, Coins, MapPin, Users, Heart, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const stats = [
  { label: "Cups Served Daily", value: "500+", icon: Coffee },
  { label: "Minutes Per Order", value: "< 2", icon: Clock },
  { label: "Menu Items", value: "14", icon: Award },
  { label: "Happy Customers", value: "10k+", icon: Users },
];

const team = [
  { name: "Aarav Sharma", role: "Founder & Head Barista", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Priya Thapa", role: "Head of Operations", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Rohan KC", role: "Lead Barista", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — split layout */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">About Us</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6 leading-tight text-foreground">
                Coffee Made for<br /><span className="text-primary">Busy Lives</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed font-body mb-6">
                Fika Takeaway isn't just coffee — it's your daily ritual, simplified. We believe great coffee shouldn't slow you down. Our drinks are crafted with premium beans, prepared fast, and priced fairly.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body mb-8">
                Born in the heart of Kathmandu, we saw busy students and professionals waiting too long for overpriced coffee. We said enough — and built something better.
              </p>
              <Link to="/order"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Order Now →
              </Link>
            </motion.div>

            {/* Right: barista photo */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85"
                  alt="Barista making coffee"
                  className="w-full h-full object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Coffee className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground text-sm">500+ cups</p>
                      <p className="text-muted-foreground font-body text-xs">crafted every day</p>
                    </div>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                  <span className="text-2xl">☕</span>
                </div>
              </div>
              {/* Floating stat card */}
              <div className="absolute -right-4 top-1/3 bg-card border border-border rounded-2xl p-4 shadow-2xl hidden lg:block">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="font-body text-xs font-semibold text-green-600">Growing fast</span>
                </div>
                <p className="font-display font-bold text-xl text-foreground">10,000+</p>
                <p className="font-body text-xs text-muted-foreground">happy customers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <s.icon className="w-6 h-6 text-primary-foreground/60 mx-auto mb-2" />
                <p className="font-display font-bold text-3xl text-primary-foreground">{s.value}</p>
                <p className="font-body text-sm text-primary-foreground/70 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why <span className="text-primary">Fika?</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: Clock, title: "Ready in Under 2 Minutes", desc: "Speed is in our DNA. Your coffee is ready before you finish checking your phone." },
              { icon: Coins, title: "Affordable Every Day", desc: "Premium quality without the premium price tag. Coffee that respects your budget." },
              { icon: Coffee, title: "Quality You Can Taste", desc: "Ethically sourced beans, expertly roasted, and brewed to perfection." },
              { icon: MapPin, title: "Convenient Locations", desc: "Strategically placed near colleges, offices, and transit hubs for easy access." },
              { icon: Users, title: "Community First", desc: "We support local farmers and give back to the communities we serve." },
              { icon: Heart, title: "Made with Love", desc: "Every cup is crafted with care by our passionate baristas." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-xl bg-background border border-border hover:border-primary/20 transition-all duration-300">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 text-base">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meet the <span className="text-primary">Team</span></h2>
            <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto">The passionate people behind every perfect cup.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-display font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-body text-sm mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
