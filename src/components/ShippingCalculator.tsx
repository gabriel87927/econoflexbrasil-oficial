import { useState, useMemo } from "react";
import { Truck, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getShippingOptionsWithDates } from "@/lib/shipping";

const ShippingCalculator = () => {
  const [cep, setCep] = useState("");
  const [formattedCep, setFormattedCep] = useState("");
  const [showShipping, setShowShipping] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Get shipping options with dynamic delivery dates
  const allShippingOptions = useMemo(() => getShippingOptionsWithDates(), []);

  const formatCep = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "");
    
    // Limit to 8 digits
    const limited = digits.slice(0, 8);
    
    // Format as 00000-000
    if (limited.length > 5) {
      return `${limited.slice(0, 5)}-${limited.slice(5)}`;
    }
    return limited;
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

  // Main options: ENVIO MINI and SEDEX
  const mainOptions = allShippingOptions.filter(o => o.id === "envio-mini" || o.id === "sedex");
  // Extra option: PAC
  const extraOption = allShippingOptions.find(o => o.id === "pac");

  return (
    <div className="mb-8">
      <p className="font-medium mb-2 text-sm">Meios de envio</p>
      
      {!showShipping ? (
        <>
          <div className="flex gap-2">
            <Input 
              placeholder="00000-000"
              value={formattedCep}
              onChange={handleCepChange}
              className="flex-1 text-sm"
              maxLength={9}
            />
            <Button 
              variant="outline" 
              onClick={handleCalculate}
              disabled={cep.length !== 8}
              className="text-sm"
            >
              Calcular
            </Button>
          </div>
          <button className="text-xs underline text-muted-foreground mt-2">
            Não sei meu CEP
          </button>
        </>
      ) : (
        <div className="space-y-4">
          {/* CEP Display */}
          <div className="flex items-center justify-between text-sm">
            <span>Entregas para o CEP: <strong>{formattedCep}</strong></span>
            <button 
              onClick={() => setShowShipping(false)}
              className="underline text-muted-foreground text-sm"
            >
              Alterar CEP
            </button>
          </div>

          {/* Promo Banner */}
          <div className="border border-econoflex-orange rounded-lg p-3 text-center">
            <span className="text-econoflex-orange text-sm font-medium">
              ÚLTIMAS UNIDADES COM FRETE GRÁTIS... APROVEITA!
            </span>
          </div>

          {/* Shipping Title */}
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            <span className="font-medium text-sm">Envio a domicílio</span>
          </div>

          {/* Shipping Options */}
          <div className="space-y-3">
            {mainOptions.map((option) => (
              <div key={option.id} className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{option.name}</p>
                    <p className="text-muted-foreground text-xs">{option.delivery}</p>
                  </div>
                  <span className="font-semibold text-sm">R${option.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            ))}

            {/* Extra Option (PAC) */}
            {showMoreOptions && extraOption && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{extraOption.name}</p>
                    <p className="text-muted-foreground text-xs">{extraOption.delivery}</p>
                  </div>
                  <span className="font-semibold text-sm">R${extraOption.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Toggle More Options */}
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="w-full text-center underline text-sm text-muted-foreground flex items-center justify-center gap-1"
          >
            {showMoreOptions ? (
              <>
                Ver menos opções de envio
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Ver mais opções de envio
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
