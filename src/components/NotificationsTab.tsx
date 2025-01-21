import { Card } from "@/components/ui/card";
import { Bell, Clock, Tool } from "lucide-react";

const mockNotifications = [
  {
    id: "N1",
    title: "Shift Reminder",
    message: "Your shift starts in 30 minutes.",
    type: "reminder",
    timestamp: "10 minutes ago",
  },
  {
    id: "N2",
    title: "Maintenance Alert",
    message: "Truck A requires an oil change.",
    type: "maintenance",
    timestamp: "1 hour ago",
  },
];

const NotificationsTab = () => {
  return (
    <div className="space-y-6 py-4">
      {mockNotifications.map((notification) => (
        <Card key={notification.id} className="p-6 glass-card card-hover">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {notification.type === "reminder" ? (
                  <Clock className="h-5 w-5 text-primary" />
                ) : (
                  <Tool className="h-5 w-5 text-primary" />
                )}
                <h3 className="text-lg font-semibold">{notification.title}</h3>
              </div>
              <span className="text-sm text-gray-500">{notification.timestamp}</span>
            </div>
            <p className="text-gray-600">{notification.message}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotificationsTab;