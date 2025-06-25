
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CenterFeaturesProps {
  center: any;
}

const CenterFeatures = ({ center }: CenterFeaturesProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
          Características
        </h3>
        <div className="flex flex-wrap gap-2">
          {center.features.map((feature: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CenterFeatures;
