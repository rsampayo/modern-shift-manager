import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockEquipment = [
  {
    id: "EQ001",
    name: "Loader Machine #1",
    status: "OK",
    lastCheck: "2024-01-10",
  },
  {
    id: "EQ002",
    name: "Truck A",
    status: "Needs Maintenance",
    lastCheck: "2024-01-05",
  },
];

const EquipmentTab = () => {
  const { toast } = useToast();

  const handleReport = () => {
    toast({
      title: "Malfunction Reported",
      description: "Your report has been submitted successfully.",
    });
  };

  return (
    <div className="space-y-6 py-4">
      {mockEquipment.map((equipment) => (
        <Card key={equipment.id} className="p-6 glass-card card-hover">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{equipment.name}</h3>
              <div className={`status-badge ${
                equipment.status === "OK" ? "status-active" : "status-offline"
              }`}>
                <div className="flex items-center gap-2">
                  {equipment.status === "OK" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <span>{equipment.status}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Last Check: {equipment.lastCheck}
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleReport}
            >
              Report Issue
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EquipmentTab;