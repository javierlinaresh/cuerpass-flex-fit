
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const CorporateContact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    employees: "",
    plan: "",
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
    console.log('Corporate contact form:', formData);
    
    toast({
      title: "¡Solicitud Enviada!",
      description: "Nos pondremos en contacto contigo en las próximas 24 horas.",
    });

    // Reset form
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      employees: "",
      plan: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cuerpass-100 text-cuerpass-700 text-sm px-4 py-2">
            Contacto Empresarial
          </Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            Hablemos de tu 
            <span className="text-gradient"> Programa de Bienestar</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro equipo de especialistas en bienestar corporativo está listo para 
            diseñar una solución personalizada para tu empresa.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-gray-900">
                Solicita tu Demo Personalizada
              </CardTitle>
              <p className="text-gray-600">
                Completa el formulario y te contactaremos en menos de 24 horas
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Empresa *
                    </label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="TechCorp Venezuela"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Persona de Contacto *
                    </label>
                    <Input
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="María González"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Corporativo *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="maria@techcorp.com"
                      required
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
                      placeholder="+58 212-123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Empleados *
                    </label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cuerpass-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona el rango</option>
                      <option value="5-25">5-25 empleados</option>
                      <option value="26-50">26-50 empleados</option>
                      <option value="51-100">51-100 empleados</option>
                      <option value="101-250">101-250 empleados</option>
                      <option value="250+">Más de 250 empleados</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan de Interés
                    </label>
                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cuerpass-500 focus:border-transparent"
                    >
                      <option value="">Selecciona un plan</option>
                      <option value="startup">Startup</option>
                      <option value="business">Business</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="custom">Solución Personalizada</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuéntanos sobre tus necesidades
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe los objetivos de bienestar de tu empresa, presupuesto aproximado, timeline, o cualquier requerimiento especial..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full btn-primary text-lg py-3">
                  Solicitar Demo Personalizada
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario aceptas que nos pongamos en contacto contigo. 
                  Respetamos tu privacidad y no compartimos tu información.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Información de Contacto y Beneficios */}
          <div className="space-y-8">
            {/* Información de Contacto */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cuerpass-100 rounded-full flex items-center justify-center">
                      📧
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">empresas@cuerpass.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cuerpass-100 rounded-full flex items-center justify-center">
                      📞
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Teléfono</p>
                      <p className="text-gray-600">+58 212-CUERPASS</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cuerpass-100 rounded-full flex items-center justify-center">
                      🕒
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Horario</p>
                      <p className="text-gray-600">Lun-Vie: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lo que Incluye */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                  Tu Demo Incluye:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Análisis de necesidades específicas de tu empresa</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Demostración personalizada de la plataforma</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Propuesta de ROI y métricas de bienestar</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Plan de implementación detallado</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Cotización personalizada con descuentos especiales</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-cuerpass-500 to-coral-500 text-white">
              <CardContent className="p-8">
                <div className="text-2xl mb-4">"</div>
                <p className="text-lg leading-relaxed mb-4">
                  La implementación fue súper fácil y nuestros empleados adoptaron 
                  Cuerpass inmediatamente. En 3 meses vimos una reducción del 40% 
                  en ausentismo por enfermedad.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold">Carlos Rodríguez</p>
                    <p className="text-sm opacity-90">Director de RRHH, Banco Digital</p>
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

export default CorporateContact;
