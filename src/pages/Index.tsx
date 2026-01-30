import { useState, useRef } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import ReviewsSection from "@/components/ReviewsSection";
import ContactPage from "@/components/ContactPage";
import LoginPage from "@/components/LoginPage";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/contexts/CartContext";

type View = "home" | "product" | "contact" | "login";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  
  const inicioRef = useRef<HTMLDivElement>(null);
  const produtosRef = useRef<HTMLDivElement>(null);
  const contatoRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    if (section === "inicio") {
      setCurrentView("home");
      setTimeout(() => {
        inicioRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (section === "produtos") {
      setCurrentView("product");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else if (section === "contato") {
      setCurrentView("contact");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else if (section === "login") {
      setCurrentView("login");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const handleProductClick = () => {
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onNavigate={handleNavigate} />
        
        {currentView === "home" && (
          <>
            <div ref={inicioRef}>
              <HeroBanner />
            </div>
            
            <div ref={produtosRef}>
              <ProductCard onClick={handleProductClick} />
            </div>
          </>
        )}
        
        {currentView === "product" && (
          <>
            <ProductDetail />
            <ReviewsSection />
          </>
        )}
        
        {currentView === "contact" && <ContactPage />}
        
        {currentView === "login" && <LoginPage />}

        <div ref={contatoRef}>
          <Footer onNavigate={handleNavigate} />
        </div>

        <WhatsAppButton />
      </div>
    </CartProvider>
  );
};

export default Index;
