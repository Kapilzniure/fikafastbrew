import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onOrder: () => void;
}

const CartDrawer = ({ open, onClose, onOrder }: CartDrawerProps) => {
  const { cartItems, addItem, removeItem, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-lg text-foreground">Your Order</h2>
                {totalItems > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-body text-sm">Your order is empty</p>
                  <p className="text-muted-foreground/60 font-body text-xs mt-1">Add items from the menu to get started</p>
                  <Button variant="outline" size="sm" onClick={onClose} className="mt-4 rounded-full font-body">
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map(({ item, qty }) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-semibold text-foreground text-sm truncate">{item.name}</p>
                        <p className="text-primary font-body font-bold text-sm">रु {item.price}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 rounded-lg bg-background border border-border flex items-center justify-center hover:border-destructive hover:text-destructive transition-colors"
                        >
                          {qty === 1 ? <Trash2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        </button>
                        <span className="font-body font-bold text-foreground text-sm w-5 text-center">{qty}</span>
                        <button
                          onClick={() => addItem(item.id)}
                          className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-border bg-card">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-muted-foreground text-sm">{totalItems} item{totalItems > 1 ? "s" : ""}</span>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground font-body">Total</p>
                    <p className="font-display font-bold text-primary text-2xl">रु {totalPrice}</p>
                  </div>
                </div>
                <Button
                  onClick={onOrder}
                  className="w-full rounded-xl py-5 font-body font-semibold group"
                  size="lg"
                >
                  Order via WhatsApp
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-xs text-muted-foreground/60 font-body mt-2">
                  Opens WhatsApp to confirm your order
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
