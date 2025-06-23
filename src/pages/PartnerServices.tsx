
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const PartnerServices = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || user?.type !== 'partner') {
      navigate('/socios/login');
    }
  }, [isAuthenticated, user, navigate]);

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Day Pass Completo",
      description: "Acceso completo a todas las áreas del gimnasio",
      credits: 3,
      duration: 240,
      active: true,
      category: "fitness"
    },
    {
      id: 2,
      name: "Masaje Relajante",
      description: "Masaje terapéutico de cuerpo completo",
      credits: 4,
      duration: 60,
      active: true,
      category: "spa"
    },
    {
      id: 3,
      name: "Facial Hidratante",
      description: "Tratamiento facial rejuvenecedor",
      credits: 3,
      duration: 45,
      active: true,
      category: "belleza"
    }
  ]);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    credits: 1,
    duration: 60,
    category: "fitness"
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleToggleService = (id: number) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, active: !service.active } : service
    ));
    toast({
      title: "Servicio Actualizado",
      description: "El estado del servicio ha sido cambiado.",
    });
  };

  const handleAddService = () => {
    if (!newService.name || !newService.description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    const service = {
      id: services.length + 1,
      ...newService,
      active: true
    };

    setServices(prev => [...prev, service]);
    setNewService({
      name: "",
      description: "",
      credits: 1,
      duration: 60,
      category: "fitness"
    });
    setShowAddForm(false);
    
    toast({
      title: "Servicio Agregado",
      description: "El nuevo servicio ha sido creado exitosamente.",
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/socios/dashboard')}
            className="mb-4"
          >
            ← Volver al Dashboard
          </Button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
                Gestionar Servicios - {user.name}
              </h1>
              <p className="text-gray-600">
                Administra los servicios que ofreces a través de Cuerpass
              </p>
            </div>
            <Button 
              className="btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              + Agregar Servicio
            </Button>
          </div>
        </div>

        {/* Formulario para Agregar Servicio */}
        {showAddForm && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="font-display text-xl">Nuevo Servicio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Servicio
                  </label>
                  <Input
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Day Pass Premium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newService.category}
                    onChange={(e) => setNewService(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="fitness">Fitness</option>
                    <option value="spa">Spa</option>
                    <option value="belleza">Belleza</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <Textarea
                  value={newService.description}
                  onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe brevemente el servicio..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Créditos Requeridos
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={newService.credits}
                    onChange={(e) => setNewService(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración (minutos)
                  </label>
                  <Input
                    type="number"
                    min="15"
                    max="480"
                    value={newService.duration}
                    onChange={(e) => setNewService(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
                <Button className="btn-primary" onClick={handleAddService}>
                  Agregar Servicio
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Servicios */}
        <div className="grid gap-6">
          {services.map((service) => (
            <Card key={service.id} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="font-display font-semibold text-lg text-gray-900">
                        {service.name}
                      </h3>
                      <Badge className={`${
                        service.category === 'fitness' 
                          ? 'bg-blue-100 text-blue-700' 
                          : service.category === 'spa'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}>
                        {service.category}
                      </Badge>
                      <Badge className={service.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                        {service.active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>💳 {service.credits} créditos</span>
                      <span>⏱️ {service.duration} min</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={service.active}
                      onCheckedChange={() => handleToggleService(service.id)}
                    />
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                No tienes servicios configurados
              </h3>
              <p className="text-gray-600 mb-6">
                Agrega tu primer servicio para empezar a recibir reservas
              </p>
              <Button className="btn-primary" onClick={() => setShowAddForm(true)}>
                Agregar Primer Servicio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PartnerServices;
