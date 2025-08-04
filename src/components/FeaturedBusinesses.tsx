
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const businesses = [
  {
    id: 1,
    name: "Gold's Gym Las Mercedes",
    type: "Gimnasio",
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop",
    location: "Las Mercedes",
    services: [
      { name: "Day Pass Completo", credits: 3 },
      { name: "Solo Cardio", credits: 2 },
      { name: "Clases Grupales", credits: 2 }
    ],
    features: ["WiFi Gratis", "Estacionamiento", "Vestuarios Premium"],
    category: "gimnasios"
  },
  {
    id: 2,
    name: "Yoga Studio Altamira",
    type: "Yoga & Pilates",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop",
    location: "Altamira",
    services: [
      { name: "Clase de Yoga", credits: 2, instructor: "María Fernández" },
      { name: "Pilates Reformer", credits: 3, instructor: "Carlos Mendoza" },
      { name: "Meditación Guiada", credits: 1, instructor: "Ana Rodríguez" }
    ],
    features: ["Ambiente Zen", "Instructores Certificados", "Equipos Premium"],
    category: "yoga-pilates"
  },
  {
    id: 3,
    name: "Club Pádel Altamira",
    type: "Deportes",
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500&h=300&fit=crop",
    location: "Altamira",
    services: [
      { name: "Cancha Pádel (1hr)", credits: 4, note: "Horario normal" },
      { name: "Cancha Pádel (1hr)", credits: 5, note: "Horario pico" },
      { name: "Alquiler Raquetas", credits: 1 }
    ],
    features: ["Iluminación LED", "Césped Sintético", "Cafetería"],
    category: "deportes"
  },
  {
    id: 4,
    name: "Barbería Clásica",
    type: "Barbería",
    rating: 4.8,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=300&fit=crop",
    location: "Chacao",
    services: [
      { name: "Corte + Lavado", credits: 2, barber: "Miguel Pérez" },
      { name: "Afeitado Clásico", credits: 2, barber: "Roberto Silva" },
      { name: "Corte + Barba", credits: 3, barber: "José Martínez" }
    ],
    features: ["Ambiente Clásico", "Barberos Expertos", "Productos Premium"],
    category: "barberias"
  },
  {
    id: 5,
    name: "Zen Spa & Wellness",
    type: "Spa",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop",
    location: "Los Palos Grandes",
    services: [
      { name: "Masaje Relajante", credits: 4, therapist: "Laura González" },
      { name: "Facial Hidratante", credits: 3, therapist: "Carmen Ruiz" },
      { name: "Manicure & Pedicure", credits: 2, therapist: "Sofía Morales" }
    ],
    features: ["Ambiente Relajante", "Productos Naturales", "Terapeutas Certificados"],
    category: "spa"
  },
  {
    id: 6,
    name: "Centro Deportivo La Lagunita",
    type: "Deportes",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop",
    location: "La Lagunita",
    services: [
      { name: "Fútbol 5 (90min)", credits: 6, note: "Hasta 10 jugadores" },
      { name: "Fútbol 7 (90min)", credits: 8, note: "Hasta 14 jugadores" },
      { name: "Cancha Tenis (1hr)", credits: 3, instructor: "Pedro Ramírez" }
    ],
    features: ["Estacionamiento Amplio", "Vestuarios", "Hidratación"],
    category: "deportes"
  }
];

const FeaturedBusinesses = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBusinessClick = (business: any) => {
    navigate('/servicios');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Centros Aliados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestros centros aliados especializados en bienestar, deporte y relajación
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {businesses.slice(0, 4).map((business, index) => (
            <Card 
              key={business.id} 
              className={`card-hover cursor-pointer border-0 shadow-lg overflow-hidden animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleBusinessClick(business)}
            >
              <div className="relative">
                <img 
                  src={business.image} 
                  alt={business.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-800 border-0 text-xs">
                    {business.type}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-800">
                    ⭐ {business.rating}
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">
                    {business.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    📍 {business.location} • {business.reviews} reseñas
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 text-sm">
                    Especializado en {business.type.toLowerCase()}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {business.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full btn-primary text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/servicios');
                  }}
                >
                  Ver Más Información
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-cuerpass-200 text-cuerpass-700 hover:bg-cuerpass-50"
            onClick={() => navigate('/servicios')}
          >
            Explorar Todos los Servicios
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
