
import { Card, CardContent } from "@/components/ui/card";

const TrustedCompanies = () => {
  const companies = [
    { name: "Banco Provincial", logo: "🏦" },
    { name: "PDVSA", logo: "⛽" },
    { name: "Empresas Polar", logo: "🍺" },
    { name: "TechCorp", logo: "💻" },
    { name: "MercadoLibre", logo: "🛒" },
    { name: "Banesco", logo: "🏧" },
    { name: "Digitel", logo: "📱" },
    { name: "Makro", logo: "🏪" }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
            Empresas que Confían en Nosotros
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Más de 150 empresas líderes en Venezuela ya están transformando 
            el bienestar de sus equipos con Cuerpass
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {companies.map((company, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all bg-gray-50 hover:bg-white">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-3">{company.logo}</div>
                <p className="font-semibold text-gray-700 text-sm">{company.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-cuerpass-600">150+</div>
              <div className="text-sm">Empresas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cuerpass-600">25,000+</div>
              <div className="text-sm">Empleados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cuerpass-600">95%</div>
              <div className="text-sm">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cuerpass-600">40%</div>
              <div className="text-sm">Menos Ausentismo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedCompanies;
