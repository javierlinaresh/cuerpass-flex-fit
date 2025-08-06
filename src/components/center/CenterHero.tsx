
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Center {
  id: number;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  description: string;
  amenities?: string[];
}

interface CenterHeroProps {
  center: Center;
}

const CenterHero = ({ center }: CenterHeroProps) => {
  return (
    <div className="mb-8">
      <img 
        src={center.image} 
        alt={center.name}
        className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg mb-6"
      />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-cuerpass-100 text-cuerpass-700">
              {center.type}
            </Badge>
            <div className="flex items-center text-sm text-gray-600">
              ⭐ {center.rating} ({center.reviews} reseñas)
            </div>
          </div>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            {center.name}
          </h1>
          <p className="text-gray-600 flex items-center">
            📍 {center.location}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="border-2 border-cuerpass-500 text-cuerpass-600">
            📞 Llamar
          </Button>
          <Button variant="outline" className="border-2 border-cuerpass-500 text-cuerpass-600">
            🗺️ Cómo Llegar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CenterHero;
