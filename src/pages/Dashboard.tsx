
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { profile, loading } = useAuthRedirect('customer');
  const navigate = useNavigate();

  if (loading || !profile) return null;

  const recentReservations = [
    {
      id: 1,
      center: "Gold's Gym Las Mercedes",
      service: "Day Pass Completo",
      date: "2024-01-15",
      time: "09:00",
      credits: 3,
      status: "confirmada"
    },
    {
      id: 2,
      center: "Zen Spa Altamira",
      service: "Masaje Relajante",
      date: "2024-01-12",
      time: "14:30",
      credits: 4,
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
            ¡Hola, {profile.full_name}! 👋
          </h1>
          <p className="text-gray-600">
            Aquí puedes gestionar tus créditos, reservas y explorar nuevos centros
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cuerpass-600 mb-2">
                {profile.credits_remaining}
              </div>
              <p className="text-gray-600 text-sm">Créditos Disponibles</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                2
              </div>
              <p className="text-gray-600 text-sm">Reservas Este Mes</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                15
              </div>
              <p className="text-gray-600 text-sm">Centros Visitados</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Reservations */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-xl">
                  Reservas Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {reservation.center}
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
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {reservation.status}
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

          {/* Actions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-xl">
                  Acciones Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full btn-primary"
                  onClick={() => navigate('/servicios')}
                >
                  Explorar Centros
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-cuerpass-500 text-cuerpass-600"
                  onClick={() => navigate('/profile')}
                >
                  Editar Perfil
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-600"
                  onClick={() => navigate('/como-funciona')}
                >
                  ¿Cómo usar los créditos?
                </Button>
              </CardContent>
            </Card>

            {/* Credit Status */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-cuerpass-500 to-coral-500 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-display font-semibold text-lg mb-2">
                  Estado de Membresía
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Plan Básico - Renovación automática
                </p>
                <Button 
                  className="bg-white text-cuerpass-600 hover:bg-gray-100 text-sm"
                  onClick={() => navigate('/actualizar-plan')}
                >
                  Actualizar Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
