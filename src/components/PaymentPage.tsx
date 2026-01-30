import { useState } from "react";
import { ChevronLeft, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { CustomerData } from "./CheckoutPage";
import logo from "@/assets/logo-econoflex.jpeg";

interface PaymentPageProps {
  onBack: () => void;
  customerData: CustomerData;
  shippingOption: string;
  shippingPrice: number;
}

const PaymentPage = ({ onBack, customerData, shippingOption, shippingPrice }: PaymentPageProps) => {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"pix">("pix");

  const subtotal = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  const total = subtotal + shippingPrice;
  const pixTotal = total * 0.9;

  const handleFinishOrder = () => {
    // Redirect to external checkout
    window.location.href = "https://www.pagamentos-seguro.link/checkout/44469fe8-82d7-4994-b075-793739a11314";
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Security Banner */}
      <div className="bg-green-200 py-2 px-4 flex items-center justify-center gap-4">
        <span className="font-bold text-lg text-foreground">COMPRA SEGURA</span>
        <div className="bg-green-500 p-1.5 rounded">
          <Shield className="h-5 w-5 text-white fill-white" />
        </div>
        <span className="font-bold text-lg text-foreground">100% PROTEGIDO</span>
      </div>

      {/* Logo Header */}
      <div className="bg-econoflex-dark py-4 flex justify-center">
        <img src={logo} alt="Econoflex" className="h-16 object-contain rounded" />
      </div>

      {/* Navigation Header */}
      <div className="bg-background border-b">
        <div className="container flex items-center gap-3 py-3">
          <button onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="font-semibold text-sm">Pagamento</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container py-4 pb-32 space-y-4">
        {/* Delivery Address Summary */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Check className="h-4 w-4 text-green-500" />
            <h2 className="font-medium text-sm">Endereço de entrega</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {customerData.endereco}, {customerData.numero}
            {customerData.complemento && ` - ${customerData.complemento}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {customerData.bairro} - {customerData.cidade}/{customerData.estado}
          </p>
          <p className="text-xs text-muted-foreground">CEP: {customerData.cep}</p>
        </div>

        {/* Shipping Summary */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Check className="h-4 w-4 text-green-500" />
            <h2 className="font-medium text-sm">Forma de envio</h2>
          </div>
          <p className="text-xs">{shippingOption}</p>
          <p className="text-xs text-muted-foreground">R${shippingPrice.toFixed(2).replace('.', ',')}</p>
        </div>

        {/* Payment Method */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted px-3 py-2">
            <h2 className="font-medium text-sm">Forma de pagamento</h2>
          </div>
          
          {/* Pix Option */}
          <div 
            className={`p-3 border-b cursor-pointer transition-colors ${paymentMethod === "pix" ? "bg-green-50 dark:bg-green-900/20" : ""}`}
            onClick={() => setPaymentMethod("pix")}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "pix" ? "border-green-500 bg-green-500" : "border-muted-foreground"}`}>
                {paymentMethod === "pix" && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M12.5 2.1l4.2 4.2c.4.4.4 1 0 1.4l-4.2 4.2c-.4.4-1 .4-1.4 0l-4.2-4.2c-.4-.4-.4-1 0-1.4l4.2-4.2c.4-.4 1-.4 1.4 0z" fill="#32BCAD"/>
                  <path d="M12.5 12.1l4.2 4.2c.4.4.4 1 0 1.4l-4.2 4.2c-.4.4-1 .4-1.4 0l-4.2-4.2c-.4-.4-.4-1 0-1.4l4.2-4.2c.4-.4 1-.4 1.4 0z" fill="#32BCAD"/>
                </svg>
                <div>
                  <p className="text-sm font-medium">Pix</p>
                  <p className="text-xs text-econoflex-orange">10% de desconto</p>
                </div>
              </div>
              <span className="text-sm font-bold text-green-600">R${pixTotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-3 space-y-2">
          <h2 className="font-medium text-sm">Resumo</h2>
          <div className="flex justify-between text-xs">
            <span>Subtotal</span>
            <span>R${subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Frete</span>
            <span>R${shippingPrice.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-xs text-econoflex-orange">
            <span>Desconto Pix (10%)</span>
            <span>-R${(total * 0.1).toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-green-600">R${pixTotal.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

          <Button 
            onClick={handleFinishOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Fazer pedido
          </Button>

          <p className="text-[10px] text-center text-muted-foreground">
            Ao clicar em "Fazer pedido", você será redirecionado para a página de pagamento segura.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
