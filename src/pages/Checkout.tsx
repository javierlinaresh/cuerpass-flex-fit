
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Smartphone, Building, DollarSign } from "lucide-react";

const paymentMethods = [
  {
    id: "tarjeta",
    name: "Tarjeta Débito/Crédito",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
    fees: "Comisión bancaria aplicable"
  },
  {
    id: "pago-movil",
    name: "Pago Móvil",
    icon: Smartphone,
    description: "Transferencia desde tu banco móvil",
    fees: "Sin comisión"
  },
  {
    id: "transferencia",
    name: "Transferencia Bancaria",
    icon: Building,
    description: "Transferencia en bolívares",
    fees: "Sin comisión"
  },
  {
    id: "zelle",
    name: "Zelle",
    icon: DollarSign,
    description: "Pago en USD",
    fees: "Al cambio del día"
  },
  {
    id: "binance",
    name: "Binance Pay",
    icon: CreditCard,
    description: "Pago con criptomonedas",
    fees: "Tasa preferencial"
  }
];

const plans = {
  basico: { name: "Básico", price: 35, credits: 10 },
  flexible: { name: "Flexible", price: 70, credits: 25 },
  total: { name: "Total", price: 120, credits: 50 }
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const planId = searchParams.get('plan') || 'flexible';
  const isUpgrade = searchParams.get('upgrade') === 'true';
  const plan = plans[planId as keyof typeof plans] || plans.flexible;
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reference: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Por favor selecciona un método de pago",
        variant: "destructive"
      });
      return;
    }

    console.log('Payment processing:', { plan, method: selectedMethod, formData, isUpgrade });
    
    toast({
      title: "¡Pago Procesado!",
      description: isUpgrade 
        ? "Tu plan ha sido actualizado exitosamente." 
        : "Te hemos enviado los detalles por email. Tu cuenta será activada en 24 horas.",
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white overflow-x-hidden">
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            {isUpgrade ? 'Actualizar Plan' : 'Finalizar Suscripción'}
          </h1>
          <p className="text-gray-600">
            {isUpgrade ? 'Confirma la actualización de tu plan' : 'Completa tu pago y comienza a disfrutar de Cuerpass'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">
                  {isUpgrade ? 'Nuevo Plan' : 'Resumen del Plan'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Badge className="bg-cuerpass-100 text-cuerpass-700 mb-3">
                    Plan {plan.name}
                  </Badge>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ${plan.price} USD
                  </div>
                  <p className="text-sm text-gray-600 mb-4">por mes</p>
                  <div className="flex items-center justify-center space-x-2 text-cuerpass-600">
                    <div className="w-6 h-6 bg-cuerpass-100 rounded-full flex items-center justify-center text-sm font-bold">
                      {plan.credits}
                    </div>
                    <span className="text-sm">créditos mensuales</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${plan.price} USD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Impuestos:</span>
                    <span>Incluidos</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${plan.price} USD</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Método de Pago</CardTitle>
                <p className="text-gray-600">Selecciona tu método de pago preferido</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedMethod === method.id
                          ? 'border-cuerpass-500 bg-cuerpass-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <method.icon className="w-6 h-6 text-cuerpass-600" />
                        <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                      <p className="text-xs text-green-600">{method.fees}</p>
                    </div>
                  ))}
                </div>

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
                        Teléfono *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+58 414 123-4567"
                        required
                      />
                    </div>
                    
                    {selectedMethod !== 'tarjeta' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Referencia de Pago
                        </label>
                        <Input
                          name="reference"
                          value={formData.reference}
                          onChange={handleChange}
                          placeholder="Número de referencia (opcional)"
                        />
                      </div>
                    )}
                  </div>

                  {selectedMethod === 'tarjeta' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Datos de la Tarjeta</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Número de Tarjeta *
                          </label>
                          <Input
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha de Vencimiento *
                          </label>
                          <Input
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <Input
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre en la Tarjeta *
                          </label>
                          <Input
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            placeholder="María González"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod && selectedMethod !== 'tarjeta' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Instrucciones de Pago - {paymentMethods.find(m => m.id === selectedMethod)?.name}
                      </h4>
                      {selectedMethod === 'pago-movil' && (
                        <div className="text-sm text-blue-800">
                          <p>• Realiza la transferencia a: <strong>0414-1234567</strong></p>
                          <p>• Banco Banesco - C.I: V-12.345.678</p>
                          <p>• Monto: <strong>{plan.price * 28} Bs</strong> (al cambio del día)</p>
                        </div>
                      )}
                      {selectedMethod === 'transferencia' && (
                        <div className="text-sm text-blue-800">
                          <p>• Cuenta: <strong>0134-0123-12-1234567890</strong></p>
                          <p>• Banco Banesco - Cuerpass Services C.A.</p>
                          <p>• RIF: J-12345678-9</p>
                        </div>
                      )}
                      {selectedMethod === 'zelle' && (
                        <div className="text-sm text-blue-800">
                          <p>• Email: <strong>pagos@cuerpass.com</strong></p>
                          <p>• Nombre: Cuerpass Services</p>
                          <p>• Monto: <strong>${plan.price} USD</strong></p>
                        </div>
                      )}
                      {selectedMethod === 'binance' && (
                        <div className="text-sm text-blue-800">
                          <p>• ID Binance: <strong>123456789</strong></p>
                          <p>• Email: pagos@cuerpass.com</p>
                          <p>• Acepta: USDT, BUSD, BTC</p>
                        </div>
                      )}
                    </div>
                  )}

                  <Button type="submit" className="w-full btn-primary text-lg py-3">
                    {isUpgrade ? `Actualizar a ${plan.name} - $${plan.price} USD` : `Confirmar Pago - $${plan.price} USD`}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Al confirmar el pago aceptas nuestros términos y condiciones. 
                    {isUpgrade ? 'Tu plan se actualizará inmediatamente.' : 'Tu suscripción se activará una vez confirmemos el pago.'}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
