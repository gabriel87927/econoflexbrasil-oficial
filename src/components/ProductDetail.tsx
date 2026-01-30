import { useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, ShieldCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import ShippingCalculator from "./ShippingCalculator";
import ProductDetailsModal from "./ProductDetailsModal";

import product1 from "@/assets/product-1.jpeg";
import product2 from "@/assets/product-2.jpeg";
import product3 from "@/assets/product-3.jpeg";
import product4 from "@/assets/product-4.jpeg";

const carBrands = [
  "Chevrolet (GM)",
  "Citroën",
  "Fiat",
  "Honda",
  "Ford",
  "Hyundai",
  "Volkswagen",
  "Toyota",
  "Renault",
  "Peugeot",
  "Nissan",
  "Jeep",
  "Kia",
  "Mitsubishi",
  "GWM",
  "Lifan",
  "Jac",
  "BMW",
  "Caoa Chery"
];

const ProductDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const images = [product1, product2, product3, product4];

  const originalPrice = 498;
  const currentPrice = 127.42;
  const pixPrice = 114.68;
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  const installments = (currentPrice / 6).toFixed(2);

  const handleBuy = () => {
    if (!selectedBrand || !selectedYear) {
      toast({
        title: "Atenção",
        description: "Selecione a marca e o ano do veículo antes de comprar.",
        variant: "destructive",
      });
      return;
    }
    
    const brandName = carBrands.find(b => b.toLowerCase().replace(/[()]/g, "").replace(" ", "-") === selectedBrand) || "Não selecionado";
    addToCart({
      name: "Econoflex Brasil",
      brand: brandName,
      year: selectedYear,
      quantity,
      originalPrice,
      currentPrice
    });
    
    toast({
      title: "Adicionado ao carrinho",
      description: "Produto adicionado com sucesso!",
      duration: 2000,
    });
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const years = Array.from({ length: 32 }, (_, i) => 1995 + i);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart(touch.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touch = e.changedTouches[0];
    const diff = touchStart - touch.clientX;
    if (diff > 50) nextImage();
    else if (diff < -50) prevImage();
    setTouchStart(null);
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);

  return (
    <section className="container py-4">
      {/* Image Gallery - Centered with Swipe */}
      <div className="relative mb-4">
        <div 
          className="aspect-square bg-muted rounded-lg overflow-hidden relative mx-auto max-w-sm"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={images[currentImage]} 
            alt={`Econoflex Brasil - Imagem ${currentImage + 1}`}
            className="w-full h-full object-contain"
          />
          
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1.5 shadow-md hover:bg-background"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1.5 shadow-md hover:bg-background"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          <span className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
            {currentImage + 1} / {images.length}
          </span>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 justify-center">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-14 h-14 flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                currentImage === index ? "border-primary" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-1">
        Início {">"} automóvel {">"} Econoflex Brasil
      </p>

      <p className="text-xs text-muted-foreground mb-1">+2060 vendidos</p>

      <h1 className="text-xl font-bold mb-2">Econoflex Brasil</h1>

      <p className="price-old text-sm">R${originalPrice.toFixed(2).replace('.', ',')}</p>
      
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold">R${currentPrice.toFixed(2).replace('.', ',')}</span>
        <span className="price-discount text-sm">{discount}% OFF</span>
      </div>

      <p className="price-pix text-base mb-1">
        R${pixPrice.toFixed(2).replace('.', ',')} com Pix
      </p>

      <p className="text-sm text-muted-foreground mb-1">
        6 x de R${installments.replace('.', ',')} sem juros
      </p>

      <p className="text-sm mb-3">
        <span className="price-discount">10% de desconto</span> pagando com Pix
      </p>

      <button 
        onClick={() => setShowDetailsModal(true)}
        className="text-sm underline mb-4 text-muted-foreground"
      >
        Ver mais detalhes
      </button>

      <ProductDetailsModal 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
      />

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="text-[10px] font-medium mb-1 block">Marca</label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="text-xs h-8">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-popover max-h-52">
              {carBrands.map((brand) => (
                <SelectItem 
                  key={brand} 
                  value={brand.toLowerCase().replace(/[()]/g, "").replace(" ", "-")}
                  className="text-xs"
                >
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-[10px] font-medium mb-1 block">Ano</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="text-xs h-8">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-popover max-h-52">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()} className="text-xs">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <div className="flex items-center border rounded">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-xs">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <Button 
          onClick={handleBuy}
          className="flex-1 bg-econoflex-dark hover:bg-econoflex-dark/90 text-xs h-8"
        >
          Comprar
        </Button>
      </div>

      <div className="space-y-2 mb-4 border-t pt-3">
        <div className="flex gap-2 items-start">
          <ShieldCheck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="font-medium text-xs">Compra protegida</p>
            <p className="text-[10px] text-muted-foreground">
              Seus dados cuidados durante toda a compra.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 items-start">
          <RotateCcw className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="font-medium text-xs">Trocas e devoluções</p>
            <p className="text-[10px] text-muted-foreground">
              Se não gostar, você pode trocar ou devolver.
            </p>
          </div>
        </div>
      </div>

      <ShippingCalculator />

      <div className="space-y-3">
        <div>
          <h2 className="font-medium mb-2 text-xs">Descrição</h2>
          <h3 className="text-sm font-bold text-destructive mb-2">
            INFORME O MODELO NO CHECKOUT {"--->"} 
          </h3>
          
          <h2 className="text-sm font-bold mb-2">
            🔧 Econoflex – Economia de Combustível Inteligente para o Seu Carro
          </h2>
          
          <p className="text-xs mb-2">
            <strong>Economize até 80% de combustível com uma instalação simples e eficaz!</strong>
          </p>
          
          <p className="text-muted-foreground text-[10px] mb-2">
            O <strong className="text-foreground">Econoflex</strong> é um dispositivo inovador que se conecta à mangueira de gasolina e <strong className="text-foreground">ajusta a pressão do combustível</strong>, otimizando a queima e reduzindo o consumo em até <strong className="text-foreground">40% a 80%</strong>. Ele atua como um <strong className="text-foreground">pulverizador de combustível</strong>, melhorando o desempenho do motor.
          </p>
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <h3 className="text-xs font-bold mb-2">✅ Benefícios do Econoflex:</h3>
          
          <ul className="space-y-1.5 text-[10px]">
            <li>🚗 <strong>Economia real:</strong> reduza o consumo em até <strong>80%</strong></li>
            <li>🔧 <strong>Instalação rápida e simples</strong></li>
            <li>🔥 <strong>Combustão otimizada</strong></li>
            <li>🌿 <strong>Menos poluição</strong></li>
            <li>💰 <strong>Economia a longo prazo</strong></li>
            <li>🛠️ <strong>Compatível com a maioria dos veículos</strong></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold mb-2">💡 Como funciona?</h3>
          
          <p className="text-muted-foreground text-[10px]">
            O Econoflex <strong className="text-foreground">pulveriza o combustível antes da injeção</strong>, fazendo com que o motor aproveite melhor cada gota.
          </p>
        </div>

        <div className="border-t pt-3">
          <p className="font-bold text-xs mb-1">Transforme seu carro em um aliado da economia.</p>
          <p className="font-bold text-xs">Adquira o seu Econoflex agora!</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
