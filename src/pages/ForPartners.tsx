
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const ForPartners = () => {
  const benefits = [
    {
      title: "Más Clientes, Cero Inversión",
      description: "Conecta con una base de usuarios activos sin gastos de marketing o publicidad",
      icon: "📈",
      stats: "2-3x más visitas promedio"
    },
    {
      title: "Ingresos Predecibles",
      description: "Recibe pagos garantizados por cada reserva confirmada a través de nuestra plataforma",
      icon: "💰",
      stats: "Pagos cada 15 días"
    },
    {
      title: "Gestión Simplificada",
      description: "Panel administrativo completo para manejar reservas, horarios y estadísticas",
      icon: "📊",
      stats: "Todo en un solo lugar"
    },
    {
      title: "Cero Riesgo",
      description: "Sin costos de entrada, sin comisiones ocultas. Solo paga por los clientes que realmente recibas",
      icon: "🛡️",
      stats: "Modelo de éxito compartido"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Regístrate Gratis",
      description: "Completa tu perfil de negocio y configura tus servicios disponibles",
      time: "5 minutos"
    },
    {
      step: "2",
      title: "Verificación Express",
      description: "Nuestro equipo verifica tu negocio y te da acceso al panel de gestión",
      time: "24-48 horas"
    },
    {
      step: "3",
      title: "Comienza a Recibir Clientes",
      description: "Los usuarios pueden reservar tus servicios y tú recibes notificaciones instantáneas",
      time: "Inmediato"
    },
    {
      step: "4",
      title: "Cobra Automáticamente",
      description: "Recibe pagos directos cada quincena por todos los servicios prestados",
      time: "Cada 15 días"
    }
  ];

  const testimonials = [
    {
      business: "Gold's Gym Las Mercedes",
      owner: "Roberto Martínez",
      text: "En 3 meses triplicamos nuestros clientes de day pass. La plataforma es súper fácil de usar y los pagos llegan puntual.",
      category: "Gimnasio",
      increase: "+250% clientes nuevos"
    },
    {
      business: "Zen Spa Altamira",
      owner: "Andrea López",
      text: "Cuerpass nos trajo exactamente el tipo de cliente que buscábamos. Profesionales que valoran la calidad del servicio.",
      category: "Spa",
      increase: "+180% reservas mensuales"
    }
  ];

  const pricing = {
    commission: "15%",
    description: "Solo pagas cuando recibes clientes",
    features: [
      "Registro y verificación gratuitos",
      "Panel de gestión incluido",
      "Soporte técnico 24/7",
      "Marketing digital incluido",
      "Pagos automáticos cada 15 días",
      "Sin costos ocultos"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700 text-sm px-4 py-2">
            Para Socios Comerciales
          </Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            Haz Crecer tu Negocio
            <span className="text-gradient"> Sin Invertir</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Únete a la red de bienestar más activa de Caracas. Nuestros socios aumentan sus visitas 
            entre 2x y 3x sin gastar en marketing o publicidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/socios/registro">
              <Button className="btn-primary text-lg px-8 py-3">
                Únete Gratis Ahora
              </Button>
            </Link>
            <Button variant="outline" className="text-lg px-8 py-3 border-2 border-cuerpass-500 text-cuerpass-600">
              Ver Casos de Éxito
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
                <Badge className="bg-cuerpass-100 text-cuerpass-700 text-xs">
                  {benefit.stats}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
              ¿Cómo Funciona?
            </h2>
            <p className="text-xl text-gray-600">
              Proceso súper simple para comenzar a recibir más clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-cuerpass-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 text-xs">
                    {step.time}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="font-display font-bold text-3xl text-center text-gray-900 mb-12">
            Casos de Éxito Reales
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="text-2xl text-green-500 mb-4">"</div>
                    <p className="text-gray-700 leading-relaxed italic">
                      {testimonial.text}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.owner}</p>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-gray-100 text-gray-700 text-xs">
                        {testimonial.category}
                      </Badge>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {testimonial.increase}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
              Modelo de Éxito Compartido
            </h2>
            <p className="text-xl text-gray-600">
              Solo pagas cuando realmente recibes clientes a través de nuestra plataforma
            </p>
          </div>

          <Card className="max-w-2xl mx-auto border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <div className="text-5xl font-bold text-cuerpass-600 mb-2">
                  {pricing.commission}
                </div>
                <p className="text-gray-600 text-lg">{pricing.description}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Incluye Todo:
                </h3>
                <ul className="space-y-2">
                  {pricing.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-center text-sm text-gray-700">
                      <span className="text-green-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/socios/registro">
                <Button className="btn-primary text-lg px-8 py-3 w-full">
                  Comenzar Ahora - Es Gratis
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-green-500 to-cuerpass-500 rounded-2xl text-white p-12 text-center">
          <h2 className="font-display font-bold text-3xl mb-4">
            ¿Listo para Hacer Crecer tu Negocio?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Más de 50 negocios ya confían en Cuerpass para aumentar sus ventas. 
            Únete hoy y comienza a recibir más clientes desde mañana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/socios/registro">
              <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
                Registrar mi Negocio
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
              Hablar con un Asesor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForPartners;
