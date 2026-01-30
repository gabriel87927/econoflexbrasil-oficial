import productImage from "@/assets/product-1.jpeg";

interface ProductCardProps {
  onClick: () => void;
}

const ProductCard = ({ onClick }: ProductCardProps) => {
  const originalPrice = 498;
  const currentPrice = 127.42;
  const pixPrice = 114.68;
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  const installments = (currentPrice / 6).toFixed(2);

  return (
    <section className="container py-4">
      <h2 className="text-xl font-bold mb-3">Destaques</h2>
      
      <div 
        onClick={onClick}
        className="flex gap-4 bg-card rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border p-4"
      >
        <div className="w-36 h-36 bg-muted flex items-center justify-center flex-shrink-0 rounded">
          <img 
            src={productImage} 
            alt="Econoflex Brasil" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex flex-col justify-center min-w-0">
          <h3 className="text-lg font-semibold mb-1">Econoflex Brasil</h3>
          
          <p className="price-old text-sm">R${originalPrice.toFixed(2).replace('.', ',')}</p>
          
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold">R${currentPrice.toFixed(2).replace('.', ',')}</span>
            <span className="price-discount text-sm">{discount}% OFF</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-1">
            6 x de R${installments.replace('.', ',')} sem juros
          </p>
          
          <p className="price-pix text-base font-medium">
            R${pixPrice.toFixed(2).replace('.', ',')} com Pix
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
