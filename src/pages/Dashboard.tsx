
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "María González",
    credits: 12,
    plan: "Plan Premium"
  };

  const upcomingReservations = [
    {
      id: 1,
      centerName: "Gold's Gym Las Mercedes",
      service: "Day Pass Completo",
      date: "2024-01-20",
      time: "10:00 AM",
      credits: 3
    },
    {
      id: 2,
      centerName: "Club Pádel Altamira",
      service: "Cancha Pádel (1hr)",
      date: "2024-01-22",
      time: "6:00 PM",
      credits: 4
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Reserva confirmada",
      center: "Zen Spa & Wellness",
      date: "2024-01-15",
      credits: -4
    },
    {
      id: 2,
      action: "Check-in completado",
      center: "Gold's Gym Las Mercedes",
      date: "2024-01-12",
      credits: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            ¡Hola, {user.name}!
          </h1>
          <p className="text-gray-600">
            Gestiona tus reservas y créditos desde tu panel personal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Credits Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Tus Créditos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-cuerpass-600 mb-2">
                  {user.credits}
                </div>
                <p className="text-sm text-gray-600 mb-4">Créditos disponibles</p>
                <Badge className="bg-cuerpass-100 text-cuerpass-700">
                  {user.plan}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/servicios">
                <Button className="w-full btn-primary">
                  Explorar Servicios
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="w-full">
                  Mi Perfil
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Este Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reservas:</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Créditos usados:</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Centros visitados:</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming Reservations */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Próximas Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReservations.map(reservation => (
                  <div key={reservation.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">
                        {reservation.centerName}
                      </h4>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Confirmada
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {reservation.service}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>
                        {reservation.date} a las {reservation.time}
                      </span>
                      <span>
                        {reservation.credits} créditos
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.center}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.date}
                      </p>
                    </div>
                    {activity.credits !== 0 && (
                      <Badge 
                        className={`text-xs ${
                          activity.credits > 0 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {activity.credits > 0 ? '+' : ''}{activity.credits}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
