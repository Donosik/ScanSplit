import React, { useEffect, useState } from 'react';
import { useBalances } from '@/hooks/useBalances';
import { Member } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner'; // Assuming you have a loading spinner component

interface GroupBalancesDisplayProps {
  groupId: number;
  members: Member[];
}

const GroupBalancesDisplay: React.FC<GroupBalancesDisplayProps> = ({ groupId, members }) => {
  const { fetchBalances } = useBalances();
  const [balances, setBalances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBalances = async () => {
      try {
        const fetchedBalances = await fetchBalances(groupId, members);
        setBalances(fetchedBalances);
      } catch (err) {
        setError('Failed to load balances');
      } finally {
        setLoading(false);
      }
    };

    loadBalances();
  }, [groupId, members, fetchBalances]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Group Balances</h3>
      </CardHeader>
      <CardContent>
        {balances.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No balances to display.
          </div>
        ) : (
          <ul className="space-y-4">
            {balances.map((balance) => (
              <li key={balance.id} className="flex justify-between">
                <span>
                  {balance.payerName} owes {balance.recipientName}: ${balance.Amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupBalancesDisplay; 