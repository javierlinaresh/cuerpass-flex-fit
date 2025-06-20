
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const categories = [
  { id: "gimnasios", name: "Gimnasios", color: "bg-blue-500" },
  { id: "deportes", name: "Deportes & Canchas", color: "bg-green-500" },
  { id: "spa", name: "Spa & Relajación", color: "bg-purple-500" },
  { id: "belleza", name: "Belleza & Estética", color: "bg-pink-500" }
];

const allBusinesses = [
  {
    id: 1,
    name: "Gold's Gym Las Mercedes",
    type: "Gimnasio",
    category: "gimnasios",
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop",
    location: "Las Mercedes",
    services: [
      { name: "Day Pass Completo", credits: 3 },
      { name: "Solo Cardio", credits: 2 }
    ],
    features: ["WiFi Gratis", "Estacionamiento", "Vestuarios Premium"]
  },
  {
    id: 2,
    name: "Club Pádel Altamira",
    type: "Deportes",
    category: "deportes",
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500&h=300&fit=crop",
    location: "Altamira",
    services: [
      { name: "Cancha Pádel (1hr)", credits: 4 },
      { name: "Alquiler Raquetas", credits: 1 }
    ],
    features: ["Iluminación LED", "Césped Sintético", "Cafetería"]
  },
  {
    id: 3,
    name: "Zen Spa & Wellness",
    type: "Spa",
    category: "spa",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop",
    location: "Los Palos Grandes",
    services: [
      { name: "Masaje Relajante", credits: 4 },
      { name: "Facial Hidratante", credits: 3 }
    ],
    features: ["Ambiente Relajante", "Productos Naturales", "Terapeutas Certificados"]
  }
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBusinesses = allBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Todos los Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora todos nuestros centros afiliados y encuentra el perfecto para ti
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar por nombre o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "btn-primary" : ""}
            >
              Todos
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "btn-primary" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="card-hover border-0 shadow-lg overflow-hidden">
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
                      <span className="text-gray-700 text-xs">{service.name}</span>
                      <Badge className="bg-cuerpass-100 text-cuerpass-700 text-xs">
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

                <Link to={`/centro/${business.id}`}>
                  <Button className="w-full btn-primary text-sm">
                    Ver Detalles y Reservar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron centros que coincidan con tu búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
