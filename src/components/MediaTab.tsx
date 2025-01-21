import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface MediaCapture {
  id: string;
  type: "photo" | "video";
  timestamp: string;
  location: string;
}

const MediaTab = () => {
  const { toast } = useToast();
  const [captures, setCaptures] = useState<MediaCapture[]>([]);

  const handleCapture = (type: "photo" | "video") => {
    const newCapture = {
      id: Date.now().toString(),
      type,
      timestamp: new Date().toLocaleTimeString(),
      location: "37.422, -122.084",
    };
    setCaptures([newCapture, ...captures]);
    toast({
      title: `${type === "photo" ? "Photo" : "Video"} captured`,
      description: "Location data embedded successfully.",
    });
  };

  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-24"
          onClick={() => handleCapture("photo")}
        >
          <div className="flex flex-col items-center gap-2">
            <Camera className="h-6 w-6" />
            <span>Capture Photo</span>
          </div>
        </Button>
        <Button
          variant="outline"
          className="h-24"
          onClick={() => handleCapture("video")}
        >
          <div className="flex flex-col items-center gap-2">
            <Video className="h-6 w-6" />
            <span>Record Video</span>
          </div>
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Captured Media</h3>
        {captures.map((capture) => (
          <Card key={capture.id} className="p-4 glass-card card-hover">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {capture.type === "photo" ? (
                  <Camera className="h-4 w-4 text-gray-500" />
                ) : (
                  <Video className="h-4 w-4 text-gray-500" />
                )}
                <span className="font-medium">
                  {capture.type === "photo" ? "Photo" : "Video"}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {capture.timestamp}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Location: {capture.location}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MediaTab;