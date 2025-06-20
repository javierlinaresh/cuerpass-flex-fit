
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
    name: "Zen Spa & Wellness",
    type: "Spa",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop",
    location: "Altamira",
    services: [
      { name: "Masaje Relajante", credits: 4 },
      { name: "Facial Hidratante", credits: 3 },
      { name: "Manicure & Pedicure", credits: 2 }
    ],
    features: ["Ambiente Relajante", "Productos Naturales", "Terapeutas Certificados"]
  },
  {
    id: 3,
    name: "Studio Bella",
    type: "Belleza",
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=300&fit=crop",
    location: "La Castellana",
    services: [
      { name: "Corte & Peinado", credits: 2 },
      { name: "Color Completo", credits: 5 },
      { name: "Tratamiento Capilar", credits: 3 }
    ],
    features: ["Estilistas Expertos", "Productos Premium", "Ambiente Moderno"]
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
            Descubre algunos de nuestros socios más populares y bien valorados por la comunidad Cuerpass.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {businesses.map((business, index) => (
            <Card 
              key={business.id} 
              className={`card-hover border-0 shadow-lg overflow-hidden animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative">
                <img 
                  src={business.image} 
                  alt={business.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-800 border-0">
                    {business.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 px-2 py-1 rounded-full text-sm font-medium text-gray-800">
                    ⭐ {business.rating}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-display font-semibold text-xl text-gray-900 mb-1">
                    {business.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    📍 {business.location} • {business.reviews} reseñas
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  {business.services.map((service, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 text-sm">{service.name}</span>
                      <Badge className="bg-cuerpass-100 text-cuerpass-700 text-xs">
                        {service.credits} créditos
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {business.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full btn-primary">
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
