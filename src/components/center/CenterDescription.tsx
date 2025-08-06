
import { Card, CardContent } from "@/components/ui/card";

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

interface CenterDescriptionProps {
  center: Center;
}

const CenterDescription = ({ center }: CenterDescriptionProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">
          Sobre Este Centro
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          {center.description}
        </p>
        
        {center.amenities && center.amenities.length > 0 && (
          <>
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Instalaciones Disponibles
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {center.amenities.map((amenity: string, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm text-center">
                  {amenity}
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CenterDescription;
