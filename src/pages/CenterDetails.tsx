
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import CenterHero from "@/components/center/CenterHero";
import CenterServices from "@/components/center/CenterServices";
import CenterDescription from "@/components/center/CenterDescription";
import CenterGallery from "@/components/center/CenterGallery";
import CenterSidebar from "@/components/center/CenterSidebar";

interface Service {
  name: string;
  description: string;
  credits: number;
  instructor?: string;
  barber?: string;
  therapist?: string;
  coach?: string;
  stylist?: string;
  esthetician?: string;
}

interface Center {
  id: string;
  name: string;
  type: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  phone: string;
  hours: string;
  description: string;
  services: Service[];
  features: string[];
  amenities?: string[];
  gallery?: string[];
}

// Mock data - en producción vendría de una API
const centersData: Record<string, Center> = {
  "1": {
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
  }
};

const CenterDetails = () => {
  const { id } = useParams();
  const { user, profile, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [center, setCenter] = useState<Center | null>(null);

  useEffect(() => {
    console.log('CenterDetails - Location state:', location.state);
    console.log('CenterDetails - URL ID:', id);
    
    // Get center data from state or fallback to mock data
    let centerData = location.state?.business;
    
    if (!centerData && id) {
      // Try to find in mock data
      centerData = centersData[id];
    }
    
    if (!centerData) {
      // Fallback to first center if nothing found
      centerData = centersData["1"];
    }

    console.log('CenterDetails - Final center data:', centerData);
    setCenter(centerData);
  }, [id, location.state]);

  const handleReservation = (service: Service) => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia Sesión",
        description: "Necesitas iniciar sesión para hacer una reserva.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!profile || !profile.credits_remaining || profile.credits_remaining < service.credits) {
      toast({
        title: "Créditos Insuficientes",
        description: `Necesitas ${service.credits} créditos para este servicio. Tienes ${profile?.credits_remaining || 0}.`,
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

  // Show loading or error state if no center data
  if (!center) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Header />
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="font-display font-bold text-2xl text-gray-900 mb-4">
              Cargando centro...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <CenterHero center={center} />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CenterServices center={center} onReservation={handleReservation} />
            <CenterDescription center={center} />
            <CenterGallery center={center} />
          </div>

          {/* Sidebar */}
          <CenterSidebar 
            center={center} 
            user={profile} 
            isAuthenticated={isAuthenticated} 
          />
        </div>
      </div>
    </div>
  );
};

export default CenterDetails;
