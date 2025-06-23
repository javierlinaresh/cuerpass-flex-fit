import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, Shield, Award } from "lucide-react";

const ForCompanies = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Bienestar Corporativo",
      description: "Mejora la salud física y mental de tu equipo con acceso a una red premium de centros de bienestar",
      icon: "🏢",
      stats: "85% mejora en satisfacción laboral"
    },
    {
      title: "Reducción de Ausentismo",
      description: "Empleados más saludables faltan menos al trabajo y son más productivos",
      icon: "📈",
      stats: "40% menos días de enfermedad"
    },
    {
      title: "Retención de Talento",
      description: "Atrae y retiene a los mejores profesionales con beneficios únicos de bienestar",
      icon: "💎",
      stats: "60% mejor retención de empleados"
    },
    {
      title: "Flexibilidad Total",
      description: "Tus empleados eligen cuándo y dónde usar sus beneficios de bienestar",
      icon: "🎯",
      stats: "100% flexibilidad de horarios"
    }
  ];

  const plans = [
    {
      name: "Startup",
      employees: "5-25 empleados",
      price: "$15",
      period: "por empleado/mes",
      credits: "20 créditos mensuales",
      features: [
        "Acceso a todos los centros",
        "Panel administrativo básico",
        "Reportes mensuales",
        "Soporte por email"
      ],
      popular: false
    },
    {
      name: "Business",
      employees: "26-100 empleados",
      price: "$12",
      period: "por empleado/mes",
      credits: "25 créditos mensuales",
      features: [
        "Acceso a todos los centros",
        "Panel administrativo avanzado",
        "Reportes en tiempo real",
        "Soporte prioritario",
        "Eventos corporativos exclusivos"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      employees: "100+ empleados",
      price: "Personalizado",
      period: "contacta con ventas",
      credits: "Créditos ilimitados",
      features: [
        "Acceso a todos los centros",
        "Panel administrativo personalizado",
        "API personalizada",
        "Account manager dedicado",
        "Programas de bienestar a medida",
        "Integraciones con RRHH"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      company: "TechCorp Venezuela",
      person: "María González, Directora de RRHH",
      text: "Desde que implementamos Cuerpass, nuestro equipo está más motivado y saludable. La flexibilidad del sistema es exactamente lo que necesitábamos.",
      employees: "85 empleados"
    },
    {
      company: "Banco Digital",
      person: "Carlos Rodríguez, CEO",
      text: "ROI increíble. Los empleados valoran este beneficio más que cualquier otro que hayamos ofrecido antes.",
      employees: "150 empleados"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cuerpass-100 text-cuerpass-700 text-sm px-4 py-2">
            Para Empresas
          </Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            Bienestar Corporativo que 
            <span className="text-gradient"> Funciona</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Dale a tu equipo acceso a la red de bienestar más flexible de Caracas. 
            Mejora la productividad, reduce el ausentismo y atrae el mejor talento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-primary text-lg px-8 py-3"
              onClick={() => navigate('/empresas/contacto')}
            >
              Solicitar Demo
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-3 border-2 border-cuerpass-500 text-cuerpass-600"
              onClick={() => navigate('/empresas/planes')}
            >
              Ver Planes
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  {benefit.stats}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="font-display font-bold text-3xl text-center text-gray-900 mb-12">
            Lo que Dicen Nuestros Clientes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="text-2xl text-cuerpass-500 mb-4">"</div>
                    <p className="text-gray-700 leading-relaxed italic">
                      {testimonial.text}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.person}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-700 text-xs">
                      {testimonial.employees}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
              Planes Corporativos
            </h2>
            <p className="text-xl text-gray-600">
              Elige el plan que mejor se adapte al tamaño de tu empresa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg ${plan.popular ? 'ring-2 ring-cuerpass-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-cuerpass-500 text-white px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.employees}</p>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Personalizado" && (
                        <span className="text-gray-600 text-sm ml-1">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-cuerpass-600 font-medium text-sm">{plan.credits}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="text-green-500 mr-3">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.popular ? 'btn-primary' : 'border-2 border-cuerpass-500 text-cuerpass-600 hover:bg-cuerpass-50'}`}
                    onClick={() => navigate(plan.price === "Personalizado" ? '/empresas/contacto' : '/empresas/planes')}
                  >
                    {plan.price === "Personalizado" ? "Contactar Ventas" : "Empezar Ahora"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cuerpass-500 to-coral-500 rounded-2xl text-white p-12 text-center">
          <h2 className="font-display font-bold text-3xl mb-4">
            ¿Listo para Transformar el Bienestar de tu Equipo?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Únete a las empresas que ya están viendo resultados increíbles. 
            Comienza tu prueba gratuita hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-cuerpass-600 hover:bg-gray-100 text-lg px-8 py-3"
              onClick={() => navigate('/contacto')}
            >
              Empezar Ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
              onClick={() => navigate('/contacto')}
            >
              Ver Planes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForCompanies;
