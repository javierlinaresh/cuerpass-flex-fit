
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Básico",
    price: 35,
    credits: 10,
    description: "Perfecto para comenzar tu rutina de bienestar",
    popular: false,
    features: [
      { name: "10 créditos mensuales", included: true },
      { name: "Acceso a gimnasios básicos", included: true },
      { name: "Servicios de belleza básicos", included: true },
      { name: "Soporte por WhatsApp", included: true },
      { name: "Créditos sin vencer", included: false },
      { name: "Servicios premium", included: false },
      { name: "Prioridad en reservas", included: false }
    ]
  },
  {
    name: "Flexible",
    price: 70,
    credits: 25,
    description: "La opción más popular para usuarios activos",
    popular: true,
    features: [
      { name: "25 créditos mensuales", included: true },
      { name: "Acceso a todos los gimnasios", included: true },
      { name: "Servicios de spa y belleza", included: true },
      { name: "Soporte prioritario", included: true },
      { name: "Créditos sin vencer por 3 meses", included: true },
      { name: "Servicios premium", included: false },
      { name: "Prioridad en reservas", included: false }
    ]
  },
  {
    name: "Total",
    price: 120,
    credits: 50,
    description: "Acceso ilimitado a toda la experiencia premium",
    popular: false,
    features: [
      { name: "50 créditos mensuales", included: true },
      { name: "Acceso completo a todos los centros", included: true },
      { name: "Todos los servicios incluidos", included: true },
      { name: "Soporte VIP 24/7", included: true },
      { name: "Créditos nunca vencen", included: true },
      { name: "Servicios premium exclusivos", included: true },
      { name: "Prioridad en todas las reservas", included: true }
    ]
  }
];

const PricingPlans = () => {
  return (
    <section id="precios" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Planes Transparentes en USD
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Sin sorpresas, sin inflación. Elige el plan que mejor se adapte a tu estilo de vida y presupuesto.
          </p>
          
          <div className="inline-flex items-center bg-cuerpass-50 rounded-full p-1 text-sm">
            <span className="px-4 py-2 bg-white rounded-full shadow-sm font-medium">Mensual</span>
            <span className="px-4 py-2 text-gray-600">
              Anual <Badge className="ml-2 bg-green-100 text-green-700">-20%</Badge>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative border-0 shadow-lg card-hover animate-slide-up ${
                plan.popular 
                  ? 'ring-2 ring-cuerpass-400 shadow-2xl transform scale-105' 
                  : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-cuerpass-500 to-coral-500 text-white px-4 py-2">
                    Más Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500 ml-1">USD/mes</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-cuerpass-600 mb-6">
                    <div className="w-8 h-8 bg-cuerpass-100 rounded-full flex items-center justify-center text-sm font-bold">
                      {plan.credits}
                    </div>
                    <span className="font-medium">créditos mensuales</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'btn-primary' 
                      : 'border-2 border-cuerpass-200 text-cuerpass-700 hover:bg-cuerpass-50'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.popular ? 'Comenzar Ahora' : 'Seleccionar Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ¿Necesitas un plan personalizado para tu empresa?
          </p>
          <Button variant="outline" className="border-2 border-cuerpass-200 text-cuerpass-700 hover:bg-cuerpass-50">
            Hablar con Ventas Corporativas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
