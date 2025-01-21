import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Clock, WifiOff } from "lucide-react";
import { useState } from "react";

const StatsCard = () => {
  const [isOffline, setIsOffline] = useState(false);

  return (
    <Card className="p-6 glass-card bg-green-50 border-green-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-700">
            <Clock className="h-5 w-5" />
            <span>Total Hours This Week</span>
          </div>
          <p className="text-3xl font-bold text-green-600">38.5h</p>
        </div>

        <div className="space-y-2">
          <p className="text-green-700">Last Action</p>
          <p className="text-lg font-medium text-green-800">Clocked in at 9:00 AM</p>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={isOffline}
              onCheckedChange={setIsOffline}
              className="data-[state=checked]:bg-green-500"
            />
            <span className="text-sm text-green-700">Offline Mode</span>
          </div>
          {isOffline && (
            <div className="status-badge bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
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