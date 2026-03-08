import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah K.", role: "University Student", rating: 5, initials: "SK", color: "bg-amber-500",
    text: "Fika Takeaway is my morning lifesaver. I grab my cold brew between classes — it's fast, affordable, and tastes amazing every time." },
  { name: "James L.", role: "Software Engineer", rating: 5, initials: "JL", color: "bg-blue-500",
    text: "Finally a coffee shop that respects my time. Under 2 minutes and the quality rivals any premium café. Obsessed with the cappuccino." },
  { name: "Priya M.", role: "Marketing Manager", rating: 5, initials: "PM", color: "bg-green-500",
    text: "The matcha latte is incredible. I've tried dozens and Fika's is hands-down the best. Plus the price point is unbeatable." },
  { name: "David R.", role: "Freelance Designer", rating: 5, initials: "DR", color: "bg-purple-500",
    text: "I used to spend a fortune on lattes every day. Fika Takeaway gives me better coffee at half the price. My wallet and taste buds are happy." },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-foreground">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            <span className="ml-2 font-body text-muted-foreground text-sm">4.9 / 5 from 200+ reviews</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col">
              <Quote className="w-7 h-7 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-5 flex-1">"{t.text}"</p>
              <div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white font-body font-bold text-sm flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground font-body text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
