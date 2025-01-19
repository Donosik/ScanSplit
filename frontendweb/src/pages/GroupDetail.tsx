import { useState } from 'react';
import GroupHeader from '@/components/groups/detail/GroupHeader';
import ReceiptList from '@/components/groups/detail/ReceiptList';
import GroupSummary from '@/components/groups/detail/GroupSummary';
import ReceiptDetail from './ReceiptDetail';
import { GroupDetail as GroupDetailType, Receipt } from '@/types';
import { useBill } from '@/hooks/useBill';

interface GroupDetailProps {
  group: GroupDetailType;
  onBack: () => void;
}

export default function GroupDetail({ group, onBack }: GroupDetailProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const { createBill } = useBill();

  const handleAddReceipt = async (name: string, file: File, date: string, currency: string) => {
    await createBill(group.id, name, file, date, currency);
  };
  if (selectedReceipt) {
    return (
      <ReceiptDetail 
        receipt={selectedReceipt}
        onBack={() => setSelectedReceipt(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GroupHeader group={group} onBack={onBack} />

      <main className="flex-1 w-full mx-auto">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8">
          <div className="lg:col-span-2">
            <ReceiptList 
              receipts={group.receipts} 
              onSelectReceipt={setSelectedReceipt}
              onAddReceipt={handleAddReceipt}
            />
           
          </div>
          <div>
            <GroupSummary group={group} />
          </div>
        </div>
      </main>
    </div>
  );
}