
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-coral-50">
      <div className="container max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-cuerpass-100 text-cuerpass-700 hover:bg-cuerpass-200 border-cuerpass-200">
              ✨ Nuevo en Caracas
            </Badge>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
              Tu bienestar,{" "}
              <span className="text-gradient">
                sin límites
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Accede a los mejores gimnasios, spas y salones de belleza de Caracas con un solo pase. 
              Flexibilidad total, precios transparentes en USD.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                Explorar Servicios
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-cuerpass-200 text-cuerpass-700 hover:bg-cuerpass-50">
                Ver Precios
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                </div>
                <span>+150 usuarios activos</span>
              </div>
              <div>
                <span className="font-semibold text-cuerpass-600">25+</span> centros afiliados
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative animate-slide-up">
            <div className="relative z-10">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cuerpass-500 to-coral-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    G
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Gold's Gym Las Mercedes</h3>
                    <p className="text-gray-500 text-sm">Disponible hoy</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Day Pass Completo</span>
                    <Badge className="bg-green-100 text-green-700">3 créditos</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Solo Cardio</span>
                    <Badge className="bg-blue-100 text-blue-700">2 créditos</Badge>
                  </div>
                </div>
                
                <Button className="w-full btn-primary">
                  Reservar Ahora
                </Button>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-cuerpass-500" />
      </div>
    </section>
  );
};

export default Hero;
