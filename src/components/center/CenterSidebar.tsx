
import CenterInfo from "./CenterInfo";
import CenterFeatures from "./CenterFeatures";
import UserCredits from "./UserCredits";
import { Business, User } from "@/types";

interface CenterSidebarProps {
  center: Business;
  user: User | null;
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
