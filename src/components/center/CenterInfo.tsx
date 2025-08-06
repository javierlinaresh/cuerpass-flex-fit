
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
  features: string[];
  gallery?: string[];
  phone: string;
  hours: string;
}

interface CenterInfoProps {
  center: Center;
}

const CenterInfo = ({ center }: CenterInfoProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
          Información
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-gray-900">📞 Teléfono</p>
            <p className="text-gray-600">{center.phone}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">🕒 Horarios</p>
            <p className="text-gray-600 whitespace-pre-line">{center.hours}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CenterInfo;
