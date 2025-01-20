import { Balance, Group, GroupDetail, Member, Receipt } from '@/types';
import { api } from './api';
const calculateBillAmount = (bill: any) => {
  return bill.menuItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
}
export async function getGroups(): Promise<Group[]> {
  const response = await api.get('/user/groups');
  // fetch details for each group like in getGroupById

    
  return response.data.map((group: any) => ({
    id: group.id,
    name: group.name,
    date: group.date || new Date().toISOString(),
    members: group.users?.length || 0,
    receipts: group.bills?.length || 0,
    totalAmount: group.bills?.reduce((sum: number, bill: any) => sum + calculateBillAmount(bill), 0) || 0,
    image: group.image || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', // Default image
  }));
}

const convertBillItems = (items: any, members: Member[]) => {
  let billItems: MenuItem[] = [];
  if (billItems) {
    billItems = items.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      assignedTo: members,
    }));
  }
  return billItems;
}

export async function getGroupById(id: number): Promise<GroupDetail> {
  const response = await api.get(`/group/${id}`);
  const backendGroup = response.data;

  // Map transfers to balances
  const transfers: Balance[] = backendGroup.transfers?.map((transfer: any) => ({
    id: transfer.id,
    from: transfer.payer.username,
    to: transfer.recipient.username,
    amount: transfer.amount,
    status: transfer.status || 'pending',
    date: transfer.date,
  })) || [];

  const members: Member[] = backendGroup.users?.map((user: any) => ({
    id: user.id,
    name: user.name,
    username: user.login,
    avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`, // Fallback avatar
  })) || [];
  // Map bills to receipts
  const receipts: Bill[] = backendGroup.bills?.map((bill: any) => ({
    id: bill.id,
    name: bill.name,
    amount: calculateBillAmount(bill),
    paidBy: bill.paidBy,
    date: bill.date,
    image: bill.image,
    status: bill.status,
    items: convertBillItems(bill.menuItems, members),
    groupId: bill.groupId,
    currency: bill.currency,
  })) || [];
  console.log("Printing receipts");
  console.log(receipts);
  // Map users to members


  return {
    id: backendGroup.id,
    name: backendGroup.name,
    date: backendGroup.date || new Date().toISOString(),
    image: backendGroup.image,
    totalAmount: receipts.reduce((sum, receipt) => sum + receipt.amount, 0),
    myAmount: receipts.reduce((sum, receipt) => {
      // Calculate user's share in each receipt
      const userItems = receipt.items?.filter(item => 
        item.assignedTo?.some(member => member.id === backendGroup.currentUserId)
      ) || [];
      return sum + userItems.reduce((itemSum, item) => 
        itemSum + (item.price * item.quantity) / item.assignedTo.length, 0
      );
    }, 0),
    members,
    receipts,
    balances: transfers,
  };
}

export async function createGroup(group: Partial<Group>): Promise<Group> {
  const response = await api.post('/group/create', group.name);
  const id = response.data.id;

  // If image is provided, we should implement image upload here
  if (group.image) {
    // TODO: Implement image upload when backend endpoint is ready
  }

  return {
    id,
    name: group.name || '',
    date: new Date().toISOString(),
    members: 1, // Initially only creator
    receipts: 0,
    totalAmount: 0,
    image: group.image || '',
  };
}

export const groupService = {
  addMemberByLogin: async (groupId: number, login: string): Promise<void> => {
    // Use the query string for the login parameter
    await api.post(`/group/groups/${groupId}/add-user-by-login?login=${encodeURIComponent(login)}`);
  },
  addMemberByPhone: async (groupId: number, phoneNumber: string): Promise<void> => {
    await api.post(`/group/groups/${groupId}/add-user-by-phone?phoneNumber=${encodeURIComponent(phoneNumber)}`);
  },

  updateGroupStatus: async (groupId: number, status: string): Promise<void> => {
    await api.patch('', { status, idGroup: groupId });
  },
  removeMemberFromGroup: async (groupId: number, login: string): Promise<void> => {
    await api.delete(`/group/${groupId}/remove-user?login=${encodeURIComponent(login)}`);
  },
  leaveGroup: async (groupId: number): Promise<void> => {
    await api.delete(`/group/${groupId}/leave`);
  },

  getGroupMembers: async (groupId: number): Promise<Member[]> => {
    const response = await api.get(`/group/${groupId}/get-users`);
    return response.data.map((user: any) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
    }));
  },
};