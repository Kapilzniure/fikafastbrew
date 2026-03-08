import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const teaserPhotos = [
  { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", alt: "Barista latte art", className: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80", alt: "Espresso shot" },
  { src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80", alt: "Fresh pastries" },
  { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80", alt: "Café ambience" },
];

export default function GalleryTeaser() {
  return (
    <section className="py-24 md:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">Gallery</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6 text-foreground">
              Life at <span className="text-primary">Fika</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-8 max-w-sm">
              Peek inside our world. Every cup, every corner, every moment — crafted with intention and served with warmth.
            </p>
            <Link to="/gallery"
              className="inline-flex items-center gap-2 font-body font-semibold text-primary hover:gap-3 transition-all group">
              See Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-3 grid-rows-2 gap-3 h-80">
            {teaserPhotos.map((p, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img src={p.src} alt={p.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
