import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Minus, ArrowRight, Trash2, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems, categories, type MenuCategory } from "@/data/menuData";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useCart, entryPrice } from "@/context/CartContext";

const WHATSAPP_NUMBER = "9779800000000";

const PICKUP_SLOTS = ["ASAP", "15 min", "30 min", "45 min", "1 hour"];

export default function OrderPage() {
  const { entries, updateQty, removeEntry, clearCart, totalItems, totalPrice, specialInstructions, setSpecialInstructions, pickupTime, setPickupTime } = useCart();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("coffee");
  const [ordered, setOrdered] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  const handleOrder = () => {
    if (totalItems === 0) return;
    const lines = entries.map((e) => {
      const item = menuItems.find((m) => m.id === e.itemId)!;
      const c = e.customization;
      const opts = [c.size, c.temp, c.milk !== "Regular" ? `${c.milk} milk` : "", c.sugar !== "Normal" ? `${c.sugar} sugar` : "", c.notes ? `"${c.notes}"` : ""].filter(Boolean).join(", ");
      return `• ${item.name} ×${e.qty} (${opts}) — रु ${entryPrice(item, c) * e.qty}`;
    }).join("\n");
    const msg = `Hello Fika Takeaway! 👋\n\nOrder:\n${lines}\n\n*Total: रु ${totalPrice}*\n⏱ Pickup: ${pickupTime}${specialInstructions ? `\n📝 Note: ${specialInstructions}` : ""}\n\nPlease confirm. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setOrdered(true);
    clearCart();
    setCartVisible(false);
    setTimeout(() => setOrdered(false), 5000);
  };

  const CartContent = () => (
    <>
      {entries.length === 0 ? (
        <div className="py-10 text-center">
          <ShoppingBag className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
          <p className="font-body text-sm text-muted-foreground">Your order is empty</p>
          <p className="font-body text-xs text-muted-foreground/60 mt-1">Browse the menu and add items</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-52 lg:max-h-64 overflow-y-auto pr-1">
          {entries.map((entry) => {
            const item = menuItems.find((m) => m.id === entry.itemId)!;
            const c = entry.customization;
            const opts = [c.size, c.temp, c.milk !== "Regular" ? c.milk : ""].filter(Boolean).join(" · ");
            return (
              <div key={entry.key} className="flex items-start gap-2 p-2.5 rounded-xl bg-muted/40 border border-border text-xs font-body">
                <img src={item.image} alt={item.name} className="w-9 h-9 object-contain flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{item.name}</p>
                  <p className="text-muted-foreground text-[10px]">{opts}</p>
                  <p className="text-primary font-bold mt-0.5">रु {entryPrice(item, c) * entry.qty}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => updateQty(entry.key, -1)} className="w-6 h-6 rounded-md bg-background border border-border flex items-center justify-center hover:border-destructive hover:text-destructive transition-colors">
                    {entry.qty === 1 ? <Trash2 className="w-2.5 h-2.5" /> : <Minus className="w-2.5 h-2.5" />}
                  </button>
                  <span className="font-bold text-foreground w-4 text-center">{entry.qty}</span>
                  <button onClick={() => updateQty(entry.key, 1)} className="w-6 h-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors">
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {entries.length > 0 && (
        <>
          {/* Pickup time */}
          <div className="mt-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <p className="font-body text-xs font-semibold text-foreground">Pickup Time</p>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {PICKUP_SLOTS.map((slot) => (
                <button key={slot} onClick={() => setPickupTime(slot)}
                  className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${pickupTime === slot ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Special instructions */}
          <div className="mt-3">
            <div className="flex items-center gap-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-primary" />
              <p className="font-body text-xs font-semibold text-foreground">Special Instructions</p>
            </div>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Allergies, special requests..."
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-background border border-border font-body text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="border-t border-border mt-4 pt-3 flex justify-between items-center mb-3">
            <span className="font-display font-bold text-foreground text-sm">Total</span>
            <span className="font-display font-bold text-primary text-xl">रु {totalPrice}</span>
          </div>

          <Button onClick={handleOrder} className="w-full rounded-xl font-body font-semibold group" size="default">
            Order via WhatsApp
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-center text-[10px] text-muted-foreground/50 font-body mt-1.5">Opens WhatsApp with your full order</p>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={totalItems} onCartClick={() => setCartVisible(true)} />

      <section className="pt-24 pb-32 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-16">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <span className="text-primary font-medium text-xs tracking-wider uppercase font-body flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" /> Place Your Order
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2 text-foreground">
              What are you <span className="text-primary">having?</span>
            </h1>
            <p className="text-muted-foreground font-body mt-2 text-sm">
              Tap an item to customize, then add to your order.
            </p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeCategory === cat.key ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-8 items-start">
            {/* Menu grid */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div key={activeCategory} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="grid sm:grid-cols-2 gap-3">
                  {filtered.map((item) => {
                    const inCart = entries.filter(e => e.itemId === item.id).reduce((a, e) => a + e.qty, 0);
                    return (
                      <div key={item.id} className={`flex gap-3 p-4 rounded-xl border transition-all duration-200 ${inCart > 0 ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card"}`}>
                        <Link to={`/menu/${item.id}`} className="flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain hover:scale-105 transition-transform" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1 mb-0.5">
                            <Link to={`/menu/${item.id}`}>
                              <h3 className="font-display font-bold text-foreground text-sm leading-snug hover:text-primary transition-colors">{item.name}</h3>
                            </Link>
                            {item.tag && <span className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary flex-shrink-0">{item.tag}</span>}
                          </div>
                          <p className="text-muted-foreground font-body text-xs mb-2 leading-relaxed">{item.desc}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-bold font-body text-sm">रु {item.price}</span>
                            <Link to={`/menu/${item.id}`}
                              className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-body font-semibold text-xs hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-1">
                              {inCart > 0 ? <><span className="bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{inCart}</span> Customize</> : "+ Customize"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop cart sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-bold text-base text-foreground">Your Order</h3>
                  {totalItems > 0 && <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{totalItems} item{totalItems > 1 ? "s" : ""}</span>}
                </div>
                <CartContent />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile floating cart bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 left-4 right-4 z-40 lg:hidden">
            <button onClick={() => setCartVisible(true)}
              className="w-full bg-primary text-primary-foreground rounded-2xl px-5 py-4 flex items-center justify-between shadow-xl shadow-primary/30 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-primary-foreground text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>
                </div>
                <span className="font-body font-semibold text-sm">View Order</span>
              </div>
              <span className="font-display font-bold text-lg">रु {totalPrice}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile cart bottom sheet */}
      <AnimatePresence>
        {cartVisible && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartVisible(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl border-t border-border shadow-2xl max-h-[90vh] flex flex-col lg:hidden">
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
              </div>
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <h2 className="font-display font-bold text-base text-foreground">Your Order</h2>
                  {totalItems > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>}
                </div>
                <button onClick={() => setCartVisible(false)} className="text-muted-foreground text-xs font-body hover:text-foreground">Close</button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <CartContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success toast */}
      <AnimatePresence>
        {ordered && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 font-body text-sm font-semibold whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4" /> Order sent to WhatsApp!
          </motion.div>
        )}
      </AnimatePresence>

      <FooterSection />
    </div>
  );
}
