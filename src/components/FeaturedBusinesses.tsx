
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    features: ["WiFi Gratis", "Estacionamiento", "Vestuarios Premium"]
  },
  {
    id: 2,
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
    features: ["Iluminación LED", "Césped Sintético", "Cafetería"]
  },
  {
    id: 3,
    name: "Centro Deportivo La Lagunita",
    type: "Deportes",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop",
    location: "La Lagunita",
    services: [
      { name: "Fútbol 5 (90min)", credits: 6, note: "Hasta 10 jugadores" },
      { name: "Fútbol 7 (90min)", credits: 8, note: "Hasta 14 jugadores" },
      { name: "Cancha Tenis (1hr)", credits: 3 }
    ],
    features: ["Estacionamiento Amplio", "Vestuarios", "Hidratación"]
  },
  {
    id: 4,
    name: "Zen Spa & Wellness",
    type: "Spa",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop",
    location: "Los Palos Grandes",
    services: [
      { name: "Masaje Relajante", credits: 4 },
      { name: "Facial Hidratante", credits: 3 },
      { name: "Manicure & Pedicure", credits: 2 }
    ],
    features: ["Ambiente Relajante", "Productos Naturales", "Terapeutas Certificados"]
  }
];

const FeaturedBusinesses = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Centros Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre algunos de nuestros socios más populares: desde gimnasios hasta canchas deportivas y spas de lujo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {businesses.map((business, index) => (
            <Card 
              key={business.id} 
              className={`card-hover border-0 shadow-lg overflow-hidden animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
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
                  {business.services.map((service, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <span className="text-gray-700 text-xs block">{service.name}</span>
                        {service.note && (
                          <span className="text-gray-500 text-xs">{service.note}</span>
                        )}
                      </div>
                      <Badge className="bg-cuerpass-100 text-cuerpass-700 text-xs ml-2">
                        {service.credits} créditos
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {business.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full btn-primary text-sm">
                  Ver Disponibilidad
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-2 border-cuerpass-200 text-cuerpass-700 hover:bg-cuerpass-50">
            Ver Todos Los Centros
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
