
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    
    toast({
      title: "¡Mensaje Enviado!",
      description: "Te responderemos en las próximas 24 horas.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white overflow-x-hidden">
      <Header />
      
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-gray-900">
                Envíanos un Mensaje
              </CardTitle>
              <p className="text-gray-600">
                Completa el formulario y te contactaremos pronto
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="María González"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="maria@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+58 414 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cuerpass-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="soporte">Soporte Técnico</option>
                      <option value="facturacion">Facturación</option>
                      <option value="socio">Quiero ser Socio</option>
                      <option value="empresa">Solución Empresarial</option>
                      <option value="general">Consulta General</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full btn-primary text-lg py-3">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cuerpass-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-cuerpass-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">hola@cuerpass.com</p>
                      <p className="text-gray-600">soporte@cuerpass.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cuerpass-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-cuerpass-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Teléfono</p>
                      <p className="text-gray-600">+58 212-CUERPASS</p>
                      <p className="text-gray-600">+58 414-123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cuerpass-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-cuerpass-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp</p>
                      <p className="text-gray-600">+58 414-CUERPASS</p>
                      <p className="text-xs text-gray-500">Lun-Vie: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cuerpass-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-cuerpass-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Horario de Atención</p>
                      <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sábados: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cuerpass-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-cuerpass-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Oficina</p>
                      <p className="text-gray-600">Centro Empresarial Metropolitan</p>
                      <p className="text-gray-600">Caracas, Venezuela</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Rápido */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ¿Cómo funciona Cuerpass?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Cuerpass te da acceso a una red de gimnasios, spas y centros de bienestar con un solo pago mensual.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ¿Puedo cancelar en cualquier momento?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Sí, puedes cancelar tu suscripción en cualquier momento sin penalizaciones.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ¿Cómo me registro como socio?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Visita nuestra página "Para Socios" y completa el formulario de registro.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
