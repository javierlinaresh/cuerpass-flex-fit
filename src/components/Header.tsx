
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-orange-100">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cuerpass-500 to-coral-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display font-bold text-xl text-gray-900">
              Cuerpass
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#servicios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Servicios
            </a>
            <a href="#precios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Precios
            </a>
            <a href="#empresas" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Para Empresas
            </a>
            <a href="#socios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Únete como Socio
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              Iniciar Sesión
            </Button>
            <Button className="btn-primary">
              Registrarse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-gray-600 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <nav className="flex flex-col space-y-4">
              <a href="#servicios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Servicios
              </a>
              <a href="#precios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Precios
              </a>
              <a href="#empresas" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Para Empresas
              </a>
              <a href="#socios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Únete como Socio
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" className="justify-start">
                  Iniciar Sesión
                </Button>
                <Button className="btn-primary">
                  Registrarse
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
