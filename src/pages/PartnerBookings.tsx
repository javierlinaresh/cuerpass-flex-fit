
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PartnerBookings = () => {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || profile?.role !== 'partner') {
      navigate('/auth');
    }
  }, [isAuthenticated, profile?.role, navigate]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const bookings = [
    {
      id: "R001",
      customer: "María González",
      service: "Day Pass Completo",
      date: "2024-01-15",
      time: "09:00",
      credits: 3,
      status: "confirmada",
      phone: "+58 412-123-4567"
    },
    {
      id: "R002",
      customer: "Carlos Rodríguez",
      service: "Masaje Relajante",
      date: "2024-01-15",
      time: "14:30",
      credits: 4,
      status: "en_proceso",
      phone: "+58 424-987-6543"
    },
    {
      id: "R003",
      customer: "Ana Martínez",
      service: "Facial Hidratante",
      date: "2024-01-14",
      time: "16:00",
      credits: 3,
      status: "completada",
      phone: "+58 414-555-0123"
    },
    {
      id: "R004",
      customer: "Luis Pérez",
      service: "Day Pass Completo",
      date: "2024-01-14",
      time: "11:00",
      credits: 3,
      status: "cancelada",
      phone: "+58 426-111-2222"
    },
    {
      id: "R005",
      customer: "Carmen Silva",
      service: "Masaje Relajante",
      date: "2024-01-13",
      time: "15:30",
      credits: 4,
      status: "completada",
      phone: "+58 412-333-4444"
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmada: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Confirmada' },
      en_proceso: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En Proceso' },
      completada: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completada' },
      cancelada: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelada' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.bg} ${config.text}`}>
        {config.label}
      </Badge>
    );
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/socios/dashboard')}
            className="mb-4"
          >
            ← Volver al Dashboard
          </Button>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Historial de Reservas - {profile.business_name || profile.full_name}
          </h1>
          <p className="text-gray-600">
            Gestiona y revisa todas las reservas de tu negocio
          </p>
        </div>

        {/* Filtros */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por cliente, servicio o ID de reserva..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select 
                  className="w-full md:w-48 p-2 border border-gray-300 rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="completada">Completada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas Rápidas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {bookings.filter(b => b.status === 'confirmada').length}
              </div>
              <p className="text-sm text-gray-600">Confirmadas</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {bookings.filter(b => b.status === 'en_proceso').length}
              </div>
              <p className="text-sm text-gray-600">En Proceso</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {bookings.filter(b => b.status === 'completada').length}
              </div>
              <p className="text-sm text-gray-600">Completadas</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {bookings.filter(b => b.status === 'cancelada').length}
              </div>
              <p className="text-sm text-gray-600">Canceladas</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Reservas */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-display text-xl">
              Reservas Recientes ({filteredBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Créditos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.customer}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>{booking.credits}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {booking.status === 'confirmada' && (
                          <Button size="sm" variant="outline">
                            Marcar En Proceso
                          </Button>
                        )}
                        {booking.status === 'en_proceso' && (
                          <Button size="sm" className="btn-primary">
                            Completar
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          Ver Detalles
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron reservas con los filtros aplicados.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerBookings;
