
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "María González",
    email: "maria@email.com",
    phone: "+58 414 123-4567",
    birthDate: "1990-05-15"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile update:", formData);
    // TODO: Implement actual profile update logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Mi Perfil
          </h1>
          <p className="text-gray-600">
            Actualiza tu información personal y preferencias
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Información Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Nacimiento
                    </label>
                    <Input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="btn-primary">
                    Guardar Cambios
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Plan Info */}
          <div>
            <Card className="shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Mi Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge className="bg-cuerpass-100 text-cuerpass-700 mb-3">
                    Plan Premium
                  </Badge>
                  <div className="text-2xl font-bold text-cuerpass-600 mb-2">
                    12
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Créditos disponibles
                  </p>
                  <p className="text-xs text-gray-500">
                    Próxima renovación: 28 Feb 2024
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full text-sm">
                  Cambiar Contraseña
                </Button>
                <Button variant="outline" className="w-full text-sm">
                  Notificaciones
                </Button>
                <Button variant="outline" className="w-full text-sm text-red-600 hover:text-red-700">
                  Cancelar Suscripción
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
