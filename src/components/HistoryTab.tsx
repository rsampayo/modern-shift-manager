import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockHistory = [
  {
    id: "SHIFT001",
    date: "2024-01-15",
    clockIn: "09:00 AM",
    clockOut: "05:00 PM",
    duration: "8h",
    status: "Completed",
  },
  {
    id: "SHIFT002",
    date: "2024-01-16",
    clockIn: "08:30 AM",
    clockOut: "04:30 PM",
    duration: "8h",
    status: "Completed",
  },
];

const HistoryTab = () => {
  return (
    <div className="space-y-6 py-4">
      {mockHistory.map((shift) => (
        <Card key={shift.id} className="p-6 glass-card card-hover">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Shift #{shift.id}</h3>
              <div className="status-badge status-completed">{shift.status}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Clock In</p>
                <p className="font-medium">{shift.clockIn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Clock Out</p>
                <p className="font-medium">{shift.clockOut}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{shift.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{shift.duration}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HistoryTab;