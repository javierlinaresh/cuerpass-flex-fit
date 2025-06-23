
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Regístrate y Obtén Créditos",
      description: "Crea tu cuenta y elige el plan que mejor se adapte a ti. Recibes créditos que puedes usar en cualquier centro afiliado.",
      icon: "💳"
    },
    {
      number: "2",
      title: "Explora Centros",
      description: "Navega por nuestra red curada de gimnasios, spas y salones de belleza en Caracas. Cada centro tiene servicios únicos.",
      icon: "🔍"
    },
    {
      number: "3",
      title: "Reserva con Créditos",
      description: "Selecciona el servicio que deseas, elige fecha y hora. Paga directamente con tus créditos sin complicaciones.",
      icon: "📅"
    },
    {
      number: "4",
      title: "Disfruta la Experiencia",
      description: "Presenta tu código QR en el centro y disfruta tu experiencia de bienestar. ¡Así de simple!",
      icon: "✨"
    }
  ];

  const benefits = [
    {
      title: "Flexibilidad Total",
      description: "Un solo plan para acceder a gimnasios, spas y salones",
      icon: "🎯"
    },
    {
      title: "Sin Compromisos",
      description: "Cambia de centro cuando quieras, sin ataduras",
      icon: "🔓"
    },
    {
      title: "Ahorro Garantizado",
      description: "Hasta 50% menos que pagar individualmente",
      icon: "💰"
    },
    {
      title: "Calidad Asegurada",
      description: "Todos nuestros centros son verificados y curados",
      icon: "⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            ¿Cómo Funciona Cuerpass?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            El sistema de bienestar más flexible de Caracas. 
            <span className="text-cuerpass-600 font-semibold"> Un plan, múltiples experiencias.</span>
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="w-12 h-12 bg-cuerpass-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="font-display font-bold text-3xl text-center text-gray-900 mb-12">
            ¿Por Qué Elegir Cuerpass?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Credit System */}
        <div className="bg-gradient-to-r from-cuerpass-500 to-coral-500 rounded-2xl text-white p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl mb-4">
              Sistema de Créditos
            </h2>
            <p className="text-lg opacity-90">
              Cada servicio tiene un valor en créditos. ¡Así de simple!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">Gimnasio Completo</h3>
              <div className="text-3xl font-bold mb-2">3</div>
              <p className="text-sm opacity-90">créditos por día</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">Masaje o Facial</h3>
              <div className="text-3xl font-bold mb-2">4</div>
              <p className="text-sm opacity-90">créditos por sesión</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">Clases Grupales</h3>
              <div className="text-3xl font-bold mb-2">2</div>
              <p className="text-sm opacity-90">créditos por clase</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">
            ¿Listo para Comenzar?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a cientos de personas que ya disfrutan la flexibilidad de Cuerpass
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="btn-primary text-lg px-8 py-3">
                Crear Cuenta Gratis
              </Button>
            </Link>
            <Link to="/servicios">
              <Button variant="outline" className="text-lg px-8 py-3 border-2 border-cuerpass-500 text-cuerpass-600 hover:bg-cuerpass-50">
                Ver Centros Disponibles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
