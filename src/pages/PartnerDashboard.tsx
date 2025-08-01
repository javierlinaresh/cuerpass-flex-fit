
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PartnerDashboard = () => {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || profile?.role !== 'partner') {
      navigate('/auth');
    }
  }, [isAuthenticated, user, navigate]);

  if (!profile) return null;

  const stats = {
    totalReservations: 127,
    monthlyReservations: 43,
    totalRevenue: 2850,
    monthlyRevenue: 945,
    averageRating: 4.8,
    totalReviews: 89
  };

  const recentReservations = [
    {
      id: 1,
      customer: "María González",
      service: "Day Pass Completo",
      date: "2024-01-15",
      time: "09:00",
      credits: 3,
      status: "confirmada"
    },
    {
      id: 2,
      customer: "Carlos Rodríguez",
      service: "Masaje Relajante",
      date: "2024-01-15",
      time: "14:30",
      credits: 4,
      status: "en_proceso"
    },
    {
      id: 3,
      customer: "Ana Martínez",
      service: "Facial Hidratante",
      date: "2024-01-14",
      time: "16:00",
      credits: 3,
      status: "completada"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Panel de {profile.business_name || profile.full_name} 🏢
          </h1>
          <p className="text-gray-600">
            Gestiona tus reservas, servicios y estadísticas del negocio
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.monthlyReservations}
              </div>
              <p className="text-gray-600 text-sm">Reservas Este Mes</p>
              <p className="text-xs text-gray-500 mt-1">
                Total: {stats.totalReservations}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${stats.monthlyRevenue}
              </div>
              <p className="text-gray-600 text-sm">Ingresos Este Mes</p>
              <p className="text-xs text-gray-500 mt-1">
                Total: ${stats.totalRevenue}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cuerpass-600 mb-2">
                {stats.averageRating}
              </div>
              <p className="text-gray-600 text-sm">Rating Promedio</p>
              <p className="text-xs text-gray-500 mt-1">
                {stats.totalReviews} reseñas
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                85%
              </div>
              <p className="text-gray-600 text-sm">Ocupación</p>
              <p className="text-xs text-gray-500 mt-1">
                +12% vs mes anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Reservations */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="font-display text-xl">
                    Reservas Recientes
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/socios/reservas')}
                  >
                    Ver Todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {reservation.customer}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {reservation.service}
                        </p>
                        <p className="text-xs text-gray-500">
                          {reservation.date} a las {reservation.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`mb-2 ${
                          reservation.status === 'confirmada' 
                            ? 'bg-blue-100 text-blue-700' 
                            : reservation.status === 'en_proceso'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {reservation.status.replace('_', ' ')}
                        </Badge>
                        <p className="text-sm text-gray-600">
                          {reservation.credits} créditos
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions & Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-xl">
                  Gestión Rápida
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full btn-primary"
                  onClick={() => navigate('/socios/horarios')}
                >
                  Configurar Horarios
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-cuerpass-500 text-cuerpass-600"
                  onClick={() => navigate('/socios/servicios')}
                >
                  Gestionar Servicios
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-600"
                  onClick={() => navigate('/socios/reportes')}
                >
                  Ver Estadísticas
                </Button>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-cuerpass-500 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-display font-semibold text-lg mb-2">
                  Rendimiento del Mes
                </h3>
                <p className="text-sm opacity-90 mb-2">
                  +23% más reservas que el mes anterior
                </p>
                <p className="text-sm opacity-90 mb-4">
                  ¡Excelente trabajo! 🎉
                </p>
                <Button 
                  className="bg-white text-green-600 hover:bg-gray-100 text-sm"
                  onClick={() => navigate('/socios/reportes')}
                >
                  Ver Reporte Completo
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  💡 Tip del Día
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Los centros que actualizan sus fotos semanalmente reciben 
                  40% más reservas. ¿Qué tal si subes fotos nuevas de tu espacio?
                </p>
                <Button variant="ghost" size="sm" className="mt-3 text-cuerpass-600">
                  Actualizar Fotos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
