import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Member, MenuItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ReceiptItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: MenuItem;
  members: Member[];
  currency: string;
  onSave: (item: Omit<MenuItem, 'id'>) => void;
}

export default function ReceiptItemDialog({
  open,
  onOpenChange,
  item,
  members,
  currency,
  onSave,
}: ReceiptItemDialogProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price.toString());
      setQuantity(item.quantity.toString());
      setSelectedMembers(item.assignedTo);
    } else {
      setName('');
      setPrice('');
      setQuantity('1');
      setSelectedMembers([]);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      assignedTo: selectedMembers,
    });
    onOpenChange(false);
  };

  const toggleMember = (member: Member) => {
    setSelectedMembers((prev) =>
      prev.some((m) => m.id === member.id)
        ? prev.filter((m) => m.id !== member.id)
        : [...prev, member]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Item' : 'Add Item'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ({currency})</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Split Between</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {members.map((member) => {
                  const isSelected = selectedMembers.some((m) => m.id === member.id);
                  return (
                    <Badge
                      key={member.id}
                      variant={isSelected ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleMember(member)}
                    >
                      <Avatar className="h-4 w-4 mr-1">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      {member.name}
                      {isSelected && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}