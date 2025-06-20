
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Gimnasios",
    description: "Acceso completo a los mejores gimnasios de la ciudad",
    icon: "🏋️‍♂️",
    count: "12 centros",
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: 2,
    name: "Spa & Relajación",
    description: "Masajes, tratamientos faciales y terapias de relajación",
    icon: "🧘‍♀️",
    count: "8 centros",
    color: "bg-green-500",
    gradient: "from-green-400 to-green-600"
  },
  {
    id: 3,
    name: "Belleza & Estética",
    description: "Salones de belleza, peluquerías y centros estéticos",
    icon: "💄",
    count: "15 centros",
    color: "bg-pink-500",
    gradient: "from-pink-400 to-pink-600"
  },
  {
    id: 4,
    name: "Clases & Entrenamientos",
    description: "Yoga, pilates, crossfit y entrenamientos grupales",
    icon: "🤸‍♀️",
    count: "6 centros",
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-600"
  }
];

const Categories = () => {
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Explora Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde entrenamientos intensos hasta relajación total. Encuentra exactamente lo que necesitas para tu bienestar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className={`card-hover cursor-pointer border-0 shadow-lg animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="text-cuerpass-600 font-medium text-sm">
                    {category.count}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-6">¿No encuentras lo que buscas?</p>
          <button className="text-cuerpass-600 hover:text-cuerpass-700 font-medium hover:underline transition-colors">
            Solicita un servicio específico →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
