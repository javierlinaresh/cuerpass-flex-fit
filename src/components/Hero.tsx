import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

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
              Tu bienestar y deporte,{" "}
              <span className="text-gradient">
                sin límites
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Accede a gimnasios, canchas deportivas, spas y salones de belleza de Caracas con un solo pase. 
              Desde un partido de pádel hasta un masaje relajante. Flexibilidad total, precios transparentes en USD.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/servicios">
                <Button size="lg" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  Explorar Servicios
                </Button>
              </Link>
              <Link to="/precios">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-cuerpass-200 text-cuerpass-700 hover:bg-cuerpass-50 w-full sm:w-auto">
                  Ver Precios
                </Button>
              </Link>
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
                <span className="font-semibold text-cuerpass-600">30+</span> centros afiliados
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="relative animate-slide-up">
            <div className="relative z-10">
              {/* Main Card - Sports focused */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    ⚽
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Club Pádel Altamira</h3>
                    <p className="text-gray-500 text-sm">Disponible hoy</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-gray-700 block text-sm">Cancha Pádel (1hr)</span>
                      <span className="text-gray-500 text-xs">Horario normal</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">4 créditos</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-gray-700 block text-sm">Cancha Pádel (1hr)</span>
                      <span className="text-gray-500 text-xs">Horario pico</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">5 créditos</Badge>
                  </div>
                </div>
                
                <Button className="w-full btn-primary">
                  Reservar Ahora
                </Button>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic How It Works for Sports */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-8 h-8 bg-cuerpass-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold">1</div>
              <p className="text-sm text-gray-700">Busca y reserva tu cancha o servicio favorito</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-cuerpass-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold">2</div>
              <p className="text-sm text-gray-700">Paga con créditos o divide el costo con amigos</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-cuerpass-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold">3</div>
              <p className="text-sm text-gray-700">Muestra tu QR y disfruta tu experiencia</p>
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
