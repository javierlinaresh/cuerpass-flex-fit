import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const Profile = () => {
  const { toast } = useToast();
  const { profile, loading } = useAuthRedirect('customer');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: ""
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.full_name || "",
        email: profile.id || "", // User email from auth
        phone: profile.phone || "",
        birthDate: ""
      });
    }
  }, [profile]);

  if (loading || !profile) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile update:", formData);
    toast({
      title: "Perfil Actualizado",
      description: "Tus cambios han sido guardados exitosamente.",
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive"
      });
      return;
    }
    console.log("Password change:", passwordData);
    toast({
      title: "Contraseña Actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente.",
    });
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleCancelSubscription = () => {
    console.log("Cancel subscription");
    toast({
      title: "Solicitud de Cancelación",
      description: "Hemos recibido tu solicitud. Te contactaremos en 24 horas.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white overflow-x-hidden">
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

          {/* Plan Info & Settings */}
          <div className="space-y-6">
            {/* Plan Info */}
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
                    {profile.credits_remaining || 0}
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

            {/* Settings */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Change Password */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-sm">
                      Cambiar Contraseña
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cambiar Contraseña</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contraseña Actual
                        </label>
                        <Input
                          type="password"
                          name="current"
                          value={passwordData.current}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nueva Contraseña
                        </label>
                        <Input
                          type="password"
                          name="new"
                          value={passwordData.new}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmar Nueva Contraseña
                        </label>
                        <Input
                          type="password"
                          name="confirm"
                          value={passwordData.confirm}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full btn-primary">
                        Actualizar Contraseña
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Notifications */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-sm">
                      Notificaciones
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Configuración de Notificaciones</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Notificaciones por Email</label>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, email: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Notificaciones SMS</label>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, sms: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Notificaciones Push</label>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, push: checked }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Marketing y Promociones</label>
                        <Switch
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, marketing: checked }))
                          }
                        />
                      </div>
                      <Button 
                        className="w-full btn-primary"
                        onClick={() => {
                          toast({
                            title: "Configuración Guardada",
                            description: "Tus preferencias de notificación han sido actualizadas.",
                          });
                        }}
                      >
                        Guardar Preferencias
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Cancel Subscription */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-sm text-red-600 hover:text-red-700">
                      Cancelar Suscripción
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancelar Suscripción</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        ¿Estás seguro de que quieres cancelar tu suscripción? 
                        Perderás acceso a todos los servicios al final del período actual.
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Nota:</strong> Tu suscripción seguirá activa hasta el 28 de febrero. 
                          Puedes reactivarla en cualquier momento antes de esa fecha.
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                        >
                          Mantener Suscripción
                        </Button>
                        <Button 
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={handleCancelSubscription}
                        >
                          Confirmar Cancelación
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
