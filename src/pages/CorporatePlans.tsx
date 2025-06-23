
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const CorporatePlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Startup",
      employees: "5-25 empleados",
      price: "$15",
      period: "por empleado/mes",
      credits: "20 créditos mensuales",
      setupFee: "Sin costo de setup",
      features: [
        "Acceso a todos los centros afiliados",
        "Panel administrativo básico",
        "Reportes mensuales de uso",
        "Soporte por email",
        "Onboarding incluido"
      ],
      popular: false,
      savings: "Ahorra $180/año vs plan individual"
    },
    {
      name: "Business",
      employees: "26-100 empleados",
      price: "$12",
      period: "por empleado/mes",
      credits: "25 créditos mensuales",
      setupFee: "Setup gratuito",
      features: [
        "Acceso a todos los centros afiliados",
        "Panel administrativo avanzado",
        "Reportes en tiempo real",
        "Soporte prioritario 24/7",
        "Eventos corporativos exclusivos",
        "API para integraciones",
        "Account manager dedicado"
      ],
      popular: true,
      savings: "Ahorra $240/año vs plan individual"
    },
    {
      name: "Enterprise",
      employees: "100+ empleados",
      price: "Personalizado",
      period: "contacta con ventas",
      credits: "Créditos ilimitados",
      setupFee: "Setup y migración incluidos",
      features: [
        "Acceso a todos los centros afiliados",
        "Panel administrativo personalizado",
        "API personalizada y webhooks",
        "Account manager dedicado",
        "Programas de bienestar a medida",
        "Integraciones con sistemas RRHH",
        "SLA garantizado 99.9%",
        "Reportes ejecutivos personalizados"
      ],
      popular: false,
      savings: "Ahorro personalizado según volumen"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cuerpass-100 text-cuerpass-700 text-sm px-4 py-2">
            Planes Corporativos
          </Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            Encuentra el Plan Perfecto 
            <span className="text-gradient"> para tu Empresa</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Ofrecemos soluciones escalables para empresas de todos los tamaños. 
            Mejora el bienestar de tu equipo con precios corporativos preferenciales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative border-0 shadow-xl hover:shadow-2xl transition-all ${plan.popular ? 'ring-2 ring-cuerpass-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-cuerpass-500 text-white px-6 py-2 text-sm">
                    Más Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-display font-bold text-2xl text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-gray-600 text-sm mb-4">{plan.employees}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Personalizado" && (
                    <span className="text-gray-600 text-sm ml-2">{plan.period}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-cuerpass-600 font-semibold text-sm">{plan.credits}</p>
                  <p className="text-green-600 font-medium text-xs">{plan.setupFee}</p>
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {plan.savings}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="text-green-500 mr-3 mt-0.5 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'btn-primary' : 'border-2 border-cuerpass-500 text-cuerpass-600 hover:bg-cuerpass-50'}`}
                  onClick={() => navigate('/empresas/contacto')}
                >
                  {plan.price === "Personalizado" ? "Solicitar Cotización" : "Empezar Prueba Gratis"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparación Detallada */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-3xl text-center text-gray-900 mb-12">
            Comparación Detallada
          </h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-900">Características</th>
                      <th className="text-center p-4 font-semibold text-gray-900">Startup</th>
                      <th className="text-center p-4 font-semibold text-gray-900">Business</th>
                      <th className="text-center p-4 font-semibold text-gray-900">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-4 font-medium">Número de empleados</td>
                      <td className="p-4 text-center">5-25</td>
                      <td className="p-4 text-center">26-100</td>
                      <td className="p-4 text-center">100+</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Créditos por empleado/mes</td>
                      <td className="p-4 text-center">20</td>
                      <td className="p-4 text-center">25</td>
                      <td className="p-4 text-center">Ilimitados</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Account Manager</td>
                      <td className="p-4 text-center">❌</td>
                      <td className="p-4 text-center">✅</td>
                      <td className="p-4 text-center">✅ Dedicado</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">API Personalizada</td>
                      <td className="p-4 text-center">❌</td>
                      <td className="p-4 text-center">✅ Básica</td>
                      <td className="p-4 text-center">✅ Completa</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">SLA</td>
                      <td className="p-4 text-center">95%</td>
                      <td className="p-4 text-center">99%</td>
                      <td className="p-4 text-center">99.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-3xl text-center text-gray-900 mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  ¿Hay período mínimo de contratación?
                </h3>
                <p className="text-gray-600 text-sm">
                  No, todos nuestros planes son mensuales sin compromiso a largo plazo. 
                  Puedes cancelar en cualquier momento con 30 días de anticipación.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  ¿Los créditos se acumulan?
                </h3>
                <p className="text-gray-600 text-sm">
                  Los créditos no utilizados se mantienen hasta por 3 meses, 
                  dándote flexibilidad total para que tu equipo los use cuando más lo necesite.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  ¿Incluye onboarding?
                </h3>
                <p className="text-gray-600 text-sm">
                  Sí, todos los planes incluyen sesiones de onboarding para tu equipo de RRHH 
                  y capacitación para empleados sobre cómo usar la plataforma.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  ¿Puedo cambiar de plan?
                </h3>
                <p className="text-gray-600 text-sm">
                  Por supuesto. Puedes actualizar o reducir tu plan en cualquier momento. 
                  Los cambios se aplican en el siguiente ciclo de facturación.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-cuerpass-500 to-coral-500 rounded-2xl text-white p-12 text-center">
          <h2 className="font-display font-bold text-3xl mb-4">
            ¿Listo para Comenzar?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Únete a las empresas que ya están transformando el bienestar de su equipo. 
            Comienza tu prueba gratuita de 14 días hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-cuerpass-600 hover:bg-gray-100 text-lg px-8 py-3"
              onClick={() => navigate('/empresas/contacto')}
            >
              Empezar Prueba Gratis
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
              onClick={() => navigate('/empresas/contacto')}
            >
              Hablar con Ventas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporatePlans;
