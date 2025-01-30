import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Clock, WifiOff } from "lucide-react";
import { useState } from "react";

const StatsCard = () => {
  const [isOffline, setIsOffline] = useState(false);

  return (
    <Card className="p-4 glass-card bg-white/80 border-primary/20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary text-sm">
              <Clock className="h-4 w-4" />
              <span>Total Hours This Week</span>
            </div>
            <p className="text-2xl font-bold text-primary">38.5h</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-primary">Last Action</p>
            <p className="text-primary">Clocked in at 9:00 AM</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={isOffline}
              onCheckedChange={setIsOffline}
              className="data-[state=checked]:bg-secondary"
            />
            <span className="text-sm text-primary">Offline Mode</span>
          </div>
          {isOffline && (
            <div className="status-badge bg-primary/20 text-primary flex items-center gap-1">
              <WifiOff className="h-3.5 w-3.5" />
              <span>OFFLINE</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;