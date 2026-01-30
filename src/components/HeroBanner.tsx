import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="w-full">
      <img 
        src={heroBanner} 
        alt="Econoflex Brasil - Economia de 40% até 80% de Combustível" 
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default HeroBanner;
