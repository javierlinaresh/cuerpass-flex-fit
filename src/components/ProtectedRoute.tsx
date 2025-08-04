import { useAuthRedirect } from "@/hooks/useAuthRedirect";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'partner';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { loading } = useAuthRedirect(requiredRole);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cuerpass-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;