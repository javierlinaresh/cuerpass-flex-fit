
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    id: "basico",
    name: "Básico",
    price: 35,
    credits: 10,
    current: true,
    features: [
      "10 créditos mensuales",
      "Acceso a gimnasios básicos",
      "Servicios de belleza básicos",
      "Soporte por WhatsApp"
    ]
  },
  {
    id: "flexible",
    name: "Flexible",
    price: 70,
    credits: 25,
    recommended: true,
    features: [
      "25 créditos mensuales",
      "Acceso a todos los gimnasios",
      "Servicios de spa y belleza",
      "Soporte prioritario",
      "Créditos sin vencer por 3 meses"
    ]
  },
  {
    id: "total",
    name: "Total",
    price: 120,
    credits: 50,
    features: [
      "50 créditos mensuales",
      "Acceso completo a todos los centros",
      "Todos los servicios incluidos",
      "Soporte VIP 24/7",
      "Créditos nunca vencen",
      "Servicios premium exclusivos"
    ]
  }
];

const PlanUpgrade = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handlePlanSelect = (planId: string) => {
    navigate(`/checkout?plan=${planId}&upgrade=true`);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">
            Actualiza tu Plan
          </h1>
          <p className="text-gray-600 text-lg">
            Mejora tu experiencia con más créditos y beneficios exclusivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative border-0 shadow-lg ${
                plan.recommended ? 'ring-2 ring-cuerpass-400 transform scale-105' : ''
              } ${plan.current ? 'bg-gray-50' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-cuerpass-500 to-coral-500 text-white">
                    Recomendado
                  </Badge>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white">
                    Plan Actual
                  </Badge>
                </div>
              )}

              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">
                    {plan.name}
                  </h3>
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
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    plan.current 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : plan.recommended 
                      ? 'btn-primary' 
                      : 'border-2 border-cuerpass-200 text-cuerpass-700 hover:bg-cuerpass-50'
                  }`}
                  variant={plan.recommended ? "default" : "outline"}
                  size="lg"
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={plan.current}
                >
                  {plan.current ? 'Plan Actual' : 'Seleccionar Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-gray-600"
          >
            ← Volver al Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanUpgrade;
