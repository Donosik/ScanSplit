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
  }
  
  export function EditReceiptDialog({
    receipt,
    open,
    onOpenChange,
    onSave,
  }: EditReceiptDialogProps) {
    const [name, setName] = useState(receipt.name);
    const [date, setDate] = useState(receipt.date.split('T')[0]);
    const [image, setImage] = useState<File>();
  
    useEffect(() => {
      setName(receipt.name);
      setDate(receipt.date.split('T')[0]);
    }, [receipt]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const updates: Partial<Receipt> = {
        name,
        date: new Date(date).toISOString(),
      };
  
      if (image) {
        updates.image = URL.createObjectURL(image);
      }
  
      onSave(updates);
    };
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Receipt</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Receipt Image</Label>
                <PhotoUpload
                  currentImage={receipt.image}
                  onImageChange={setImage}
                  variant="receipt"
                  className="mt-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }