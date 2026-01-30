// Shipping utilities with dynamic delivery date calculation

export interface ShippingOption {
  id: string;
  name: string;
  businessDays: number;
  price: number;
}

export const shippingOptions: ShippingOption[] = [
  { id: "envio-mini", name: "ENVIO MINI Promocional", businessDays: 19, price: 19.58 },
  { id: "pac", name: "PAC Promocional", businessDays: 13, price: 29.54 },
  { id: "sedex", name: "SEDEX Promocional", businessDays: 7, price: 64.11 }
];

// Checkout URLs based on shipping selection
export const checkoutUrls: Record<string, string> = {
  "envio-mini": "https://go.perfectpay.com.br/PPU38CQ6OID",
  "pac": "https://go.perfectpay.com.br/PPU38CQ6OG3",
  "sedex": "https://go.perfectpay.com.br/PPU38CQ6OIQ"
};

// Calculate delivery date adding only business days (excludes weekends)
export function addBusinessDays(startDate: Date, businessDays: number): Date {
  const result = new Date(startDate);
  let daysAdded = 0;
  
  while (daysAdded < businessDays) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }
  
  return result;
}

// Format date in Brazilian Portuguese
export function formatDeliveryDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: '2-digit', 
    month: '2-digit' 
  };
  return date.toLocaleDateString('pt-BR', options);
}

// Get delivery text for a shipping option
export function getDeliveryText(businessDays: number): string {
  const today = new Date();
  const deliveryDate = addBusinessDays(today, businessDays);
  const formattedDate = formatDeliveryDate(deliveryDate);
  
  // Capitalize first letter
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  return `Chega ${capitalizedDate}`;
}

// Get shipping options with calculated delivery dates
export function getShippingOptionsWithDates() {
  return shippingOptions.map(option => ({
    ...option,
    delivery: getDeliveryText(option.businessDays)
  }));
}
