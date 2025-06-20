
import Header from "@/components/Header";

const PartnerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">
          Panel de Socio
        </h1>
        <p className="text-gray-600">
          Dashboard para gestionar reservas, servicios y estadísticas del negocio
        </p>
      </div>
    </div>
  );
};

export default PartnerDashboard;
