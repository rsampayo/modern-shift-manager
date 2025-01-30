import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface JSAChecklistModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  mode: 'clockIn' | 'clockOut';
}

type ChecklistItem = "yes" | "no" | "na" | null;

interface ChecklistState {
  firstAidKit: ChecklistItem;
  fireExtinguishers: ChecklistItem;
  trafficControl: ChecklistItem;
  safetyVest: ChecklistItem;
  safetyGlasses: ChecklistItem;
  hearingProtection: ChecklistItem;
  steelToeBoots: ChecklistItem;
  dielectricGloves: ChecklistItem;
  competentPerson: ChecklistItem;
  excavationsProtected: ChecklistItem;
  trenchInspections: ChecklistItem;
  excavationsBarricaded: ChecklistItem;
  tabulatedData: ChecklistItem;
  spoilPosition: ChecklistItem;
  accessLadders: ChecklistItem;
  gfciUsed: ChecklistItem;
  extensionCords: ChecklistItem;
  loadSecured: ChecklistItem;
  seatBelts: ChecklistItem;
  wheelsChocked: ChecklistItem;
  silicaDust: ChecklistItem;
  waterControl: ChecklistItem;
  respirators: ChecklistItem;
  tableReferenced: ChecklistItem;
  incidentOccurred?: ChecklistItem;
}

const JSAChecklistModal = ({ open, onClose, onComplete, mode }: JSAChecklistModalProps) => {
  const { toast } = useToast();
  
  const [checklist, setChecklist] = useState<ChecklistState>({
    firstAidKit: null,
    fireExtinguishers: null,
    trafficControl: null,
    safetyVest: null,
    safetyGlasses: null,
    hearingProtection: null,
    steelToeBoots: null,
    dielectricGloves: null,
    competentPerson: null,
    excavationsProtected: null,
    trenchInspections: null,
    excavationsBarricaded: null,
    tabulatedData: null,
    spoilPosition: null,
    accessLadders: null,
    gfciUsed: null,
    extensionCords: null,
    loadSecured: null,
    seatBelts: null,
    wheelsChocked: null,
    silicaDust: null,
    waterControl: null,
    respirators: null,
    tableReferenced: null,
  });

  const handleSubmit = () => {
    const fieldsToCheck = mode === 'clockIn' 
      ? Object.entries(checklist).filter(([key]) => key !== 'incidentOccurred')
      : [['incidentOccurred', checklist.incidentOccurred]];

    const allAnswered = fieldsToCheck.every(([, value]) => value !== null);
    const allPositiveOrNA = mode === 'clockIn' && fieldsToCheck.every(([, value]) => value === "yes" || value === "na");

    if (!allAnswered) {
      toast({
        variant: "destructive",
        title: "Incomplete checklist",
        description: "Please answer all safety checks before proceeding."
      });
      return;
    }

    if (mode === 'clockIn' && !allPositiveOrNA) {
      toast({
        variant: "destructive",
        title: "Safety requirements not met",
        description: "All safety checks must be positive or not applicable before proceeding."
      });
      return;
    }

    onComplete();
    toast({
      title: `JSA Checklist completed`,
      description: mode === 'clockIn' ? "You can now proceed with clocking in." : "You can now proceed with clocking out."
    });
  };

  const RadioOption = ({ id, label }: { id: keyof ChecklistState; label: string }) => (
    <div className="flex items-center space-x-2">
      <RadioGroup
        value={checklist[id] || ""}
        onValueChange={(value) => setChecklist(prev => ({ ...prev, [id]: value as ChecklistItem }))}
        className="flex items-center space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id={`${id}-yes`} />
          <Label htmlFor={`${id}-yes`}>Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id={`${id}-no`} />
          <Label htmlFor={`${id}-no`}>No</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="na" id={`${id}-na`} />
          <Label htmlFor={`${id}-na`}>N/A</Label>
        </div>
      </RadioGroup>
      <Label className="flex-grow">{label}</Label>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {mode === 'clockIn' ? 'Job Safety Analysis (JSA) Checklist' : 'Post-Job Safety Review'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full pr-4">
          {mode === 'clockIn' ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pre-Job Review</h3>
                <p className="text-sm text-muted-foreground">Employees must review and discuss this JSA before starting any work task.</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">General Safety Concerns</h4>
                <div className="space-y-4">
                  <RadioOption id="firstAidKit" label="First aid kit available and properly stocked" />
                  <RadioOption id="fireExtinguishers" label="Fire extinguishers on-site, charged, and inspected" />
                  <RadioOption id="trafficControl" label="Proper traffic control devices set up" />
                </div>

                <h4 className="font-semibold">Personal Protective Equipment (PPE)</h4>
                <div className="space-y-4">
                  <RadioOption id="safetyVest" label="Safety vest (high visibility)" />
                  <RadioOption id="safetyGlasses" label="Safety glasses / Face shields / Hard hats" />
                  <RadioOption id="hearingProtection" label="Hearing protection" />
                  <RadioOption id="steelToeBoots" label="Steel Toe Boots" />
                  <RadioOption id="dielectricGloves" label="Dielectric Gloves (inspected at 6 months)" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Excavations</h4>
                <div className="space-y-4">
                  <RadioOption id="competentPerson" label="Competent person on-site" />
                  <RadioOption id="excavationsProtected" label="Excavations sloped, shored, trench boxes used" />
                  <RadioOption id="trenchInspections" label="Trench inspections completed today" />
                  <RadioOption id="excavationsBarricaded" label="Excavations barricaded or protected" />
                  <RadioOption id="tabulatedData" label="Tabulated data sheets available" />
                  <RadioOption id="spoilPosition" label="Spoil kept at least 24&quot; back from the ditch" />
                  <RadioOption id="accessLadders" label="Access ladders at least 4 feet and secured" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Electrical</h4>
                <div className="space-y-4">
                  <RadioOption id="gfciUsed" label="GFCI used on portable generators" />
                  <RadioOption id="extensionCords" label="Extension cords have ground plugs and are in good condition" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Vehicles</h4>
                <div className="space-y-4">
                  <RadioOption id="loadSecured" label="Load secured on trucks and trailers" />
                  <RadioOption id="seatBelts" label="Seat belts worn when moving" />
                  <RadioOption id="wheelsChocked" label="Wheels chocked (2 used on hills)" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Cutting Asphalt, Concrete, Breaking Concrete, etc.</h4>
                <div className="space-y-4">
                  <RadioOption id="silicaDust" label="Silica dust contained" />
                  <RadioOption id="waterControl" label="Water or other control measures used" />
                  <RadioOption id="respirators" label="Respirators used when needed" />
                  <RadioOption id="tableReferenced" label="Table 1 referenced" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Post-Job Review</h3>
                <div className="space-y-4">
                  <RadioOption id="incidentOccurred" label="Was anyone injured on the job, or did any incident occur?" />
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} className="border-primary/20">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JSAChecklistModal;
