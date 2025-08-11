
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import ServicesByCategory from "./pages/ServicesByCategory";
import CenterDetails from "./pages/CenterDetails";
import HowItWorks from "./pages/HowItWorks";
import ForCompanies from "./pages/ForCompanies";
import ForPartners from "./pages/ForPartners";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerRegister from "./pages/PartnerRegister";
import PartnerDashboard from "./pages/PartnerDashboard";
import PartnerSchedule from "./pages/PartnerSchedule";
import PartnerReports from "./pages/PartnerReports";
import PartnerServices from "./pages/PartnerServices";
import PartnerBookings from "./pages/PartnerBookings";
import CorporatePlans from "./pages/CorporatePlans";
import CorporateContact from "./pages/CorporateContact";
import PlanUpgrade from "./pages/PlanUpgrade";
import Pricing from "./pages/Pricing";
import Membership from "./pages/Membership";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
            <Route path="/empresas" element={<ForCompanies />} />
            <Route path="/precios" element={<Pricing />} />
            <Route path="/mi-membresia" element={<ProtectedRoute requiredRole="customer"><Membership /></ProtectedRoute>} />
            <Route path="/empresas/planes" element={<CorporatePlans />} />
            <Route path="/empresas/contacto" element={<CorporateContact />} />
            <Route path="/socios" element={<ForPartners />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<ProtectedRoute requiredRole="customer"><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute requiredRole="customer"><Profile /></ProtectedRoute>} />
            <Route path="/actualizar-plan" element={<ProtectedRoute requiredRole="customer"><PlanUpgrade /></ProtectedRoute>} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/servicios/:categoria" element={<ServicesByCategory />} />
            <Route path="/centro/:id" element={<CenterDetails />} />
            <Route path="/socios/login" element={<PartnerLogin />} />
            <Route path="/socios/registro" element={<PartnerRegister />} />
            <Route path="/socios/dashboard" element={<PartnerDashboard />} />
            <Route path="/socios/horarios" element={<PartnerSchedule />} />
            <Route path="/socios/reportes" element={<PartnerReports />} />
            <Route path="/socios/servicios" element={<PartnerServices />} />
            <Route path="/socios/reservas" element={<PartnerBookings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
