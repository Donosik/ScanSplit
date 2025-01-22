import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { balanceService } from '@/services/balances';
import { Member, Balance } from '@/types';
import { fetchBalances } from '@/services/balances';
import { useGroups } from '@/hooks/useGroups';
import { useBill } from './useBill';

export function useBalances(groupId: number) {
  const toast = useToast();
  const { fetchMembers } = useGroups();
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const {fetchCurrencies} = useBill();
  useEffect(() => {
    const getBalances = async () => {
      try {
        setLoading(true);
        const members = await fetchMembers(groupId);
        const data = await fetchBalances(groupId, members);
        setBalances(data);
        // const currencies = await fetchCurrencies();
        // setCurrency(currencies[0]);
      } catch (err) {
        setError('Not all balances might be shown');
      } finally {
        setLoading(false);
      }
    };

    getBalances();
  }, [groupId]);

  const fetchBalances = async (groupId: number, members: Member[]) => {
    const balances = await balanceService.getBalances(groupId);
    // response -> [{ "PayerId": 2, "RecipientId": 1, "Amount": 25 },{ "PayerId": 3, "RecipientId": 1, "Amount": 10 }]
    // now create balances with names
    // const balancesWithNames = balances.map((balance: any) => {
    //   const payer = members.find((member: Member) => member.id === balance.PayerId);
    //   const recipient = members.find((member: Member) => member.id === balance.RecipientId);
    //   return {
    //     ...balance,
    //     payerName: payer?.name,
    //     recipientName: recipient?.name,
    //   };
    // });
    // map to type Balance
    const balancesWithNames = balances.map((balance: any) => {
      return {
        id: Math.random(),
        from: members.find((member: Member) => member.id === balance.PayerId)?.name || '',
        to: members.find((member: Member) => member.id === balance.RecipientId)?.name || '',
        amount: balance.Amount,
        status: 'pending',
        date: new Date().toISOString(),
      };
    });
    return balancesWithNames;
  };

  return { balances, loading, error, fetchBalances };
}
