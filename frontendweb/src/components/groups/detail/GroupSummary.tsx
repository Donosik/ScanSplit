import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Balance, GroupDetail } from '@/types';
import { BalancesDialog } from './BalancesDialog';
import { useToast } from '@/hooks/use-toast';
import { useGroups } from '@/hooks/useGroups';

interface GroupSummaryProps {
  group: GroupDetail;
  onUpdateGroup?: (updatedGroup: GroupDetail) => void;
}

export default function GroupSummary({ group, onUpdateGroup }: GroupSummaryProps) {
  const [isBalancesOpen, setIsBalancesOpen] = useState(false);
  const [balances, setBalances] = useState<Balance[]>(group.balances);
  const { toast } = useToast();
  const [myAmount, setMyAmount] = useState(0);
  const { getMyAmount } = useGroups();

  useEffect(() => {
    getMyAmount(group.id).then(setMyAmount);
  }, [group.id]);

  const handleMarkAsPaid = (balance: Balance) => {
    // Update the local state immediately for better UX
    const updatedBalances = balances.map(b => {
      if (b.from === balance.from && b.to === balance.to && b.amount === balance.amount) {
        return { ...b, status: 'paid' };
      }
      return b;
    });

    setBalances(updatedBalances);

    // Update the parent component if provided
    if (onUpdateGroup) {
      onUpdateGroup({
        ...group,
        balances: updatedBalances,
      });
    }

    // Show success toast
    toast({
      title: "Balance marked as paid",
      description: `${balance.from} → ${balance.to}: $${balance.amount.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="font-semibold">Summary</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsBalancesOpen(true)}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <Wallet className="mr-2 h-4 w-4" />
            View Balances
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold">
              ${group.totalAmount.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Your Share</p>
            <p className="text-2xl font-bold">
              ${myAmount}
            </p>
          </div>
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-3">Members</h4>
            <div className="flex flex-wrap gap-2">
              {group.members.map((member) => (
                <Avatar key={member.id} className="ring-2 ring-background">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <BalancesDialog
        open={isBalancesOpen}
        onOpenChange={setIsBalancesOpen}
        balances={balances}
        onMarkAsPaid={handleMarkAsPaid}
      />
    </div>
  );
}