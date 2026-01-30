
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Gimnasios",
    description: "Acceso completo a los mejores gimnasios de la ciudad",
    icon: "🏋️‍♂️",
    count: "12 centros",
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600",
    slug: "gimnasios"
  },
  {
    id: 2,
    name: "Yoga & Pilates",
    description: "Clases de yoga, pilates y disciplinas de relajación",
    icon: "🧘‍♀️",
    count: "8 centros",
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-600",
    slug: "yoga-pilates"
  },
  {
    id: 3,
    name: "Deportes & Canchas",
    description: "Reserva canchas de pádel, fútbol, tenis y más deportes",
    icon: "⚽",
    count: "6 centros",
    color: "bg-green-500",
    gradient: "from-green-400 to-green-600",
    slug: "deportes"
  },
  {
    id: 4,
    name: "Spa & Relajación",
    description: "Masajes, tratamientos faciales y terapias de relajación",
    icon: "💆‍♀️",
    count: "5 centros",
    color: "bg-pink-500",
    gradient: "from-pink-400 to-pink-600",
    slug: "spa"
  },
  {
    id: 5,
    name: "Belleza & Estética",
    description: "Salones de belleza, peluquerías y centros estéticos",
    icon: "💄",
    count: "10 centros",
    color: "bg-coral-500",
    gradient: "from-coral-400 to-coral-600",
    slug: "belleza"
  },
  {
    id: 6,
    name: "Barberías",
    description: "Cortes de cabello, afeitado y cuidado masculino",
    icon: "✂️",
    count: "7 centros",
    color: "bg-gray-500",
    gradient: "from-gray-400 to-gray-600",
    slug: "barberias"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate(`/servicios/${slug}`);
  };

  return (
    <section id="servicios" className="py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Explora Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Desde entrenamientos intensos hasta relajación total, y desde un partido de pádel hasta un día de spa. Encuentra exactamente lo que necesitas para tu bienestar y diversión.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className={`card-hover cursor-pointer border-0 shadow-lg animate-fade-in bg-neutral-800 hover:bg-neutral-700`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCategoryClick(category.slug)}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="font-display font-semibold text-xl text-white mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="text-cuerpass-400 font-medium text-sm">
                    {category.count}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-6">¿No encuentras lo que buscas?</p>
          <button 
            className="text-cuerpass-400 hover:text-cuerpass-300 font-medium hover:underline transition-colors"
            onClick={() => navigate('/contacto')}
          >
            Solicita un servicio específico →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
