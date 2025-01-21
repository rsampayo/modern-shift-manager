import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";

const SessionTab = () => {
  const [isWithinGeofence, setIsWithinGeofence] = useState(true);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const { toast } = useToast();

  const handleClockIn = () => {
    if (!isWithinGeofence) {
      toast({
        variant: "destructive",
        title: "Cannot clock in",
        description: "You are outside the valid geofence area.",
      });
      return;
    }
    setIsClockedIn(true);
    toast({
      title: "Clocked in successfully",
      description: "Your session has started.",
    });
  };

  const handleClockOut = () => {
    if (!isWithinGeofence) {
      toast({
        variant: "destructive",
        title: "Cannot clock out",
        description: "You are outside the valid geofence area.",
      });
      return;
    }
    setIsClockedIn(false);
    toast({
      title: "Clocked out successfully",
      description: "Your session has ended.",
    });
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center gap-4">
        <Switch
          checked={isWithinGeofence}
          onCheckedChange={setIsWithinGeofence}
          className="data-[state=checked]:bg-blue-500"
        />
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-gray-500">
            {isWithinGeofence ? "Inside Geofence" : "Outside Geofence"}
          </span>
        </div>
      </div>

      {!isClockedIn ? (
        <Card className="p-6 glass-card card-hover border-blue-100 bg-blue-50">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">Start Your Shift</h3>
            <p className="text-gray-500">You're currently not clocked in.</p>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 shadow-lg hover:shadow-blue-200"
              onClick={handleClockIn}
            >
              Clock In
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 glass-card card-hover border-blue-200 bg-blue-100">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-800">Active Session</h3>
              <div className="status-badge bg-blue-100 text-blue-800 border border-blue-200">Active</div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Started at: 9:00 AM</p>
              <p className="text-gray-600">Duration: 2h 30m</p>
            </div>
            <Button
              variant="outline"
              className="w-full border-blue-200 hover:bg-blue-50 text-blue-700"
              onClick={handleClockOut}
            >
              Clock Out
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SessionTab;