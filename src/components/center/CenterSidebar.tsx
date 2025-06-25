
import CenterInfo from "./CenterInfo";
import CenterFeatures from "./CenterFeatures";
import UserCredits from "./UserCredits";

interface CenterSidebarProps {
  center: any;
  user: any;
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
