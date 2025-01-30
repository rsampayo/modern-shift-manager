import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JSAChecklistModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const JSAChecklistModal = ({ open, onClose, onComplete }: JSAChecklistModalProps) => {
  const { toast } = useToast();
  
  const [checklist, setChecklist] = useState({
    // General Safety
    firstAidKit: false,
    fireExtinguishers: false,
    trafficControl: false,
    // PPE
    safetyVest: false,
    safetyGlasses: false,
    hearingProtection: false,
    steelToeBoots: false,
    dielectricGloves: false,
    // Excavations
    competentPerson: false,
    excavationsProtected: false,
    trenchInspections: false,
    excavationsBarricaded: false,
    tabulatedData: false,
    spoilPosition: false,
    accessLadders: false,
    // Electrical
    gfciUsed: false,
    extensionCords: false,
    // Vehicles
    loadSecured: false,
    seatBelts: false,
    wheelsChocked: false,
    // Cutting
    silicaDust: false,
    waterControl: false,
    respirators: false,
    tableReferenced: false,
  });

  const handleSubmit = () => {
    const allChecked = Object.values(checklist).every(value => value === true);

    if (!allChecked) {
      toast({
        variant: "destructive",
        title: "Incomplete checklist",
        description: "Please complete all safety checks before proceeding."
      });
      return;
    }

    onComplete();
    toast({
      title: "JSA Checklist completed",
      description: "You can now proceed with clocking in."
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">Job Safety Analysis (JSA) Checklist</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pre-Job Review</h3>
              <p className="text-sm text-muted-foreground">Employees must review and discuss this JSA before starting any work task.</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">General Safety Concerns</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="firstAidKit" 
                    checked={checklist.firstAidKit}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, firstAidKit: checked as boolean }))}
                  />
                  <Label htmlFor="firstAidKit">First aid kit available and properly stocked</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fireExtinguishers" 
                    checked={checklist.fireExtinguishers}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, fireExtinguishers: checked as boolean }))}
                  />
                  <Label htmlFor="fireExtinguishers">Fire extinguishers on-site, charged, and inspected</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="trafficControl" 
                    checked={checklist.trafficControl}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, trafficControl: checked as boolean }))}
                  />
                  <Label htmlFor="trafficControl">Proper traffic control devices set up</Label>
                </div>
              </div>

              <h4 className="font-semibold">Personal Protective Equipment (PPE)</h4>
              <div className="space-y-2 pl-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="safetyVest"
                    checked={checklist.safetyVest}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, safetyVest: checked as boolean }))}
                  />
                  <Label htmlFor="safetyVest">Safety vest (high visibility)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="safetyGlasses"
                    checked={checklist.safetyGlasses}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, safetyGlasses: checked as boolean }))}
                  />
                  <Label htmlFor="safetyGlasses">Safety glasses / Face shields / Hard hats</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hearingProtection"
                    checked={checklist.hearingProtection}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, hearingProtection: checked as boolean }))}
                  />
                  <Label htmlFor="hearingProtection">Hearing protection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="steelToeBoots"
                    checked={checklist.steelToeBoots}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, steelToeBoots: checked as boolean }))}
                  />
                  <Label htmlFor="steelToeBoots">Steel Toe Boots</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="dielectricGloves"
                    checked={checklist.dielectricGloves}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, dielectricGloves: checked as boolean }))}
                  />
                  <Label htmlFor="dielectricGloves">Dielectric Gloves (inspected at 6 months)</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Excavations</h4>
              {[
                { id: 'competentPerson', label: 'Competent person on-site' },
                { id: 'excavationsProtected', label: 'Excavations sloped, shored, trench boxes used' },
                { id: 'trenchInspections', label: 'Trench inspections completed today' },
                { id: 'excavationsBarricaded', label: 'Excavations barricaded or protected' },
                { id: 'tabulatedData', label: 'Tabulated data sheets available' },
                { id: 'spoilPosition', label: 'Spoil kept at least 24" back from the ditch' },
                { id: 'accessLadders', label: 'Access ladders at least 4 feet and secured' },
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={id}
                    checked={checklist[id as keyof typeof checklist]}
                    onCheckedChange={(checked) => 
                      setChecklist(prev => ({ ...prev, [id]: checked as boolean }))
                    }
                  />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Electrical</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="gfciUsed" 
                    checked={checklist.gfciUsed}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, gfciUsed: checked as boolean }))}
                  />
                  <Label htmlFor="gfciUsed">GFCI used on portable generators</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="extensionCords" 
                    checked={checklist.extensionCords}
                    onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, extensionCords: checked as boolean }))}
                  />
                  <Label htmlFor="extensionCords">Extension cords have ground plugs and are in good condition</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Vehicles</h4>
              <div className="space-y-2">
                {[
                  { id: 'loadSecured', label: 'Load secured on trucks and trailers' },
                  { id: 'seatBelts', label: 'Seat belts worn when moving' },
                  { id: 'wheelsChocked', label: 'Wheels chocked (2 used on hills)' },
                ].map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={id}
                      checked={checklist[id as keyof typeof checklist]}
                      onCheckedChange={(checked) => 
                        setChecklist(prev => ({ ...prev, [id]: checked as boolean }))
                      }
                    />
                    <Label htmlFor={id}>{label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Cutting Asphalt, Concrete, Breaking Concrete, etc.</h4>
              <div className="space-y-2">
                {[
                  { id: 'silicaDust', label: 'Silica dust contained' },
                  { id: 'waterControl', label: 'Water or other control measures used' },
                  { id: 'respirators', label: 'Respirators used when needed' },
                  { id: 'tableReferenced', label: 'Table 1 referenced' },
                ].map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={id}
                      checked={checklist[id as keyof typeof checklist]}
                      onCheckedChange={(checked) => 
                        setChecklist(prev => ({ ...prev, [id]: checked as boolean }))
                      }
                    />
                    <Label htmlFor={id}>{label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
