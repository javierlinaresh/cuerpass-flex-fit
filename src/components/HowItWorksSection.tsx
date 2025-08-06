import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, CreditCard, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Smartphone className="w-12 h-12 text-blue-500" />,
      title: "Explora y Reserva",
      description: "Navega por cientos de servicios en Caracas. Desde gimnasios hasta spas, encuentra exactamente lo que necesitas.",
      detail: "Horarios en tiempo real, fotos, reseñas y disponibilidad al instante"
    },
    {
      icon: <CreditCard className="w-12 h-12 text-green-500" />,
      title: "Paga con Créditos",
      description: "Sistema de créditos flexible. Compra el paquete que se adapte a tu ritmo de vida y úsalos cuando quieras.",
      detail: "Precios fijos en USD, sin sorpresas ni inflación"
    },
    {
      icon: <QrCode className="w-12 h-12 text-purple-500" />,
      title: "Disfruta tu Experiencia",
      description: "Llega al centro, muestra tu QR y disfruta. Sin complicaciones, sin papeleos, sin límites.",
      detail: "Check-in digital, seguimiento de beneficios y historial completo"
    }
  ];

  const forCompanies = [
    {
      stat: "40%",
      label: "Reducción en ausentismo",
      description: "Empleados más saludables y motivados"
    },
    {
      stat: "85%",
      label: "Satisfacción empleados",
      description: "Beneficios que realmente valoran"
    },
    {
      stat: "60%",
      label: "Ahorro en costos",
      description: "Vs. beneficios tradicionales"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* How It Works for Users */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-6">
            Tan sencillo como 1, 2, 3
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hemos simplificado el acceso al bienestar. En menos de 5 minutos 
            puedes estar reservando tu próxima experiencia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cuerpass-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  <h3 className="font-display font-semibold text-xl text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <p className="text-sm text-cuerpass-600 font-medium">
                    {step.detail}
                  </p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-cuerpass-500 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white mb-20">
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
            ¿Listo para transformar tu rutina de bienestar?
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de venezolanos que ya están viviendo una nueva forma de cuidar su bienestar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/servicios">
              <Button size="lg" variant="secondary" className="bg-white text-cuerpass-600 hover:bg-gray-100 px-8 py-4">
                Explorar Servicios
              </Button>
            </Link>
            <Link to="/precios">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-cuerpass-600 px-8 py-4">
                Ver Planes
              </Button>
            </Link>
          </div>
        </div>

        {/* For Companies Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-6">
              Para Empresas: El futuro de los beneficios corporativos
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Dale a tus empleados el control total sobre sus beneficios de bienestar. 
              Una solución moderna que aumenta la satisfacción, reduce costos y mejora la productividad.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Control de Presupuesto</h4>
                  <p className="text-gray-600">Define límites, monitorea gastos y obtén reportes detallados en tiempo real.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Beneficios Personalizados</h4>
                  <p className="text-gray-600">Cada empleado elige cómo usar sus beneficios según sus necesidades.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Impacto Medible</h4>
                  <p className="text-gray-600">Métricas claras sobre bienestar, productividad y satisfacción laboral.</p>
                </div>
              </div>
            </div>

            <Link to="/empresas">
              <Button className="btn-primary">
                Descubre Cuerpass para Empresas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6">
            {forCompanies.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-white">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cuerpass-600 mb-1">
                      {item.stat}
                    </div>
                    <div className="text-sm text-cuerpass-500 font-medium">
                      {item.label}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;