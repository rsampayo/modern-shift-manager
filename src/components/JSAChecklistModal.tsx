import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface JSAChecklistModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const JSAChecklistModal = ({ open, onClose, onComplete }: JSAChecklistModalProps) => {
  const { toast } = useToast();
  const [checklist, setChecklist] = useState({
    ppe: false,
    hazards: false,
    equipment: false,
    emergency: false,
    communication: false
  });

  const handleSubmit = () => {
    if (Object.values(checklist).every(item => item)) {
      onComplete();
      toast({
        title: "JSA Checklist completed",
        description: "You can now proceed with clocking in."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incomplete checklist",
        description: "Please complete all safety checks before proceeding."
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Job Safety Analysis (JSA) Checklist</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ppe" 
              checked={checklist.ppe}
              onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, ppe: checked as boolean }))}
            />
            <Label htmlFor="ppe">I am wearing all required Personal Protective Equipment (PPE)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hazards" 
              checked={checklist.hazards}
              onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, hazards: checked as boolean }))}
            />
            <Label htmlFor="hazards">I have identified and assessed potential hazards in my work area</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="equipment" 
              checked={checklist.equipment}
              onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, equipment: checked as boolean }))}
            />
            <Label htmlFor="equipment">All equipment and tools have been inspected and are in good condition</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="emergency" 
              checked={checklist.emergency}
              onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, emergency: checked as boolean }))}
            />
            <Label htmlFor="emergency">I know the location of emergency equipment and exit routes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="communication" 
              checked={checklist.communication}
              onCheckedChange={(checked) => setChecklist(prev => ({ ...prev, communication: checked as boolean }))}
            />
            <Label htmlFor="communication">I have established communication methods with my team/supervisor</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-primary/20">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JSAChecklistModal;