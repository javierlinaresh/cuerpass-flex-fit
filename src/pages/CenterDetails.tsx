
import { useParams } from "react-router-dom";
import Header from "@/components/Header";

const CenterDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">
          Detalles del Centro
        </h1>
        <p className="text-gray-600">
          Esta página mostrará los detalles del centro con ID: {id}
        </p>
      </div>
    </div>
  );
};

export default CenterDetails;
