
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const PartnerSchedule = () => {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || profile?.role !== 'partner') {
      navigate('/auth');
    }
  }, [isAuthenticated, profile?.role, navigate]);

  const [schedule, setSchedule] = useState({
    monday: { enabled: true, open: '06:00', close: '22:00' },
    tuesday: { enabled: true, open: '06:00', close: '22:00' },
    wednesday: { enabled: true, open: '06:00', close: '22:00' },
    thursday: { enabled: true, open: '06:00', close: '22:00' },
    friday: { enabled: true, open: '06:00', close: '22:00' },
    saturday: { enabled: true, open: '08:00', close: '20:00' },
    sunday: { enabled: false, open: '08:00', close: '18:00' }
  });

  const days = [
    { key: 'monday', name: 'Lunes' },
    { key: 'tuesday', name: 'Martes' },
    { key: 'wednesday', name: 'Miércoles' },
    { key: 'thursday', name: 'Jueves' },
    { key: 'friday', name: 'Viernes' },
    { key: 'saturday', name: 'Sábado' },
    { key: 'sunday', name: 'Domingo' }
  ];

  const handleScheduleChange = (day: string, field: string, value: string | boolean) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Horarios Actualizados",
      description: "Los nuevos horarios han sido guardados correctamente.",
    });
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/socios/dashboard')}
            className="mb-4"
          >
            ← Volver al Dashboard
          </Button>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Configurar Horarios - {profile.business_name || profile.full_name}
          </h1>
          <p className="text-gray-600">
            Establece los horarios de apertura y cierre para cada día
          </p>
        </div>

        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="font-display text-xl">Horarios de Atención</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {days.map((day) => (
              <div key={day.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={schedule[day.key as keyof typeof schedule].enabled}
                    onCheckedChange={(checked) => handleScheduleChange(day.key, 'enabled', checked)}
                  />
                  <span className="font-medium text-gray-900 w-24">{day.name}</span>
                </div>
                
                {schedule[day.key as keyof typeof schedule].enabled ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Abre:</span>
                      <Input
                        type="time"
                        value={schedule[day.key as keyof typeof schedule].open}
                        onChange={(e) => handleScheduleChange(day.key, 'open', e.target.value)}
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Cierra:</span>
                      <Input
                        type="time"
                        value={schedule[day.key as keyof typeof schedule].close}
                        onChange={(e) => handleScheduleChange(day.key, 'close', e.target.value)}
                        className="w-32"
                      />
                    </div>
                  </div>
                ) : (
                  <Badge variant="secondary">Cerrado</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Configuraciones Adicionales */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-lg">Configuración de Reservas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Permitir reservas el mismo día</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Confirmar reservas automáticamente</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Enviar recordatorios por email</span>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-lg">Límites de Capacidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidad máxima por hora
                </label>
                <Input type="number" defaultValue="25" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo mínimo entre reservas (minutos)
                </label>
                <Input type="number" defaultValue="30" className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/socios/dashboard')}>
            Cancelar
          </Button>
          <Button className="btn-primary" onClick={handleSave}>
            Guardar Horarios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerSchedule;
