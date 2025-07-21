
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Business, Service } from "@/types";

interface CenterServicesProps {
  center: Business;
  onReservation: (service: Service) => void;
}

const CenterServices = ({ center, onReservation }: CenterServicesProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
          Servicios Disponibles
        </h2>
        <div className="space-y-4">
          {center.services.map((service: Service, index: number) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {service.description}
                </p>
                {(service.instructor || service.barber || service.therapist || service.coach || service.stylist || service.esthetician) && (
                  <p className="text-xs text-cuerpass-600">
                    {service.instructor && `Instructor: ${service.instructor}`}
                    {service.barber && `Barbero: ${service.barber}`}
                    {service.therapist && `Terapeuta: ${service.therapist}`}
                    {service.coach && `Coach: ${service.coach}`}
                    {service.stylist && `Estilista: ${service.stylist}`}
                    {service.esthetician && `Esteticista: ${service.esthetician}`}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-cuerpass-100 text-cuerpass-700">
                  {service.credits} créditos
                </Badge>
                <Button 
                  className="btn-primary"
                  onClick={() => onReservation(service)}
                >
                  Reservar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CenterServices;
