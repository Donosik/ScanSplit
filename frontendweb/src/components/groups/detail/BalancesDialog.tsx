import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GroupBalances } from './GroupBalances';
import { Balance } from '@/types';

interface BalancesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balances: Balance[];
  onMarkAsPaid?: (balance: Balance) => void;
}

export function BalancesDialog({
  open,
  onOpenChange,
  balances,
  onMarkAsPaid,
}: BalancesDialogProps) {
  const pendingBalances = balances.filter(b => b.status !== 'paid');
  const paidBalances = balances.filter(b => b.status === 'paid');

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
          {pendingBalances.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-3">Pending Payments</h4>
              <GroupBalances balances={pendingBalances} onMarkAsPaid={onMarkAsPaid} />
            </div>
          )}
          {paidBalances.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-3">Completed Payments</h4>
              <GroupBalances balances={paidBalances} />
            </div>
          )}
          {balances.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              Settle all receipts to see balances!
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}