import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Calendar } from 'lucide-react';
import CuerpassLogo from './CuerpassLogo';

const Header = () => {
  const navigate = useNavigate();
  const { user, profile, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-rice-100">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <CuerpassLogo className="h-8 w-auto" />
            <span className="font-display font-bold text-xl tracking-tight lowercase text-black">
              cuerpass
            </span>
          </Link>

           {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center space-x-6">
             <Link to="/servicios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors px-[10px]">
               Servicios
             </Link>
            <Link to="/como-funciona" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Cómo Funciona
            </Link>
            {isAuthenticated ? (
              <Link to="/mi-membresia" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
                Mi Membresía
              </Link>
            ) : (
              <Link to="/precios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
                Precios
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/empresas" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
                  Empresas
                </Link>
                <Link to="/socios" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
                  Socios
                </Link>
              </>
            )}
            <Link to="/contacto" className="text-gray-600 hover:text-cuerpass-600 font-medium transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    {profile?.role === 'partner' ? (
                      <span>Panel de Socio</span>
                    ) : (
                      <span>{profile?.full_name || user?.email}</span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                 <DropdownMenuItem onClick={() => navigate('/profile')}>
                   <Settings className="mr-2 h-4 w-4" />
                   Mi Locker
                 </DropdownMenuItem>
                  
                  {profile?.role === 'partner' ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/partner-dashboard')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        {profile?.business_name || profile?.full_name}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/partner-services')}>
                        Mis Servicios
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/partner-bookings')}>
                        Reservas
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                       <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                         <Calendar className="mr-2 h-4 w-4" />
                         Mis Reservas
                       </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
              >
                Iniciar Sesión
              </Button>
            )}
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
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
             <nav className="flex flex-col space-y-3">
               <Link to="/servicios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                 Servicios
               </Link>
              <Link to="/como-funciona" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Cómo Funciona
              </Link>
              {isAuthenticated ? (
                <Link to="/mi-membresia" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                  Mi Membresía
                </Link>
              ) : (
                <Link to="/precios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                  Precios
                </Link>
              )}
              {!isAuthenticated && (
                <>
                  <Link to="/empresas" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                    Empresas
                  </Link>
                  <Link to="/socios" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                    Socios
                  </Link>
                </>
              )}
              <Link to="/contacto" className="text-gray-600 hover:text-cuerpass-600 font-medium">
                Contacto
              </Link>
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to={profile?.role === 'partner' ? '/partner-dashboard' : '/dashboard'}>
                    <Button variant="ghost" className="justify-start w-full">
                      <User className="w-4 h-4 mr-2" />
                      {profile?.full_name || user?.email}
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </div>
              ) : (
                <div className="pt-4">
                  <Link to="/auth">
                    <Button className="btn-primary w-full">
                      Iniciar Sesión
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;