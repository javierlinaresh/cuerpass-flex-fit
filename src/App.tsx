
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Services = lazy(() => import("./pages/Services"));
const ServicesByCategory = lazy(() => import("./pages/ServicesByCategory"));
const CenterDetails = lazy(() => import("./pages/CenterDetails"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const ForCompanies = lazy(() => import("./pages/ForCompanies"));
const ForPartners = lazy(() => import("./pages/ForPartners"));
const Contact = lazy(() => import("./pages/Contact"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PartnerLogin = lazy(() => import("./pages/PartnerLogin"));
const PartnerRegister = lazy(() => import("./pages/PartnerRegister"));
const PartnerDashboard = lazy(() => import("./pages/PartnerDashboard"));
const PartnerSchedule = lazy(() => import("./pages/PartnerSchedule"));
const PartnerReports = lazy(() => import("./pages/PartnerReports"));
const PartnerServices = lazy(() => import("./pages/PartnerServices"));
const PartnerBookings = lazy(() => import("./pages/PartnerBookings"));
const CorporatePlans = lazy(() => import("./pages/CorporatePlans"));
const CorporateContact = lazy(() => import("./pages/CorporateContact"));
const PlanUpgrade = lazy(() => import("./pages/PlanUpgrade"));

const queryClient = new QueryClient();

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cuerpass-600"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
              <Route path="/empresas" element={<ForCompanies />} />
              <Route path="/empresas/planes" element={<CorporatePlans />} />
              <Route path="/empresas/contacto" element={<CorporateContact />} />
              <Route path="/socios" element={<ForPartners />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/actualizar-plan" element={<PlanUpgrade />} />
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
