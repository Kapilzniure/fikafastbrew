import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Flame, Snowflake, Star, ChevronRight, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/data/menuData";
import { useCart, defaultCustomization, entryPrice, CartCustomization } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const SIZE_OPTIONS: { key: "S" | "M" | "L"; label: string; desc: string }[] = [
  { key: "S", label: "Small", desc: "-रु 50" },
  { key: "M", label: "Regular", desc: "Base" },
  { key: "L", label: "Large", desc: "+रु 100" },
];
const MILK_OPTIONS = ["Regular", "Oat", "Almond", "Soy"];
const SUGAR_OPTIONS = ["None", "Less", "Normal", "Extra"];

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addEntry, totalItems } = useCart();

  const item = menuItems.find((m) => m.id === Number(id));

  const [customization, setCustomization] = useState<CartCustomization>(() =>
    item ? defaultCustomization(item.canBeIced) : defaultCustomization(false)
  );
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "ingredients">("details");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (item) setCustomization(defaultCustomization(item.canBeIced));
  }, [id]);

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-muted-foreground font-body text-lg mb-4">Item not found</p>
        <Button onClick={() => navigate("/menu")} variant="outline" className="rounded-full font-body">Back to Menu</Button>
      </div>
    </div>
  );

  const related = menuItems.filter((m) => m.category === item.category && m.id !== item.id).slice(0, 3);
  const finalPrice = entryPrice(item, customization);

  const handleAdd = () => {
    addEntry(item.id, customization);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const patch = (p: Partial<CartCustomization>) => setCustomization((c) => ({ ...c, ...p }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={totalItems} onCartClick={() => navigate("/order")} />

      <div className="pt-20 pb-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 lg:px-16 py-4">
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="capitalize">{item.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{item.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-border aspect-square flex items-center justify-center">
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-80 h-80 rounded-full border border-primary/10" />
                  <div className="absolute w-56 h-56 rounded-full border border-primary/8" />
                </div>
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-72 h-72 object-contain relative z-10 drop-shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                {item.tag && (
                  <span className="absolute top-5 left-5 bg-primary text-primary-foreground text-xs font-body font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {item.tag}
                  </span>
                )}
                <div className="absolute bottom-5 right-5 bg-background/80 backdrop-blur-sm border border-border rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span className="font-body text-xs font-semibold text-foreground">{item.calories} cal</span>
                </div>
              </div>

              {/* Back button */}
              <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 w-9 h-9 bg-background/80 backdrop-blur-sm border border-border rounded-xl flex items-center justify-center hover:bg-muted transition-colors z-20"
              >
                <ArrowLeft className="w-4 h-4 text-foreground" />
              </button>
            </motion.div>

            {/* RIGHT: Details + Customization */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-body text-muted-foreground uppercase tracking-wider capitalize">{item.category}</span>
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{item.name}</h1>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">{item.longDesc}</p>

              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6 w-fit">
                {(["details", "ingredients"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg font-body text-sm font-medium transition-all capitalize ${activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "details" ? (
                  <motion.div key="details" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mb-6">
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
                      <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-muted-foreground">Prices shown include size adjustment. Customizations are included free.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="ingredients" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mb-6 space-y-3">
                    <div>
                      <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ingredients</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.ingredients.map((ing) => (
                          <span key={ing} className="px-2.5 py-1 bg-muted rounded-full font-body text-xs text-foreground border border-border">{ing}</span>
                        ))}
                      </div>
                    </div>
                    {item.allergens.length > 0 && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-body text-xs font-semibold text-amber-600 dark:text-amber-400 mb-0.5">Allergens</p>
                          <p className="font-body text-xs text-muted-foreground">{item.allergens.join(", ")}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Size ── */}
              <div className="mb-5">
                <p className="font-body text-sm font-semibold text-foreground mb-2.5">Size</p>
                <div className="flex gap-2">
                  {SIZE_OPTIONS.map((s) => (
                    <button key={s.key} onClick={() => patch({ size: s.key })}
                      className={`flex-1 py-3 rounded-xl border text-center transition-all font-body ${customization.size === s.key ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40"}`}>
                      <div className="font-bold text-sm">{s.label}</div>
                      <div className="text-xs opacity-70">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Hot / Iced ── */}
              {item.canBeIced && (
                <div className="mb-5">
                  <p className="font-body text-sm font-semibold text-foreground mb-2.5">Temperature</p>
                  <div className="flex gap-2">
                    {(["hot", "iced"] as const).map((temp) => (
                      <button key={temp} onClick={() => patch({ temp })}
                        className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-body font-medium text-sm transition-all ${customization.temp === temp ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40"}`}>
                        {temp === "hot" ? <Flame className="w-4 h-4" /> : <Snowflake className="w-4 h-4" />}
                        {temp === "hot" ? "Hot" : "Iced"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Milk ── */}
              <div className="mb-5">
                <p className="font-body text-sm font-semibold text-foreground mb-2.5">Milk</p>
                <div className="flex gap-2 flex-wrap">
                  {MILK_OPTIONS.map((m) => (
                    <button key={m} onClick={() => patch({ milk: m })}
                      className={`px-4 py-2 rounded-full border font-body text-sm transition-all ${customization.milk === m ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:border-primary/40"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Sugar ── */}
              <div className="mb-5">
                <p className="font-body text-sm font-semibold text-foreground mb-2.5">Sugar Level</p>
                <div className="flex gap-2 flex-wrap">
                  {SUGAR_OPTIONS.map((s) => (
                    <button key={s} onClick={() => patch({ sugar: s })}
                      className={`px-4 py-2 rounded-full border font-body text-sm transition-all ${customization.sugar === s ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-card text-muted-foreground hover:border-primary/40"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Notes ── */}
              <div className="mb-6">
                <p className="font-body text-sm font-semibold text-foreground mb-2">Special Note <span className="text-muted-foreground font-normal">(optional)</span></p>
                <textarea
                  value={customization.notes}
                  onChange={(e) => patch({ notes: e.target.value })}
                  placeholder="e.g. Extra hot, less foam, no ice..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
                />
              </div>

              {/* ── Add Button ── */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-body">Price</p>
                  <p className="font-display font-bold text-primary text-3xl">रु {finalPrice}</p>
                </div>
                <Button
                  onClick={handleAdd}
                  size="lg"
                  className={`flex-1 rounded-2xl py-6 font-body font-bold text-base transition-all duration-300 ${added ? "bg-green-600 hover:bg-green-600" : ""}`}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="added" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        ✓ Added to Order!
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" /> Add to Order
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Related Items */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">You might also like</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((r, i) => (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <Link to={`/menu/${r.id}`} className="group flex gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <img src={r.image} alt={r.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 className="font-display font-bold text-foreground text-sm">{r.name}</h3>
                        <p className="text-muted-foreground font-body text-xs mt-0.5">{r.desc}</p>
                        <p className="text-primary font-bold font-body text-sm mt-1">रु {r.price}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
