
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const categories = [
  { id: "gimnasios", name: "Gimnasios", color: "bg-blue-500" },
  { id: "yoga-pilates", name: "Yoga & Pilates", color: "bg-purple-500" },
  { id: "deportes", name: "Deportes & Canchas", color: "bg-green-500" },
  { id: "spa", name: "Spa & Relajación", color: "bg-pink-500" },
  { id: "belleza", name: "Belleza & Estética", color: "bg-coral-500" },
  { id: "barberias", name: "Barberías", color: "bg-gray-500" }
];

const allBusinesses = [
  // Gimnasios
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
    id: 7,
    name: "Fitness Zone Chacao",
    type: "Gimnasio",
    category: "gimnasios",
    rating: 4.6,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    location: "Chacao",
    services: [
      { name: "Day Pass Completo", credits: 3 },
      { name: "Clases Funcionales", credits: 2 }
    ],
    features: ["Equipos Modernos", "Clases Grupales", "Nutricionista"]
  },
  
  // Yoga & Pilates
  {
    id: 8,
    name: "Yoga Studio Altamira",
    type: "Yoga & Pilates",
    category: "yoga-pilates",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop",
    location: "Altamira",
    services: [
      { name: "Clase de Yoga", credits: 2, instructor: "María Fernández" },
      { name: "Pilates Reformer", credits: 3, instructor: "Carlos Mendoza" }
    ],
    features: ["Ambiente Zen", "Instructores Certificados", "Equipos Premium"]
  },
  {
    id: 9,
    name: "Centro Wellness Los Palos Grandes",
    type: "Yoga & Pilates",
    category: "yoga-pilates",
    rating: 4.7,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1506629905607-d5b7c9f0e6d8?w=500&h=300&fit=crop",
    location: "Los Palos Grandes",
    services: [
      { name: "Hatha Yoga", credits: 2, instructor: "Ana Rodríguez" },
      { name: "Pilates Mat", credits: 2, instructor: "Luis Morales" }
    ],
    features: ["Clases Personalizadas", "Ambiente Natural", "Música Relajante"]
  },

  // Deportes & Canchas
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
      { name: "Cancha Pádel (1hr)", credits: 4, coach: "Pedro Ramírez" },
      { name: "Alquiler Raquetas", credits: 1 }
    ],
    features: ["Iluminación LED", "Césped Sintético", "Cafetería"]
  },
  {
    id: 10,
    name: "Centro Deportivo La Lagunita",
    type: "Deportes",
    category: "deportes",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop",
    location: "La Lagunita",
    services: [
      { name: "Fútbol 5 (90min)", credits: 6, coach: "Miguel Torres" },
      { name: "Cancha Tenis (1hr)", credits: 3, coach: "Carmen Silva" }
    ],
    features: ["Estacionamiento Amplio", "Vestuarios", "Hidratación"]
  },

  // Spa & Relajación
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
      { name: "Masaje Relajante", credits: 4, therapist: "Laura González" },
      { name: "Facial Hidratante", credits: 3, therapist: "Carmen Ruiz" }
    ],
    features: ["Ambiente Relajante", "Productos Naturales", "Terapeutas Certificados"]
  },
  {
    id: 11,
    name: "Spa Premium Chacao",
    type: "Spa",
    category: "spa",
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    location: "Chacao",
    services: [
      { name: "Masaje Deportivo", credits: 5, therapist: "Roberto Mendoza" },
      { name: "Aromaterapia", credits: 4, therapist: "Sofia Morales" }
    ],
    features: ["Jacuzzi", "Sauna", "Sala de Relajación"]
  },

  // Belleza & Estética
  {
    id: 12,
    name: "Salón Belleza Total",
    type: "Belleza",
    category: "belleza",
    rating: 4.6,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=300&fit=crop",
    location: "Las Mercedes",
    services: [
      { name: "Corte y Peinado", credits: 3, stylist: "Isabella Martínez" },
      { name: "Manicure Completo", credits: 2, stylist: "Valentina Ruiz" }
    ],
    features: ["Productos Premium", "Ambiente Moderno", "Estilistas Expertos"]
  },
  {
    id: 13,
    name: "Centro Estético Venus",
    type: "Belleza",
    category: "belleza",
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=300&fit=crop",
    location: "Altamira",
    services: [
      { name: "Limpieza Facial", credits: 4, esthetician: "Mariana López" },
      { name: "Depilación con Cera", credits: 3, esthetician: "Andrea Torres" }
    ],
    features: ["Tecnología Avanzada", "Tratamientos Personalizados", "Higiene Total"]
  },

  // Barberías
  {
    id: 14,
    name: "Barbería Clásica",
    type: "Barbería",
    category: "barberias",
    rating: 4.8,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=300&fit=crop",
    location: "Chacao",
    services: [
      { name: "Corte + Lavado", credits: 2, barber: "Miguel Pérez" },
      { name: "Afeitado Clásico", credits: 2, barber: "Roberto Silva" }
    ],
    features: ["Ambiente Clásico", "Barberos Expertos", "Productos Premium"]
  },
  {
    id: 15,
    name: "Modern Barber Shop",
    type: "Barbería",
    category: "barberias",
    rating: 4.9,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=500&h=300&fit=crop",
    location: "Las Mercedes",
    services: [
      { name: "Corte Moderno", credits: 3, barber: "José Martínez" },
      { name: "Barba + Bigote", credits: 2, barber: "Carlos Rodríguez" }
    ],
    features: ["Estilo Contemporáneo", "Técnicas Modernas", "Atención Personalizada"]
  }
];

