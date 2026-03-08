import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileOrderButton = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setVisible(window.scrollY > heroHeight - 100);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => navigate("/order")}
          className="md:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg shadow-primary/30 font-body font-semibold flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm">Order Now</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default MobileOrderButton;
