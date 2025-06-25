
import { Card, CardContent } from "@/components/ui/card";

interface CenterGalleryProps {
  center: any;
}

const CenterGallery = ({ center }: CenterGalleryProps) => {
  // Don't render the gallery component if there's no gallery data
  if (!center.gallery || center.gallery.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">
          Galería
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {center.gallery.map((image: string, index: number) => (
            <img 
              key={index}
              src={image} 
              alt={`${center.name} ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CenterGallery;
