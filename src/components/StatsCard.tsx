import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Clock, WifiOff } from "lucide-react";
import { useState } from "react";

const StatsCard = () => {
  const [isOffline, setIsOffline] = useState(false);

  return (
    <Card className="p-6 glass-card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-5 w-5" />
            <span>Total Hours This Week</span>
          </div>
          <p className="text-2xl font-bold text-primary">38.5h</p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-500">Last Action</p>
          <p className="text-lg font-medium">Clocked in at 9:00 AM</p>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={isOffline}
              onCheckedChange={setIsOffline}
            />
            <span className="text-sm text-gray-500">Offline Mode</span>
          </div>
          {isOffline && (
            <div className="status-badge status-offline flex items-center gap-1">
              <WifiOff className="h-4 w-4" />
              <span>OFFLINE</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;