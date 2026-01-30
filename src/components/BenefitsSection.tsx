import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Zap, Heart, Shield, Star } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Flexibilidad Total",
      description: "Un solo pase para acceder a gimnasios, spas, canchas deportivas y servicios de bienestar en toda Caracas.",
      stats: "30+ categorías de servicios"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Para Empresas",
      description: "Revoluciona los beneficios de tus empleados. Control directo sobre presupuestos, reportes detallados y mayor productividad.",
      stats: "40% menos ausentismo laboral"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Bienestar Integral",
      description: "Más que fitness: nutrición, psicología, fisioterapia, spa, belleza. Todo tu bienestar en un solo lugar.",
      stats: "15+ especialidades médicas"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Pagos en USD",
      description: "Precios transparentes en dólares. Sin sorpresas, sin inflación. La estabilidad que necesitas para planificar tu bienestar.",
      stats: "Precios fijos en USD"
    }
  ];

  const useCases = [
    "Entrenamientos personalizados en gimnasios premium",
    "Consultas nutricionales y planes alimenticios",
    "Terapias psicológicas y coaching mental",
    "Fisioterapia y rehabilitación deportiva",
    "Masajes terapéuticos y relajación",
    "Tratamientos de belleza y cuidado personal",
    "Canchas de pádel, tenis y fútbol",
    "Clases de yoga, pilates y meditación"
  ];

  return (
    <section className="py-20">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Main Benefits */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-cuerpass-500/20 text-cuerpass-400 border-0">
            ✨ Revolucionando el Bienestar en Venezuela
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Una nueva forma de vivir el{" "}
            <span className="text-gradient">
              bienestar
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Cuerpass democratiza el acceso a servicios de bienestar premium en Venezuela. 
            Una plataforma que conecta personas y empresas con los mejores centros de la ciudad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-neutral-800 hover:bg-neutral-700"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-neutral-700 rounded-2xl flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-xl text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {benefit.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-cuerpass-500 fill-current" />
                      <span className="text-sm font-medium text-cuerpass-400">
                        {benefit.stats}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Use Cases */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">
              Todo lo que necesitas para tu bienestar
            </h3>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Desde un entrenamiento matutino hasta una sesión de relajación nocturna. 
              Cuerpass te conecta con profesionales certificados en toda Caracas.
            </p>
            
            <div className="grid gap-3">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🏋️‍♂️</div>
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className="text-blue-100 text-sm">Entrenamientos mensuales</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white mt-8">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🧘‍♀️</div>
                  <div className="text-2xl font-bold mb-1">200+</div>
                  <div className="text-green-100 text-sm">Sesiones de bienestar</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 text-white -mt-4">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">⚽</div>
                  <div className="text-2xl font-bold mb-1">150+</div>
                  <div className="text-purple-100 text-sm">Partidos jugados</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-coral-500 to-pink-500 border-0 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">💆‍♀️</div>
                  <div className="text-2xl font-bold mb-1">300+</div>
                  <div className="text-coral-100 text-sm">Tratamientos de spa</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;