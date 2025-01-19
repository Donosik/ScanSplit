import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Member, ReceiptItem } from '@/types';

// Import the new SplitBetween component
import { SplitBetween } from '@/components/groups/detail/SplitBetween.tsx';

interface ReceiptItemFormProps {
  item?: ReceiptItem;
  members: Member[];
  currency?: string;
  onSave: (item: Omit<ReceiptItem, 'id'>) => void;
  onCancel: () => void;
}

export default function ReceiptItemForm({
  item,
  members,
  currency = 'USD',
  onSave,
  onCancel,
}: ReceiptItemFormProps) {
  const [name, setName] = useState(item?.name || '');
  const [price, setPrice] = useState(item?.price.toString() || '');
  const [quantity, setQuantity] = useState(item?.quantity.toString() || '1');
  const [assignedMembers, setAssignedMembers] = useState<Member[]>(
    item?.assignedTo || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      assignedTo: assignedMembers,
    });
  };

  // Called when user picks a member from the Select
  const handleAddMember = (memberId: string) => {
    const member = members.find((m) => m.id.toString() === memberId);
    if (member && !assignedMembers.find((m) => m.id === member.id)) {
      setAssignedMembers((prev) => [...prev, member]);
    }
  };

  // Called when user clicks remove on a member
  const handleRemoveMember = (memberId: number) => {
    setAssignedMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Item name */}
      <div className="space-y-2">
        <Label htmlFor="name">Item Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item name"
          required
        />
      </div>

      {/* Price & Quantity */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {currency}
            </span>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="pl-12"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
      </div>

      {/* Split Between (extracted to separate component) */}
      <SplitBetween
        members={members}
        assignedMembers={assignedMembers}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <PlusCircle className="mr-2 h-4 w-4" />
          {item ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
}