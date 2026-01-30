import { useState } from "react";
import { Menu, User, ShoppingCart, Search, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import logoEconoflex from "@/assets/logo-econoflex.jpeg";
import CartDrawer from "./CartDrawer";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount, cartItems, updateQuantity, removeItem } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 bg-econoflex-dark border-b border-white/10">
        <div className="container flex items-center justify-between py-2">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:bg-white/10 h-8 w-8"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - Center */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 flex items-center cursor-pointer"
            onClick={() => onNavigate("inicio")}
          >
            <img 
              src={logoEconoflex} 
              alt="Econoflex Brasil" 
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10 h-10 w-10"
              onClick={() => onNavigate("login")}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-white hover:bg-white/10 h-10 w-10"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container pb-2 px-3">
          <div className="relative">
            <Input 
              placeholder="O que você está buscando?" 
              className="pr-12 bg-white text-foreground text-xs h-9"
            />
            <Button 
              size="icon" 
              className="absolute right-0 top-0 h-full rounded-l-none bg-destructive hover:bg-destructive/90 w-10"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Bar */}
        <div className="bg-econoflex-dark py-1.5">
          <div className="container">
            <span className="text-xs font-medium text-white">automóvel</span>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex justify-end p-3">
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} className="h-8 w-8">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 px-4">
              <button 
                onClick={() => { onNavigate("inicio"); setMenuOpen(false); }}
                className="block w-full text-left py-3 text-sm font-medium border-b hover:text-econoflex-orange transition-colors"
              >
                INÍCIO
              </button>
              <button 
                onClick={() => { onNavigate("produtos"); setMenuOpen(false); }}
                className="flex w-full items-center justify-between py-3 text-sm font-medium border-b hover:text-econoflex-orange transition-colors"
              >
                PRODUTOS
                <ChevronRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => { onNavigate("contato"); setMenuOpen(false); }}
                className="block w-full text-left py-3 text-sm font-medium border-b hover:text-econoflex-orange transition-colors"
              >
                CONTATO
              </button>
            </nav>

            <div className="border-t p-4">
              <button 
                onClick={() => { onNavigate("login"); setMenuOpen(false); }}
                className="flex items-center gap-2 text-sm"
              >
                <User className="h-4 w-4" />
                Minha conta
              </button>
            </div>
          </div>
        )}
      </header>

      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default Header;
