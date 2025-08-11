
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  full_name?: string;
  credits_remaining?: number;
  email?: string;
  credits?: number;
}

interface UserCreditsProps {
  user: User;
}

const UserCredits = ({ user }: UserCreditsProps) => {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-cuerpass-500 to-coral-500 text-white">
      <CardContent className="p-6 text-center">
        <h3 className="font-display font-semibold text-lg mb-2">
          Tus Créditos
        </h3>
        <div className="text-3xl font-bold mb-2">
          {user.credits_remaining ?? 0}
        </div>
        <p className="text-sm opacity-90 mb-4">
          Créditos disponibles
        </p>
        <Button className="bg-white text-cuerpass-600 hover:bg-gray-100 text-sm w-full">
          Comprar Más Créditos
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCredits;
