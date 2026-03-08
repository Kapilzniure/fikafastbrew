import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import fikaLogo from "@/assets/fika-logo.png";

export default function FooterSection() {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={fikaLogo} alt="Fika Takeaway" className="h-10 w-auto" />
            </Link>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
              Premium takeaway coffee crafted for your pace. Grab. Sip. Go.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-pink-500 hover:text-white transition-all duration-300">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-red-600 hover:text-white transition-all duration-300">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              {/* TikTok */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-black hover:text-white transition-all duration-300 font-bold text-xs">
                TT
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Menu", to: "/menu" },
                { label: "Gallery", to: "/gallery" },
                { label: "Order Now", to: "/order" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Menu highlights */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Popular Items</h4>
            <div className="space-y-2">
              {["Classic Americano", "Iced Caramel Latte", "Matcha Latte", "Masala Chai", "Chocolate Croissant"].map((item) => (
                <Link key={item} to="/menu" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">{item}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Visit Us</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-muted-foreground">Kathmandu, Nepal</span>
              </div>
              <div className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+97798XXXXXXXX" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">+977 98XXXXXXXX</a>
              </div>
              <div className="flex gap-3 items-start">
                <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-muted-foreground">Sun–Sat: 7 AM – 8 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground/60">© 2026 Fika Takeaway. All rights reserved.</p>
          <p className="font-body text-xs text-muted-foreground/60">Made with ☕ in Kathmandu</p>
        </div>
      </div>
    </footer>
  );
}
