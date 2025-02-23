import { useState, useEffect } from 'react';
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
import { Label } from '@/components/ui/label';

interface EditReceiptDialogProps {
  receipt: Receipt;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<Receipt>) => void;
    updateBillName: (billId: number, name: string) => Promise<void>;
    updateBillDate: (billId: number, date: Date) => Promise<void>;
}

export function EditReceiptDialog({
  receipt,
  open,
  onOpenChange,
  onSave,
    updateBillName,
    updateBillDate,
}: EditReceiptDialogProps) {
  const [name, setName] = useState(receipt.name);
  const [date, setDate] = useState(receipt.date.split('T')[0]);
  const [image, setImage] = useState<File>();

  useEffect(() => {
    setName(receipt.name);
    setDate(receipt.date.split('T')[0]);
  }, [receipt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updates: Partial<Receipt> = {
      name,
      date: new Date(date).toISOString(),
    };

    if (image) {
      updates.image = URL.createObjectURL(image);
    }
  
      await updateBillName(receipt.id, name);
      await updateBillDate(receipt.id, new Date(date));

    onSave(updates);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Receipt</DialogTitle>
        </DialogHeader>
        <form 
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[75vh] overflow-y-auto px-4 py-2"
          style={{
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
          }}
        >
          <style>
            {`
              form::-webkit-scrollbar {
                display: none; /* Hide scrollbar for WebKit browsers */
              }
            `}
          </style>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Receipt Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter receipt name"
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Receipt Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Receipt Image</Label>
              <PhotoUpload
                id="image"
                onChange={(file) => setImage(file)}
                image={image}
              />
            </div>
          </div>
        
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}