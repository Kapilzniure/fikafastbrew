import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { menuItems, categories, type MenuCategory } from "@/data/menuData";
import fikaCup from "@/assets/fika-cup.png";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("coffee");
  const navigate = useNavigate();
  const filtered = menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 md:py-32 bg-card relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none">
        <img src={fikaCup} alt="" className="w-96 opacity-[0.03] dark:opacity-[0.05] select-none" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase font-body">Our Menu</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Crafted with <span className="text-primary">Care</span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-background rounded-2xl border border-border hover:border-primary/30 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative h-48 bg-muted/30 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {item.tag && (
                  <span className="absolute top-3 left-3 text-xs font-body font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-lg text-foreground leading-tight">{item.name}</h3>
                  <span className="text-lg font-bold text-primary whitespace-nowrap">रु {item.price}</span>
                </div>
                <p className="text-muted-foreground font-body text-sm mb-4">{item.desc}</p>
                <button
                  onClick={() => navigate("/order")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 text-primary font-body font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
