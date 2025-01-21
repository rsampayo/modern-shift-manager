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
          className="data-[state=checked]:bg-secondary"
        />
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary/80">
            {isWithinGeofence ? "Inside Geofence" : "Outside Geofence"}
          </span>
        </div>
      </div>

      {!isClockedIn ? (
        <Card className="p-6 glass-card card-hover border-primary/20 bg-white/80">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Start Your Shift</h3>
            <p className="text-primary/80">You're currently not clocked in.</p>
            <Button
              className="w-full bg-primary hover:bg-primary-hover text-white transition-all duration-300 shadow-lg hover:shadow-primary/20"
              onClick={handleClockIn}
            >
              Clock In
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 glass-card card-hover border-primary/20 bg-white/80">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">Active Session</h3>
              <div className="status-badge bg-secondary/20 text-primary border border-secondary/20">Active</div>
            </div>
            <div className="space-y-2">
              <p className="text-primary/80">Started at: 9:00 AM</p>
              <p className="text-primary/80">Duration: 2h 30m</p>
            </div>
            <Button
              variant="outline"
              className="w-full border-primary/20 hover:bg-primary/5 text-primary"
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