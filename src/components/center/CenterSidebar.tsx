
import CenterInfo from "./CenterInfo";
import CenterFeatures from "./CenterFeatures";
import UserCredits from "./UserCredits";

interface Center {
  id: number;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  description: string;
  amenities?: string[];
  features: string[];
  gallery?: string[];
  phone: string;
  hours: string;
  services: Array<{
    name: string;
    description: string;
    credits: number;
    instructor?: string;
    barber?: string;
    therapist?: string;
    coach?: string;
    stylist?: string;
    esthetician?: string;
  }>;
}

interface User {
  id: string;
  full_name?: string;
  credits_remaining?: number;
  email?: string;
}

interface CenterSidebarProps {
  center: Center;
  user: User;
  isAuthenticated: boolean;
}

const CenterSidebar = ({ center, user, isAuthenticated }: CenterSidebarProps) => {
  return (
    <div className="space-y-6">
      <CenterInfo center={center} />
      <CenterFeatures center={center} />
      {isAuthenticated && user && (
        <UserCredits user={user} />
      )}
    </div>
  );
};

export default CenterSidebar;
