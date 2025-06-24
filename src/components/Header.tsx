import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Search, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user,
    logout,
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-orange-100">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cuerpass-500 to-coral-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-gray-900">
                Cuerpass
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Servicios
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/servicios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors px-[10px]">
              Servicios
            </Link>
            <Link to="/como-funciona" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Cómo Funciona
            </Link>
            <a href="/#precios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Precios
            </a>
            <Link to="/empresas" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Empresas
            </Link>
            <Link to="/socios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Socios
            </Link>
            <Link to="/contacto" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? <>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
                <Link to={user?.type === 'partner' ? '/socios/dashboard' : '/dashboard'}>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    {user?.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600">
                  <LogOut className="w-4 h-4" />
                </Button>
              </> : <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-primary">
                    Registrarse
                  </Button>
                </Link>
              </>}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-gray-600 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-orange-100">
            <nav className="flex flex-col space-y-3">
              <Link to="/servicios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Servicios
              </Link>
              <Link to="/como-funciona" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Cómo Funciona
              </Link>
              <a href="/#precios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Precios
              </a>
              <Link to="/empresas" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Empresas
              </Link>
              <Link to="/socios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Socios
              </Link>
              <Link to="/contacto" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Contacto
              </Link>
              
              {isAuthenticated ? <div className="flex flex-col space-y-2 pt-4">
                  <Link to={user?.type === 'partner' ? '/socios/dashboard' : '/dashboard'}>
                    <Button variant="ghost" className="justify-start w-full">
                      <User className="w-4 h-4 mr-2" />
                      {user?.name}
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </div> : <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/login">
                    <Button variant="ghost" className="justify-start w-full">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="btn-primary w-full">
                      Registrarse
                    </Button>
                  </Link>
                </div>}
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;