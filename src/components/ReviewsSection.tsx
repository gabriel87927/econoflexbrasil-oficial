import { useState } from "react";
import { Star, Check } from "lucide-react";

interface Review {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const allReviews: Review[] = [
  { name: "G. Nunes", date: "18/12/2025", rating: 5, comment: "Econoflex excelente! Meu carro está economizando muito combustível. Recomendo demais!" },
  { name: "V. Cardoso", date: "16/12/2025", rating: 4, comment: "Instalação simples e prática. Já percebi diferença no consumo de gasolina." },
  { name: "D. Martins", date: "14/12/2025", rating: 5, comment: "Produto original com garantia. Economia real de combustível!" },
  { name: "H. Souza", date: "12/12/2025", rating: 5, comment: "Redutor Econoflex chegou antes do prazo. Qualidade impecável, recomendo!" },
  { name: "P. Lima", date: "10/12/2025", rating: 4, comment: "Ótimo custo-benefício. Motor funcionando melhor e economizando gasolina." },
  { name: "E. Barbosa", date: "08/12/2025", rating: 5, comment: "Material de qualidade. Economia de combustível notável após instalação." },
  { name: "I. Ferraz", date: "06/12/2025", rating: 5, comment: "Econoflex funciona perfeitamente! Economia de até 40% no meu veículo." },
  { name: "O. Ramos", date: "04/12/2025", rating: 4, comment: "Produto de qualidade premium. Instalação fácil e economia garantida." },
  { name: "K. Moreira", date: "02/12/2025", rating: 5, comment: "Entrega super rápida e produto exatamente como na foto. Muito satisfeito!" },
  { name: "N. Campos", date: "30/11/2025", rating: 5, comment: "Econoflex original com qualidade. Material resistente e econômico." },
  { name: "S. Teixeira", date: "28/11/2025", rating: 4, comment: "Produto original, embalagem impecável. Economia de combustível real." },
  { name: "C. Dias", date: "26/11/2025", rating: 5, comment: "Qualidade excepcional! Meu carro ficou mais econômico." },
  { name: "R. Melo", date: "24/11/2025", rating: 5, comment: "Material de primeira, economia incrível. Atendimento nota 10!" },
  { name: "L. Castro", date: "22/11/2025", rating: 4, comment: "Redutor muito bom. Não esquenta e economiza bastante combustível." },
  { name: "M. Freitas", date: "20/11/2025", rating: 5, comment: "Econoflex lindo, instalação perfeita. Economia show!" },
  { name: "A. Vieira", date: "18/11/2025", rating: 5, comment: "Produto oficial, qualidade garantida. Entrega no prazo prometido." },
  { name: "J. Cunha", date: "16/11/2025", rating: 4, comment: "Excelente qualidade do material. Economia bem perceptível." },
  { name: "F. Ribeiro", date: "14/11/2025", rating: 5, comment: "Econoflex oficial com todos os detalhes originais. Muito satisfeito!" },
  { name: "G. Santana", date: "12/11/2025", rating: 5, comment: "Material premium, acabamento impecável. Vale cada centavo!" },
  { name: "T. Azevedo", date: "10/11/2025", rating: 4, comment: "Redutor excelente. Ideal para quem quer economizar combustível." },
  { name: "D. Correia", date: "08/11/2025", rating: 5, comment: "Instalação perfeita! Economia bem aplicada no meu veículo." },
  { name: "H. Monteiro", date: "06/11/2025", rating: 5, comment: "Produto original Econoflex. Qualidade superior e design autêntico." },
  { name: "P. Gonçalves", date: "04/11/2025", rating: 4, comment: "Redutor de qualidade, economia fiel ao prometido. Recomendo!" },
  { name: "E. Mendes", date: "02/11/2025", rating: 5, comment: "Material excelente. Não desperdiça combustível e mantém o conforto." },
  { name: "I. Araújo", date: "31/10/2025", rating: 5, comment: "Entrega rápida, produto bem embalado. Qualidade nota 10!" },
  { name: "O. Carvalho", date: "29/10/2025", rating: 4, comment: "Redutor de qualidade premium. Economia resistente e bem feita." },
  { name: "K. Lopes", date: "27/10/2025", rating: 5, comment: "Econoflex oficial com todos os selos de autenticidade. Perfeita!" },
  { name: "S. Pinto", date: "23/10/2025", rating: 4, comment: "Qualidade excepcional do produto. Economia ficou perfeita." },
  { name: "C. Rezende", date: "21/10/2025", rating: 5, comment: "Produto original, atendimento excelente. Muito satisfeito com a compra!" },
  { name: "R. Vargas", date: "19/10/2025", rating: 5, comment: "Econoflex de qualidade superior. Material premium e acabamento perfeito." },
];

const ratingDistribution = [
  { stars: 5, percentage: 86 },
  { stars: 4, percentage: 11 },
  { stars: 3, percentage: 2 },
  { stars: 2, percentage: 0.6 },
  { stars: 1, percentage: 0.4 },
];

const ReviewsSection = () => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 3);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
      />
    ));
  };

  return (
    <section className="container py-4 bg-background">
      <h2 className="font-bold text-xs mb-3">AVALIAÇÕES</h2>
      
      {/* Rating Summary */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl font-bold">4.9</span>
        <div className="flex">{renderStars(5)}</div>
        <span className="text-muted-foreground text-xs">(3.287)</span>
      </div>
      
      {/* Rating Distribution */}
      <div className="space-y-0.5 mb-4">
        {ratingDistribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-1.5 text-[10px]">
            <span className="w-5 flex items-center gap-0.5">
              {item.stars}<Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-yellow-400 h-1.5 rounded-full" 
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="w-8 text-right text-muted-foreground">{item.percentage}%</span>
          </div>
        ))}
      </div>
      
      {/* Reviews List */}
      <div className="space-y-2">
        {displayedReviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-3 bg-card">
            <div className="flex justify-between items-start mb-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-xs">{review.name}</span>
                <span className="text-green-600 text-[10px] flex items-center gap-0.5">
                  <Check className="h-2.5 w-2.5" /> Verificado
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">{review.date}</span>
            </div>
            <div className="flex mb-1">{renderStars(review.rating)}</div>
            <p className="text-xs text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {/* Toggle Button */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="w-full text-center py-3 text-destructive text-xs font-medium underline"
      >
        {showAll ? "Ver menos" : "Ver mais avaliações"}
      </button>
    </section>
  );
};

export default ReviewsSection;
