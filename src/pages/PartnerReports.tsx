
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const PartnerReports = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.type !== 'partner') {
      navigate('/socios/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const monthlyData = [
    { month: 'Ene', reservas: 89, ingresos: 2340 },
    { month: 'Feb', reservas: 112, ingresos: 2890 },
    { month: 'Mar', reservas: 127, ingresos: 3240 },
    { month: 'Abr', reservas: 143, ingresos: 3780 },
    { month: 'May', reservas: 158, ingresos: 4120 },
    { month: 'Jun', reservas: 167, ingresos: 4350 }
  ];

  const serviceData = [
    { name: 'Day Pass', value: 45, color: '#FF6B35' },
    { name: 'Masajes', value: 25, color: '#F7931E' },
    { name: 'Tratamientos', value: 20, color: '#FFD23F' },
    { name: 'Clases', value: 10, color: '#06D6A0' }
  ];

  const hourlyData = [
    { hora: '6:00', reservas: 12 },
    { hora: '8:00', reservas: 25 },
    { hora: '10:00', reservas: 18 },
    { hora: '12:00', reservas: 22 },
    { hora: '14:00', reservas: 30 },
    { hora: '16:00', reservas: 35 },
    { hora: '18:00', reservas: 45 },
    { hora: '20:00', reservas: 28 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/socios/dashboard')}
            className="mb-4"
          >
            ← Volver al Dashboard
          </Button>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Reporte Completo - {user.name}
          </h1>
          <p className="text-gray-600">
            Análisis detallado del rendimiento de tu negocio
          </p>
        </div>

        {/* Métricas Principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">856</div>
              <p className="text-gray-600 text-sm">Total Reservas</p>
              <Badge className="mt-2 bg-green-100 text-green-700 text-xs">
                +18% vs mes anterior
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$18,720</div>
              <p className="text-gray-600 text-sm">Ingresos Totales</p>
              <Badge className="mt-2 bg-green-100 text-green-700 text-xs">
                +23% vs mes anterior
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cuerpass-600 mb-2">4.9</div>
              <p className="text-gray-600 text-sm">Rating Promedio</p>
              <Badge className="mt-2 bg-blue-100 text-blue-700 text-xs">
                234 reseñas
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
              <p className="text-gray-600 text-sm">Satisfacción</p>
              <Badge className="mt-2 bg-purple-100 text-purple-700 text-xs">
                Excelente
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Tendencia Mensual */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-xl">Tendencia de Reservas e Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="reservas" stroke="#FF6B35" strokeWidth={3} />
                  <Line type="monotone" dataKey="ingresos" stroke="#06D6A0" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribución de Servicios */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-xl">Servicios Más Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Análisis por Horarios */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="font-display text-xl">Reservas por Horario</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Bar dataKey="reservas" fill="#FF6B35" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights y Recomendaciones */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-xl">💡 Insights Clave</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Horario Pico</h4>
                <p className="text-sm text-green-700">
                  6:00 PM es tu hora más concurrida. Considera ofertas especiales en horarios menos populares.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Crecimiento</h4>
                <p className="text-sm text-blue-700">
                  Has crecido 23% este mes. Mantén la calidad del servicio para sostener esta tendencia.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Oportunidad</h4>
                <p className="text-sm text-orange-700">
                  Los tratamientos de belleza tienen alta demanda. Considera expandir esta categoría.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-xl">🎯 Acciones Recomendadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start btn-primary">
                📸 Actualizar Fotos del Centro
              </Button>
              <Button variant="outline" className="w-full justify-start border-2 border-cuerpass-500 text-cuerpass-600">
                🎁 Crear Promoción para Horarios Libres
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-600">
                📊 Configurar Alertas de Rendimiento
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-600">
                💬 Solicitar Más Reseñas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerReports;