const Services = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBusinesses = allBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-rice-100">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Hero Banner with Black */}
        <div className="bg-black text-white rounded-2xl p-8 mb-12">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Todos los Servicios
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Explora todos nuestros centros afiliados y encuentra el perfecto para ti
          </p>
        </div>

        {/* Ofertas del Día - Solo para usuarios autenticados */}
        {isAuthenticated && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-cuerpass-500 to-cuerpass-700 rounded-2xl p-6 text-white mb-6">
              <h2 className="font-display font-bold text-2xl mb-4">🔥 Ofertas del Día</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Gold's Gym - Day Pass</h3>
                  <p className="text-sm mb-2">Solo por hoy: <span className="line-through">3 créditos</span> <span className="font-bold">2 créditos</span></p>
                  <Badge className="bg-cuerpass-400 text-black">33% OFF</Badge>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Zen Spa - Masaje Relajante</h3>
                  <p className="text-sm mb-2">Oferta especial: <span className="line-through">4 créditos</span> <span className="font-bold">3 créditos</span></p>
                  <Badge className="bg-cuerpass-400 text-black">25% OFF</Badge>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Club Pádel - Cancha + Raquetas</h3>
                  <p className="text-sm mb-2">Pack combo: <span className="line-through">5 créditos</span> <span className="font-bold">4 créditos</span></p>
                  <Badge className="bg-cuerpass-400 text-black">20% OFF</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

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
            <Card key={business.id} className="card-hover border-0 shadow-lg overflow-hidden bg-white">
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
                        {(service.instructor || service.barber || service.therapist || service.coach || service.stylist || service.esthetician) && (
                          <span className="text-cuerpass-600 text-xs">
                            {service.instructor && `Instructor: ${service.instructor}`}
                            {service.barber && `Barbero: ${service.barber}`}
                            {service.therapist && `Terapeuta: ${service.therapist}`}
                            {service.coach && `Coach: ${service.coach}`}
                            {service.stylist && `Estilista: ${service.stylist}`}
                            {service.esthetician && `Esteticista: ${service.esthetician}`}
                          </span>
                        )}
                      </div>
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

                <Link to={`/centro/${business.id}`} state={{ business }}>
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
