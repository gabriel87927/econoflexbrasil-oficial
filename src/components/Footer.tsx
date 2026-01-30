import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import PaymentIcons from "./PaymentIcons";

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const instagramUrl = "https://www.instagram.com/redutor_econoflex?igsh=MTM1cjRndnF3ZnNidg==";
  
  return (
    <footer className="section-dark py-6">
      <div className="container space-y-4">
        {/* Social Media */}
        <div className="flex gap-3">
          <a 
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="space-y-1 text-xs">
          <p>559295266850</p>
          <p>9295266850</p>
          <p>Econoflexbrasil@outlook.com</p>
          <p>Avenida José Aírton Gondim Lamenha 341</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1">
          <button 
            onClick={() => onNavigate("inicio")}
            className="block text-white hover:text-white/80 transition-colors text-xs"
          >
            Início
          </button>
          <button 
            onClick={() => onNavigate("produtos")}
            className="block text-white hover:text-white/80 transition-colors text-xs"
          >
            Produtos
          </button>
          <button 
            onClick={() => onNavigate("contato")}
            className="block text-white hover:text-white/80 transition-colors text-xs"
          >
            Contato
          </button>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-sm mb-2">Newsletter</h3>
          <div className="flex border border-white/30 rounded-lg overflow-hidden">
            <Input 
              placeholder="E-mail" 
              className="flex-1 border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 rounded-none text-xs h-9"
            />
            <Button className="rounded-none border-l border-white/30 bg-transparent hover:bg-white/10 text-white px-4 text-xs h-9">
              Enviar
            </Button>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="font-medium text-sm mb-2">Meios de pagamento</h3>
          <PaymentIcons />
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-4 text-xs text-white/60">
          <p>Copyright Econoflex Brasil - 2026. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
