import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Member } from '@/types';
import { SplitBetween } from './SplitBetween'; // Your existing multi-member component

interface PaidByProps {
  receiptId: number;                 // To identify which receipt we're updating
  currentPaidBy: string;            // The *name* (or username) of who paid
  allMembers: Member[];             // All possible members
  onChangePaidBy: (receiptId: number, newPaidBy: number) => void;
}

export function PaidBy({
  receiptId,
  currentPaidBy,
  allMembers,
  onChangePaidBy,
}: PaidByProps) {
  const [isOpen, setIsOpen] = useState(false);

  // We store just ONE member (the one who paid). 
  // We'll find them by matching `currentPaidBy` to a member's name, if any.
  const initialMember = allMembers.find((m) => m.name === currentPaidBy);
  const [selectedMember, setSelectedMember] = useState<Member | null>(initialMember || null);

  // This array has either zero or one member, so we can reuse SplitBetween
  const singleArray = selectedMember ? [selectedMember] : [];

  // If user selects a new member from SplitBetween
  // we REPLACE the entire array with just that one member
  const handleAddMember = (memberIdStr: string) => {
    const found = allMembers.find((m) => m.id.toString() === memberIdStr);
    if (found) {
      setSelectedMember(found);
    }
  };

  // If user removes the member, we set `selectedMember` to null
  const handleRemoveMember = (memberId: number) => {
    if (selectedMember?.id === memberId) {
      setSelectedMember(null);
    }
  };

  // Called when user clicks "Save"
  const handleSave = () => {
    // If no member is selected, we might store empty or keep old value
    const newPaidBy = selectedMember ? selectedMember.id : 0;
    onChangePaidBy(receiptId, newPaidBy);
    setIsOpen(false);
  };

  // When we open the dialog, re-sync with currentPaidBy from props
  const handleOpen = () => {
    const m = allMembers.find((mem) => mem.name === currentPaidBy);
    setSelectedMember(m || null);
    setIsOpen(true);
  };

  // Show either the person's name or "No one"
  const displayName = currentPaidBy || 'No one';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-left underline" onClick={handleOpen}>
          Paid by {displayName}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Who Paid?</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Reuse SplitBetween, but pass an array of length 0 or 1 */}
          <SplitBetween
            members={allMembers}
            assignedMembers={singleArray}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}