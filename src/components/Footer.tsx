
import { Button } from "@/components/ui/button";
import CuerpassLogo from "./CuerpassLogo";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <CuerpassLogo className="h-8 w-auto" />
              <span className="font-display font-bold text-xl lowercase text-gradient">
                cuerpass
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              La plataforma líder de bienestar y fitness en Caracas. Accede a una red curada de gimnasios, spas y salones con flexibilidad total.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                📧
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                📱
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                📷
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Servicios</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Gimnasios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spa & Relajación</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Belleza & Estética</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clases Grupales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Entrenamientos Personales</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Empresa</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Únete como Socio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Planes Corporativos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Soporte</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">
                ¿Necesitas ayuda?
              </p>
              <p className="text-cuerpass-400 font-medium text-sm">
                WhatsApp: +58 414-XXX-XXXX
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 cuerpass. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <span>🇻🇪 Hecho en Venezuela</span>
              <span>💳 Precios en USD</span>
              <span>📱 Optimizado para móvil</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
