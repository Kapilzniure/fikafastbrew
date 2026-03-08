import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import GalleryTeaser from "@/components/GalleryTeaser";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={totalItems} onCartClick={() => navigate("/order")} />
      <HeroSection />
      <FeaturedSection />
      <WhyChooseUsSection />
      <GalleryTeaser />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
