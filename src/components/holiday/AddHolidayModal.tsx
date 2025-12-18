import { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface AddHolidayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddHolidayModal({ open, onOpenChange }: AddHolidayModalProps) {
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [isGovernment, setIsGovernment] = useState(false);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Success',
      description: 'Holiday added successfully',
    });
    
    onOpenChange(false);
    setHolidayName('');
    setHolidayDate('');
    setIsGovernment(false);
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-h3 font-medium text-card-foreground">Add Holiday</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new holiday to the calendar
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="holiday-name" className="text-foreground">Holiday Name</Label>
            <Input
              id="holiday-name"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
              placeholder="e.g., Christmas Day"
              required
              className="bg-background text-foreground border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="holiday-date" className="text-foreground">Date</Label>
            <Input
              id="holiday-date"
              type="date"
              value={holidayDate}
              onChange={(e) => setHolidayDate(e.target.value)}
              required
              className="bg-background text-foreground border-input"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="government-holiday" className="text-foreground">
              Government Holiday
            </Label>
            <Switch
              id="government-holiday"
              checked={isGovernment}
              onCheckedChange={setIsGovernment}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">Notes (Optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes"
              className="bg-background text-foreground border-input"
            />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Calendar className="mr-2 h-5 w-5" strokeWidth={1.5} />
            Add Holiday
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
