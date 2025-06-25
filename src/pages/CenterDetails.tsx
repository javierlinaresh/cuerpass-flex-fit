
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - en producción vendría de una API
const centersData = {
  1: {
    id: "1",
    name: "Gold's Gym Las Mercedes",
    type: "Gimnasio",
    category: "gimnasios",
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
    location: "Av. Principal de Las Mercedes, Caracas",
    phone: "+58 212 993-4567",
    hours: "Lunes a Viernes: 6:00 AM - 10:00 PM\nSábados: 7:00 AM - 8:00 PM\nDomingos: 8:00 AM - 6:00 PM",
    description: "Gimnasio premium con equipos de última tecnología, clases grupales y entrenamientos personalizados.",
    services: [
      { name: "Day Pass Completo", credits: 3, description: "Acceso completo al gimnasio por un día" },
      { name: "Solo Cardio", credits: 2, description: "Acceso únicamente a equipos cardiovasculares" },
      { name: "Clase Grupal", credits: 2, description: "Acceso a una clase grupal" },
      { name: "Entrenamiento Personal", credits: 5, description: "Sesión de 1 hora con entrenador personal" }
    ],
    features: ["WiFi Gratis", "Estacionamiento", "Vestuarios Premium", "Aire Acondicionado"],
    amenities: ["🚿 Duchas", "🏊‍♂️ Piscina", "🧘‍♀️ Área de Yoga", "💪 Zona de Pesas", "🏃‍♂️ Caminadoras"],
    gallery: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583500178690-f7320ed5ea28?w=400&h=300&fit=crop"
    ]
  },
  2: {
    id: "2",
    name: "Club Pádel Altamira",
    type: "Deportes",
    category: "deportes",
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop",
    location: "Av. San Juan Bosco, Altamira, Caracas",
    phone: "+58 212 267-8901",
    hours: "Lunes a Domingo: 7:00 AM - 10:00 PM",
    description: "Club deportivo especializado en pádel con canchas profesionales y coaches certificados.",
    services: [
      { name: "Cancha Pádel (1hr)", credits: 4, description: "Reserva de cancha por 1 hora", coach: "Pedro Ramírez" },
      { name: "Clase de Pádel", credits: 3, description: "Clase grupal con instructor", coach: "Ana Martínez" },
      { name: "Alquiler Raquetas", credits: 1, description: "Alquiler de raquetas profesionales" },
      { name: "Torneo Amateur", credits: 5, description: "Participación en torneo semanal", coach: "Carlos Torres" }
    ],
    features: ["Iluminación LED", "Césped Sintético", "Cafetería", "Vestuarios"],
    amenities: ["🎾 4 Canchas de Pádel", "🚿 Vestuarios", "☕ Cafetería", "🏆 Zona de Trofeos", "🅿️ Estacionamiento"],
    gallery: [
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    ]
  },
  3: {
    id: "3",
    name: "Zen Spa & Wellness",
    type: "Spa",
    category: "spa",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=400&fit=crop",
    location: "C.C. Los Palos Grandes, Caracas",
    phone: "+58 212 285-3456",
    hours: "Lunes a Sábado: 9:00 AM - 8:00 PM\nDomingo: 10:00 AM - 6:00 PM",
    description: "Spa de lujo especializado en tratamientos de relajación y bienestar con terapeutas certificados.",
    services: [
      { name: "Masaje Relajante", credits: 4, description: "Masaje de cuerpo completo (60 min)", therapist: "Laura González" },
      { name: "Facial Hidratante", credits: 3, description: "Tratamiento facial profundo", therapist: "Carmen Ruiz" },
      { name: "Manicure & Pedicure", credits: 2, description: "Cuidado completo de manos y pies", therapist: "Sofía Morales" },
      { name: "Aromaterapia", credits: 5, description: "Sesión de aromaterapia (90 min)", therapist: "María Fernández" }
    ],
    features: ["Ambiente Relajante", "Productos Naturales", "Terapeutas Certificados", "Música Ambiental"],
    amenities: ["🛁 Jacuzzi", "🧘‍♀️ Sala de Meditación", "🌿 Jardín Zen", "🎵 Musicoterapia", "☕ Té de Cortesía"],
    gallery: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop"
    ]
  }
};

const CenterDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Obtener los datos del centro, ya sea del state o de los datos mock
  const center = location.state?.business || centersData[id as keyof typeof centersData] || centersData[1];

  const handleReservation = (service: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia Sesión",
        description: "Necesitas iniciar sesión para hacer una reserva.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!user || user.credits < service.credits) {
      toast({
        title: "Créditos Insuficientes",
        description: `Necesitas ${service.credits} créditos para este servicio. Tienes ${user.credits}.`,
        variant: "destructive"
      });
      return;
    }

    // Aquí iría la lógica de reserva real
    toast({
      title: "¡Reserva Confirmada!",
      description: `Has reservado ${service.name} en ${center.name}. Se descontaron ${service.credits} créditos.`,
    });

    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Services */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
                  Servicios Disponibles
                </h2>
                <div className="space-y-4">
                  {center.services.map((service, index) => (
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
                          onClick={() => handleReservation(service)}
                        >
                          Reservar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">
                  Sobre Este Centro
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {center.description}
                </p>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Instalaciones Disponibles
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {center.amenities.map((amenity, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm text-center">
                      {amenity}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">
                  Galería
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {center.gallery.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${center.name} ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
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

            {/* Features */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Características
                </h3>
                <div className="flex flex-wrap gap-2">
                  {center.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Credits */}
            {isAuthenticated && user && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-cuerpass-500 to-coral-500 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Tus Créditos
                  </h3>
                  <div className="text-3xl font-bold mb-2">
                    {user.credits}
                  </div>
                  <p className="text-sm opacity-90 mb-4">
                    Créditos disponibles
                  </p>
                  <Button className="bg-white text-cuerpass-600 hover:bg-gray-100 text-sm w-full">
                    Comprar Más Créditos
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterDetails;
