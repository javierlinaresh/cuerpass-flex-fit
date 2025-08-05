import Header from "@/components/Header";
import PricingPlans from "@/components/PricingPlans";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Planes y Precios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el plan perfecto para tu estilo de vida activo
          </p>
        </div>
        <PricingPlans />
      </div>
    </div>
  );
};

export default Pricing;