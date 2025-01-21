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
        <Card key={equipment.id} className="p-6 glass-card card-hover border-green-100 bg-green-50">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-green-800">{equipment.name}</h3>
              <div className={`status-badge flex items-center gap-2 ${
                equipment.status === "OK" 
                  ? "bg-green-100 text-green-800 border border-green-200" 
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}>
                {equipment.status === "OK" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <span>{equipment.status}</span>
              </div>
            </div>
            <p className="text-sm text-green-700">
              Last Check: {equipment.lastCheck}
            </p>
            <Button
              variant="outline"
              className="w-full border-green-200 hover:bg-green-50 text-green-700"
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