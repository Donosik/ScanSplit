import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GroupBalances } from './GroupBalances';
import { Balance } from '@/types';
import { useBalances } from '@/hooks/useBalances';

interface BalancesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: number; // Pass groupId to fetch balances
  currency: string; // Add currency prop
}

export function BalancesDialog({
  open,
  onOpenChange,
  groupId,
  currency,
}: BalancesDialogProps) {
  const { balances, loading, error } = useBalances(groupId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Balances & Reimbursements</DialogTitle>
          <DialogDescription>
            Track and manage payments between group members
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {loading && <div>Loading balances...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {balances.length > 0 ? (
            <GroupBalances balances={balances} currency={currency} />
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No balances to show
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}