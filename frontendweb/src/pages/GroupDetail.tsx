import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import GroupHeader from '@/components/groups/detail/GroupHeader';
import ReceiptList from '@/components/groups/detail/ReceiptList';
import GroupSummary from '@/components/groups/detail/GroupSummary';
import { GroupDetail as GroupDetailType, Bill } from '@/types';
import { useBill } from '@/hooks/useBill';
import { useGroups } from '@/hooks/useGroups';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvailableRoutes } from '@/utils/router/availableRoutes';
import GroupBalancesDisplay from '@/components/groups/detail/GroupBalancesDisplay';

interface GroupDetailProps {
  group: GroupDetailType;
  onBack: () => void;
  onUpdate: () => void;
}

export default function GroupDetail({ group, onBack, onUpdate }: GroupDetailProps) {
  const navigate = useNavigate();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [memberInput, setMemberInput] = useState('');
  const { createBill } = useBill();
  const { addMemberByLogin, addMemberByPhone } = useGroups();
  const { toast } = useToast();
  const [selectedReceipt, setSelectedReceipt] = useState<Bill | null>(null);

  // Get the currency from the first receipt or default to USD
  const groupCurrency = group.receipts.length > 0 ? group.receipts[0].currency : 'USD';

  const handleSelectReceipt = (receipt: Bill) => {
    navigate(
      AvailableRoutes.RECEIPT_DETAIL
        .replace(':groupId', group.id.toString())
        .replace(':receiptId', receipt.id.toString())
    );
  };

  const handleAddReceipt = async (name: string, file: File, date: string, currency: string) => {
    try {
      await createBill(group.id, name, file, date, currency);
      onUpdate(); // Refresh group data after adding receipt
      toast({
        title: "Success",
        description: "Receipt added successfully!",
        variant: "default",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add receipt. Please try again.",
      });
    }
  };

  const handleAddMember = async (type: 'login' | 'phone') => {
    if (!memberInput.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid login or phone number.",
      });
      return;
    }

    try {
      if (type === 'login') {
        await addMemberByLogin(group.id, memberInput);
      } else {
        await addMemberByPhone(group.id, memberInput);
      }
      setIsAddingMember(false);
      setMemberInput('');
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GroupHeader 
        group={group} 
        onBack={onBack}
        onAddMember={() => setIsAddingMember(true)}
      />

      <main className="flex-1 w-full mx-auto">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8">
          <div className="lg:col-span-2">
            <ReceiptList 
              receipts={group.receipts} 
              onSelectReceipt={handleSelectReceipt}
              onAddReceipt={handleAddReceipt}
              defaultCurrency={groupCurrency}
            />
          </div>
          <div>
            <GroupSummary group={group} />
            {/* <GroupBalancesDisplay groupId={group.id} members={group.members} /> */}
          </div>
        </div>
      </main>

      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member to Group</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">By Login</TabsTrigger>
              <TabsTrigger value="phone">By Phone</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login">User Login</Label>
                  <Input
                    id="login"
                    placeholder="Enter user login"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                  />
                </div>
                <Button onClick={() => handleAddMember('login')} className="w-full">
                  Add Member
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="phone">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                  />
                </div>
                <Button onClick={() => handleAddMember('phone')} className="w-full">
                  Add Member
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}