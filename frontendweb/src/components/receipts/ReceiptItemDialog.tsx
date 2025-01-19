import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Member, ReceiptItem } from '@/types';
import ReceiptItemForm from './ReceiptItemForm';

interface ReceiptItemDialogProps {
  open: boolean;
  item?: ReceiptItem;
  members: Member[];
  currency?: string;
  onOpenChange: (open: boolean) => void;
  onSave: (item: Omit<ReceiptItem, 'id'>) => void;
}

export default function ReceiptItemDialog({
  open,
  item,
  members,
  currency,
  onOpenChange,
  onSave,
}: ReceiptItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        </DialogHeader>
        <ReceiptItemForm
          item={item}
          members={members}
          currency={currency}
          onSave={(newItem) => {
            onSave(newItem);
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}