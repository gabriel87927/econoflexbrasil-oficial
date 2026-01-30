import { useState } from "react";
import { ChevronLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo-econoflex.jpeg";

export interface CustomerData {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface CheckoutPageProps {
  onBack: () => void;
  onContinue: (data: CustomerData) => void;
  shippingOption: string;
  shippingPrice: number;
}

const CheckoutPage = ({ onBack, onContinue, shippingOption, shippingPrice }: CheckoutPageProps) => {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState<CustomerData>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  const total = subtotal + shippingPrice;

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }
    return digits;
  };

  const handleChange = (field: keyof CustomerData, value: string) => {
    let formattedValue = value;
    if (field === "cpf") formattedValue = formatCpf(value);
    if (field === "telefone") formattedValue = formatPhone(value);
    if (field === "cep") formattedValue = formatCep(value);
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const isFormValid = () => {
    return formData.nome && formData.email && formData.telefone && formData.cpf && 
           formData.cep && formData.endereco && formData.numero && formData.bairro && 
           formData.cidade && formData.estado;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onContinue(formData);
    }
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
          <h1 className="font-semibold text-sm">Dados de entrega</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container py-4 pb-32 space-y-4">
          {/* Order Summary */}
          <div className="border rounded-lg p-3">
            <h2 className="font-medium text-sm mb-3">Resumo do pedido</h2>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-xs mb-1">
                <span>{item.quantity}x {item.name}</span>
                <span>R${(item.currentPrice * item.quantity).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs mt-2 pt-2 border-t">
              <span>Frete ({shippingOption})</span>
              <span>R${shippingPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between font-medium text-sm mt-2 pt-2 border-t">
              <span>Total</span>
              <span>R${total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Personal Data */}
          <div className="border rounded-lg p-3 space-y-3">
            <h2 className="font-medium text-sm">Dados pessoais</h2>
            
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-xs">Nome completo *</Label>
              <Input 
                id="nome" 
                value={formData.nome} 
                onChange={e => handleChange("nome", e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">E-mail *</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email} 
                onChange={e => handleChange("email", e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-xs">Telefone *</Label>
                <Input 
                  id="telefone" 
                  value={formData.telefone} 
                  onChange={e => handleChange("telefone", e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-xs">CPF *</Label>
                <Input 
                  id="cpf" 
                  value={formData.cpf} 
                  onChange={e => handleChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Address Data */}
          <div className="border rounded-lg p-3 space-y-3">
            <h2 className="font-medium text-sm">Endereço de entrega</h2>
            
            <div className="space-y-2">
              <Label htmlFor="cep" className="text-xs">CEP *</Label>
              <Input 
                id="cep" 
                value={formData.cep} 
                onChange={e => handleChange("cep", e.target.value)}
                placeholder="00000-000"
                className="h-9 text-sm"
                maxLength={9}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco" className="text-xs">Endereço *</Label>
              <Input 
                id="endereco" 
                value={formData.endereco} 
                onChange={e => handleChange("endereco", e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="numero" className="text-xs">Número *</Label>
                <Input 
                  id="numero" 
                  value={formData.numero} 
                  onChange={e => handleChange("numero", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="complemento" className="text-xs">Complemento</Label>
                <Input 
                  id="complemento" 
                  value={formData.complemento} 
                  onChange={e => handleChange("complemento", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bairro" className="text-xs">Bairro *</Label>
              <Input 
                id="bairro" 
                value={formData.bairro} 
                onChange={e => handleChange("bairro", e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="cidade" className="text-xs">Cidade *</Label>
                <Input 
                  id="cidade" 
                  value={formData.cidade} 
                  onChange={e => handleChange("cidade", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado" className="text-xs">Estado *</Label>
                <Input 
                  id="estado" 
                  value={formData.estado} 
                  onChange={e => handleChange("estado", e.target.value)}
                  maxLength={2}
                  className="h-9 text-sm uppercase"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="w-full bg-econoflex-dark hover:bg-econoflex-dark/90"
          >
            Continuar para pagamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
