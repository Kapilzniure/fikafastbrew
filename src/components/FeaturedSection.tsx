import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { menuItems } from "@/data/menuData";
import { useCart, defaultCustomization } from "@/context/CartContext";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

const featured = menuItems.filter(i => i.tag === "Best Seller" || i.tag === "Popular").slice(0, 4);

export default function FeaturedSection() {
  const { addEntry } = useCart();
  const [added, setAdded] = useState<Set<number>>(new Set());

  const handleAdd = (id: number) => {
    const item = menuItems.find(m => m.id === id)!;
    addEntry(id, defaultCustomization(item.canBeIced));
    setAdded(prev => new Set(prev).add(id));
    setTimeout(() => setAdded(prev => { const n = new Set(prev); n.delete(id); return n; }), 1400);
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">Fan Favourites</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 text-foreground">Most <span className="text-primary">Loved</span></h2>
          </div>
          <Link to="/menu" className="hidden md:flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-primary transition-colors">
            Full Menu →
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <Link to={`/menu/${item.id}`} className="relative h-44 bg-muted/30 flex items-center justify-center overflow-hidden block">
                <img src={item.image} alt={item.name} className="w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-500" />
                {item.tag && (
                  <span className="absolute top-3 left-3 text-xs font-body font-semibold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">{item.tag}</span>
                )}
              </Link>
              <div className="p-4">
                <h3 className="font-display font-bold text-foreground mb-0.5">{item.name}</h3>
                <p className="text-muted-foreground font-body text-xs mb-3">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">रु {item.price}</span>
                  <button onClick={() => handleAdd(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-semibold transition-all ${added.has(item.id) ? "bg-green-600 text-white" : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"}`}>
                    <ShoppingBag className="w-3 h-3" />
                    {added.has(item.id) ? "Added!" : "Add"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/menu" className="font-body text-sm text-primary hover:underline">See Full Menu →</Link>
        </div>
      </div>
    </section>
  );
}
