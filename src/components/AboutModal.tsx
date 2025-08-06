import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Award, Shield, Car, Users, Target, Phone, MessageCircle } from "lucide-react";

export function AboutModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          About Us
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            About Jomar Motors Rwanda
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Information coming soon...
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}