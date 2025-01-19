import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GroupDetail } from '@/types';

interface GroupSummaryProps {
  group: GroupDetail;
}

export default function GroupSummary({ group }: GroupSummaryProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="font-semibold">Summary</h3>
          <Button variant="outline" size="sm">
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
              ${group.myAmount.toFixed(2)}
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="font-semibold">Balances</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {group.balances.map((balance, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                <p className="text-sm">
                  <span className="font-medium">{balance.from}</span>
                  {' owes '}
                  <span className="font-medium">{balance.to}</span>
                </p>
              </div>
              <p className="font-semibold">
                ${balance.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}