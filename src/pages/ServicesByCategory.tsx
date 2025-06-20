
import { useParams } from "react-router-dom";
import Header from "@/components/Header";

const ServicesByCategory = () => {
  const { categoria } = useParams();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">
          Servicios de {categoria}
        </h1>
        <p className="text-gray-600">
          Esta página mostrará todos los centros de la categoría {categoria}
        </p>
      </div>
    </div>
  );
};

export default ServicesByCategory;
