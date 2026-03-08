import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

type GalleryFilter = "all" | "drinks" | "food" | "vibes";

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", alt: "Barista pouring latte art", category: "drinks", span: "col-span-1 row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", alt: "Espresso close up", category: "drinks", span: "col-span-1 row-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80", alt: "Café interior warm light", category: "vibes", span: "col-span-1 row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", alt: "Coffee shop ambience", category: "vibes", span: "col-span-2 row-span-1" },
  { id: 5, src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80", alt: "Iced latte with straw", category: "drinks", span: "col-span-1 row-span-1" },
  { id: 6, src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80", alt: "Fresh croissants", category: "food", span: "col-span-1 row-span-1" },
  { id: 7, src: "https://images.unsplash.com/photo-1561339429-a98d8e22a0ef?w=800&q=80", alt: "Cappuccino art", category: "drinks", span: "col-span-1 row-span-2" },
  { id: 8, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Brownies on plate", category: "food", span: "col-span-1 row-span-1" },
  { id: 9, src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80", alt: "Cozy café corner", category: "vibes", span: "col-span-1 row-span-1" },
  { id: 10, src: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800&q=80", alt: "Matcha latte from above", category: "drinks", span: "col-span-1 row-span-1" },
  { id: 11, src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80", alt: "Blueberry muffin", category: "food", span: "col-span-1 row-span-1" },
  { id: 12, src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80", alt: "Coffee beans", category: "vibes", span: "col-span-2 row-span-1" },
];

const filters: { key: GalleryFilter; label: string }[] = [
  { key: "all", label: "✦ All" },
  { key: "drinks", label: "☕ Drinks" },
  { key: "food", label: "🥐 Food" },
  { key: "vibes", label: "✨ Vibes" },
];

export default function GalleryPage() {
  const [active, setActive] = useState<GalleryFilter>("all");
  const [lightbox, setLightbox] = useState<typeof photos[0] | null>(null);

  const filtered = active === "all" ? photos : photos.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-24 md:pt-36">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">Gallery</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-3 text-foreground">
              Life at <span className="text-primary">Fika</span>
            </h1>
            <p className="text-muted-foreground font-body mt-4 max-w-md mx-auto">
              Every cup has a story. Take a peek inside our world.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {filters.map((f) => (
              <button key={f.key} onClick={() => setActive(f.key)}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${active === f.key ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-2 md:columns-3 gap-4 space-y-4"
            >
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl"
                  onClick={() => setLightbox(photo)}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Instagram CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/20">
              <Instagram className="w-8 h-8 text-pink-500" />
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-1">Follow us on Instagram</h3>
                <p className="text-muted-foreground font-body text-sm">Tag us in your Fika moments @fikatakeaway</p>
              </div>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                @fikatakeaway
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10">
              <X className="w-5 h-5 text-white" />
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="max-h-[90vh] max-w-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FooterSection />
    </div>
  );
}
