import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { menuItems, categories, type MenuCategory } from "@/data/menuData";
import fikaCup from "@/assets/fika-cup.png";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useCart, entryPrice, defaultCustomization } from "@/context/CartContext";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "popular">("popular");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { addEntry, entries, totalItems, totalPrice } = useCart();

  const [recentlyAdded, setRecentlyAdded] = useState<Set<number>>(new Set());

  const handleAdd = (id: number) => {
    const item = menuItems.find(m => m.id === id)!;
    addEntry(id, defaultCustomization(item.canBeIced));
    setRecentlyAdded((prev) => new Set(prev).add(id));
    setTimeout(() => setRecentlyAdded(prev => { const n = new Set(prev); n.delete(id); return n; }), 1400);
  };

  const filtered = useMemo(() => {
    let list = activeCategory === "popular"
      ? menuItems.filter(i => i.tag === "Popular" || i.tag === "Best Seller")
      : menuItems.filter(i => i.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.length ? list.filter(i => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q))
        : menuItems.filter(i => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  const allCategories = [
    { key: "popular" as const, label: "⭐ Popular" },
    ...categories,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={totalItems} onCartClick={() => navigate("/order")} />

      <section className="pt-28 pb-24 md:pt-36 md:pb-32 bg-card relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none">
          <img src={fikaCup} alt="" className="w-96 opacity-[0.03] dark:opacity-[0.05] select-none" />
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-10">
            <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">Our Menu</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-3 text-foreground">
              Crafted with <span className="text-primary">Care</span>
            </h1>
            <p className="text-muted-foreground font-body mt-4 max-w-md mx-auto">
              Browse our full menu. Tap any item for customization options.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drinks, food..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {allCategories.map((cat) => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${activeCategory === cat.key ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + search} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {filtered.length === 0 ? (
                <div className="col-span-3 text-center py-16">
                  <p className="text-muted-foreground font-body">No items found for "{search}"</p>
                  <button onClick={() => setSearch("")} className="mt-3 text-primary font-body text-sm hover:underline">Clear search</button>
                </div>
              ) : filtered.map((item, i) => {
                const inCart = entries.filter(e => e.itemId === item.id).reduce((a, e) => a + e.qty, 0);
                const justAdded = recentlyAdded.has(item.id);
                return (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}
                    className={`group bg-background rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${inCart > 0 ? "border-primary/40" : "border-border hover:border-primary/30"}`}>
                    <Link to={`/menu/${item.id}`} className="relative h-48 bg-muted/30 flex items-center justify-center overflow-hidden block">
                      <img src={item.image} alt={item.name} className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-500" />
                      {item.tag && (
                        <span className="absolute top-3 left-3 text-xs font-body font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">{item.tag}</span>
                      )}
                      {inCart > 0 && (
                        <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{inCart}</span>
                      )}
                    </Link>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Link to={`/menu/${item.id}`}>
                          <h3 className="font-display font-bold text-lg text-foreground leading-tight hover:text-primary transition-colors">{item.name}</h3>
                        </Link>
                        <span className="text-lg font-bold text-primary whitespace-nowrap">रु {item.price}</span>
                      </div>
                      <p className="text-muted-foreground font-body text-sm mb-4">{item.desc}</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleAdd(item.id)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-300 ${justAdded ? "bg-green-600 text-white" : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"}`}>
                          {justAdded ? "✓ Added!" : "+ Quick Add"}
                        </button>
                        <Link to={`/menu/${item.id}`}
                          className="px-3 py-2.5 rounded-xl border border-border font-body text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all">
                          Customize
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Floating cart */}
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                <button onClick={() => navigate("/order")}
                  className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-full shadow-xl shadow-primary/30 font-body font-semibold text-sm hover:bg-primary/90 transition-colors whitespace-nowrap">
                  <ShoppingBag className="w-4 h-4" />
                  {totalItems} item{totalItems > 1 ? "s" : ""} — View & Checkout
                  <span className="font-display font-bold">रु {totalPrice}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
