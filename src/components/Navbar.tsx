import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import fikaLogo from "@/assets/fika-logo.png";

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

const OPEN_HOUR = 7;
const CLOSE_HOUR = 20;

function getOpenStatus() {
  const now = new Date();
  const h = now.getHours();
  return h >= OPEN_HOUR && h < CLOSE_HOUR;
}

export default function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [dark, setDark] = useState(() => typeof window !== "undefined" ? document.documentElement.classList.contains("dark") : true);
  const isOpen = getOpenStatus();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [location.pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const showCartIcon = cartCount > 0 && onCartClick;

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={fikaLogo} alt="Fika Takeaway" className="h-9 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {/* Open/Closed badge */}
          <div className={`flex items-center gap-1.5 text-xs font-body font-semibold px-2.5 py-1 rounded-full ${isOpen ? "bg-green-500/15 text-green-600 dark:text-green-400" : "bg-red-500/15 text-red-600 dark:text-red-400"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            {isOpen ? "Open Now" : "Closed"}
          </div>

          {links.map((l) => (
            <Link key={l.label} to={l.href}
              className={`font-body text-sm font-medium transition-colors hover:text-primary ${isActive(l.href) ? "text-primary" : "text-muted-foreground"}`}>
              {l.label}
            </Link>
          ))}

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" aria-label="Toggle theme">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {showCartIcon && (
            <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-muted transition-colors text-foreground">
              <ShoppingBag className="w-4 h-4" />
              <AnimatePresence>
                <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </motion.span>
              </AnimatePresence>
            </button>
          )}

          <Link to="/order" className="font-body text-sm font-semibold px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Order Now
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {/* Open badge */}
          <div className={`flex items-center gap-1 text-[10px] font-body font-semibold px-2 py-1 rounded-full ${isOpen ? "bg-green-500/15 text-green-600" : "bg-red-500/15 text-red-500"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            {isOpen ? "Open" : "Closed"}
          </div>
          {showCartIcon && (
            <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            </button>
          )}
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background border-t border-border px-6 py-5 space-y-3">
            {links.map((l) => (
              <Link key={l.label} to={l.href}
                className={`block font-body text-sm font-medium py-1 ${isActive(l.href) ? "text-primary" : "text-foreground"}`}>
                {l.label}
              </Link>
            ))}
            <button onClick={toggleTheme} className="flex items-center gap-2 font-body text-foreground text-sm font-medium w-full text-left py-1">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            <Link to="/order" className="block text-center font-body text-sm font-semibold px-5 py-2.5 rounded-full bg-primary text-primary-foreground w-full mt-2">
              Order Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
