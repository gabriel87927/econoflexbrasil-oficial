import { useState, useMemo } from "react";
import { X, Minus, Plus, Truck, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import product1 from "@/assets/product-1.jpeg";
import { getShippingOptionsWithDates, checkoutUrls } from "@/lib/shipping";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  year: string;
  quantity: number;
  originalPrice: number;
  currentPrice: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (section: string) => void;
}

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onNavigate }: CartDrawerProps) => {
  const [cep, setCep] = useState("");
  const [formattedCep, setFormattedCep] = useState("");
  const [showShipping, setShowShipping] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("envio-mini");
  const [vehicleInfo, setVehicleInfo] = useState("");

  const originalPrice = 498;
  const currentPrice = 127.42;
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  // Calculate shipping options with dynamic delivery dates
  const shippingOptions = useMemo(() => getShippingOptionsWithDates(), []);

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }
    return digits;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setFormattedCep(formatted);
    setCep(formatted.replace("-", ""));
  };

  const handleCalculate = () => {
    if (cep.length === 8) {
      setShowShipping(true);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  const selectedShippingOption = shippingOptions.find(o => o.id === selectedShipping);
  const shippingPrice = showShipping && selectedShippingOption ? selectedShippingOption.price : 0;
  const total = subtotal + shippingPrice;
  const pixTotal = total * 0.9;

  const isCheckoutReady = showShipping && items.length > 0 && vehicleInfo.trim().length > 0;

  const handleStartCheckout = () => {
    if (isCheckoutReady) {
      // Redirect directly to the appropriate checkout URL based on shipping selection
      const checkoutUrl = checkoutUrls[selectedShipping];
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-background overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="font-semibold text-base">Carrinho de compras</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-3 space-y-3">
          {/* Cart Items */}
          {items.map(item => (
            <div key={item.id} className="flex gap-3">
              <img src={product1} alt={item.name} className="w-20 h-20 object-contain bg-muted rounded" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.name} <span className="text-xs text-muted-foreground">({item.brand}, {item.year})</span></p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-xs underline text-muted-foreground">
                    Remover
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center border rounded">
                    <button 
                      className="p-1.5"
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-xs">{item.quantity}</span>
                    <button 
                      className="p-1.5"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <div className="ml-auto text-right">
                    <span className="text-econoflex-orange text-xs">-{discount}%</span>
                    <span className="text-xs text-muted-foreground line-through ml-1">R${item.originalPrice.toFixed(2).replace('.', ',')}</span>
                    <p className="font-semibold text-sm">R${(item.currentPrice * item.quantity).toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">Seu carrinho está vazio</p>
            </div>
          )}

          {items.length > 0 && (
            <>
              {/* Subtotal */}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium text-sm">Subtotal (sem frete) :</span>
                <span className="font-semibold text-sm">R${subtotal.toFixed(2).replace('.', ',')}</span>
              </div>

              {/* CEP Section */}
              {!showShipping ? (
                <div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span>Entregas para o CEP:</span>
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="00000-000"
                      value={formattedCep}
                      onChange={handleCepChange}
                      className="flex-1 text-sm h-9"
                      maxLength={9}
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleCalculate}
                      disabled={cep.length !== 8}
                      className="text-sm h-9"
                    >
                      Calcular
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span>Entregas para o CEP: <strong>{formattedCep}</strong></span>
                    <button onClick={() => setShowShipping(false)} className="underline text-xs">
                      Alterar CEP
                    </button>
                  </div>

                  {/* Promo Banner */}
                  <div className="border border-econoflex-orange rounded p-2 text-center">
                    <span className="text-econoflex-orange text-xs font-medium">
                      ULTIMAS UNIDADES COM FRETE GRATIS... APROVEITA!
                    </span>
                  </div>

                  {/* Shipping Options */}
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">Envio a domicílio</span>
                  </div>

                  <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping} className="space-y-2">
                    {shippingOptions.map(option => (
                      <div key={option.id} className="flex items-start gap-2 bg-muted/50 p-3 rounded">
                        <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <p className="font-medium text-sm">{option.name}</p>
                          <p className="text-xs text-muted-foreground">{option.delivery}</p>
                        </Label>
                        <span className="font-semibold text-sm">R${option.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </RadioGroup>

                  <p className="text-xs text-muted-foreground">
                    O prazo de entrega <strong>não contabiliza feriados</strong>.
                  </p>

                  {/* Vehicle Info - Required */}
                  <div className="border rounded-lg p-3 mt-3">
                    <div className="flex items-start gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-sm">Ano + Modelo + Potência do veículo?</p>
                        <p className="text-xs text-muted-foreground">Preenchimento obrigatório*</p>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Escreva aqui sua mensagem"
                      value={vehicleInfo}
                      onChange={(e) => setVehicleInfo(e.target.value)}
                      className="min-h-[80px] text-sm resize-none"
                    />
                  </div>
                </>
              )}

              {/* Total */}
              <div className="pt-3 border-t space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-base">Total:</span>
                  <span className="font-bold text-lg">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <p className="text-right text-econoflex-orange text-sm">
                  Ou R$ {pixTotal.toFixed(2).replace('.', ',')} com Pix
                </p>
              </div>

              {/* Actions */}
              <Button 
                onClick={handleStartCheckout}
                disabled={!isCheckoutReady}
                className="w-full bg-econoflex-dark hover:bg-econoflex-dark/90 text-sm h-10"
              >
                Iniciar compra
              </Button>
            </>
          )}
          
          <button 
            onClick={() => { onNavigate("produtos"); onClose(); }}
            className="w-full text-center underline text-sm"
          >
            Ver mais produtos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
