import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Calendar, CreditCard, Activity, Trophy, Settings, Download } from "lucide-react";

const Membership = () => {
  const { profile } = useAuth();
  useAuthRedirect('customer');

  const membershipData = {
    plan: "Premium",
    credits: 45,
    totalCredits: 100,
    expiryDate: "2025-03-15",
    monthlyUsage: 78,
    benefits: [
      "Acceso ilimitado a gimnasios partner",
      "Descuentos especiales en spa y belleza",
      "Reservas prioritarias en horarios pico",
      "Coaching nutricional incluido"
    ]
  };

  const recentActivity = [
    { date: "2025-01-28", service: "Gimnasio PowerFit", credits: 3, type: "Entrenamiento" },
    { date: "2025-01-25", service: "Spa Relax", credits: 8, type: "Masaje" },
    { date: "2025-01-22", service: "Club Pádel Elite", credits: 5, type: "Cancha Pádel" },
    { date: "2025-01-20", service: "Yoga Center", credits: 2, type: "Clase de Yoga" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Mi Locker
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona tu membresía, créditos y actividad
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Membership Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Plan Actual</CardTitle>
                  <Badge className="bg-gradient-to-r from-cuerpass-500 to-blue-500 text-white">
                    {membershipData.plan}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="w-5 h-5 text-cuerpass-500" />
                      <span className="font-semibold">Créditos Disponibles</span>
                    </div>
                    <div className="text-3xl font-bold text-cuerpass-600 mb-2">
                      {membershipData.credits}
                    </div>
                    <Progress 
                      value={(membershipData.credits / membershipData.totalCredits) * 100} 
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-500">
                      de {membershipData.totalCredits} créditos totales
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar className="w-5 h-5 text-cuerpass-500" />
                      <span className="font-semibold">Vence</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      15 de Marzo, 2025
                    </div>
                    <p className="text-sm text-gray-500">
                      48 días restantes
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Beneficios Incluidos</h4>
                  <div className="grid gap-2">
                    {membershipData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Actividad del Mes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-blue-500">Visitas este mes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">32</div>
                    <div className="text-sm text-green-500">Créditos usados</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-sm text-purple-500">Centros visitados</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Actividad Reciente</h4>
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{activity.service}</div>
                        <div className="text-sm text-gray-500">{activity.type} • {activity.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-cuerpass-600">-{activity.credits} créditos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-primary justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Comprar Créditos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="w-4 h-4 mr-2" />
                  Ver Logros
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Historial
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Logros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-semibold text-sm">Deportista Activo</div>
                    <div className="text-xs text-gray-500">10 entrenamientos este mes</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">💪</div>
                  <div>
                    <div className="font-semibold text-sm">Constancia</div>
                    <div className="text-xs text-gray-500">15 días seguidos activo</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl">🧘</div>
                  <div>
                    <div className="font-semibold text-sm">Zen Master</div>
                    <div className="text-xs text-gray-500">20 sesiones de yoga</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;