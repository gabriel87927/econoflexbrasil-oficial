import { useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getShippingOptionsWithDates } from "@/lib/shipping";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ isOpen, onClose }: ProductDetailsModalProps) => {
  const originalPrice = 498;
  const currentPrice = 127.42;
  const pixPrice = currentPrice * 0.9;
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  // Get shipping options with dynamic delivery dates
  const shippingOptions = useMemo(() => getShippingOptionsWithDates(), []);

  // Installment calculations
  const installments = [
    { qty: 1, value: currentPrice, total: currentPrice },
    { qty: 2, value: currentPrice / 2, total: currentPrice },
    { qty: 3, value: currentPrice / 3, total: currentPrice },
    { qty: 4, value: currentPrice / 4, total: currentPrice },
    { qty: 5, value: currentPrice / 5, total: currentPrice },
    { qty: 6, value: currentPrice / 6, total: currentPrice },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute inset-0 bg-background overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b sticky top-0 bg-background z-10">
          <h2 className="font-semibold text-sm">Detalhes do pagamento</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Price Summary */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">R${currentPrice.toFixed(2).replace('.', ',')}</span>
              <span className="text-xs text-muted-foreground line-through">R${originalPrice.toFixed(2).replace('.', ',')}</span>
              <span className="text-xs text-econoflex-orange font-medium">{discount}% OFF</span>
            </div>
            <p className="text-sm text-econoflex-orange">
              R${pixPrice.toFixed(2).replace('.', ',')} com Pix (10% de desconto)
            </p>
          </div>

          {/* Installments Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-3 py-2">
              <h3 className="font-medium text-sm">Parcelamento</h3>
            </div>
            <div className="divide-y">
              {installments.map((inst) => (
                <div key={inst.qty} className="flex justify-between items-center px-3 py-2 text-sm">
                  <span>{inst.qty}x de R${inst.value.toFixed(2).replace('.', ',')}</span>
                  <span className="text-muted-foreground">Total: R${inst.total.toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-3 py-2">
              <h3 className="font-medium text-sm">Opções de envio</h3>
            </div>
            <div className="divide-y">
              {shippingOptions.map(option => (
                <div key={option.id} className="flex justify-between items-center px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium">{option.name}</p>
                    <p className="text-xs text-muted-foreground">{option.delivery}</p>
                  </div>
                  <span className="font-medium">R${option.price.toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-3 py-2">
              <h3 className="font-medium text-sm">Forma de pagamento</h3>
            </div>
            <div className="px-3 py-2">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M12.5 2.1l4.2 4.2c.4.4.4 1 0 1.4l-4.2 4.2c-.4.4-1 .4-1.4 0l-4.2-4.2c-.4-.4-.4-1 0-1.4l4.2-4.2c.4-.4 1-.4 1.4 0z" fill="#32BCAD"/>
                  <path d="M12.5 12.1l4.2 4.2c.4.4.4 1 0 1.4l-4.2 4.2c-.4.4-1 .4-1.4 0l-4.2-4.2c-.4-.4-.4-1 0-1.4l4.2-4.2c.4-.4 1-.4 1.4 0z" fill="#32BCAD"/>
                </svg>
                <span className="text-sm font-medium">Pix - 10% de desconto</span>
              </div>
            </div>
          </div>

          <Button onClick={onClose} className="w-full bg-econoflex-dark hover:bg-econoflex-dark/90">
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
