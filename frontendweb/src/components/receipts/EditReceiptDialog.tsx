import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { PhotoUpload } from '@/components/shared/PhotoUpload';
  import { Receipt } from '@/types';
  import { useState } from 'react';
  import { Calendar } from '@/components/ui/calendar';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { CalendarIcon } from 'lucide-react';
  import { format } from 'date-fns';
  import { cn } from '@/lib/utils';
  
  interface EditReceiptDialogProps {
    receipt: Receipt;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (receipt: Partial<Receipt>) => void;
  }
  
  export function EditReceiptDialog({
    receipt,
    open,
    onOpenChange,
    onSave,
  }: EditReceiptDialogProps) {
    const [name, setName] = useState(receipt.name);
    const [date, setDate] = useState<Date>(new Date(receipt.date));
    const [image, setImage] = useState<string>(receipt.image);
  
    const handleSave = () => {
      onSave({
        id: receipt.id,
        name,
        date: date.toISOString(),
        image,
      });
      onOpenChange(false);
    };
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Receipt</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <PhotoUpload
              currentImage={image}
              onImageChange={(file) => {
                const url = URL.createObjectURL(file);
                setImage(url);
              }}
              aspectRatio="4:3"
              variant="receipt"
            />
            <div className="grid gap-2">
              <Input
                placeholder="Receipt Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }