import { Balance, Bill, Group, GroupDetail, Member, MenuItem, Receipt } from '@/types';
import { api } from './api';
import { menuItemService } from './menuItemService';
import { cloudStorageService } from './cloudStorageService';

const calculateBillAmount = (bill: any) => {
  return bill.menuItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
}

const getImageUrl = (imageName: string | null | undefined): string => {
  if (!imageName) {
    return "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9";
  }

  // Check if it's a valid image file extension
  if (!imageName.match(/\.(jpg|jpeg|png|gif|bmp|tiff|ico|webp)$/i)) {
    return "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9";
  }

  return imageName;
}

export async function getMembers(groupId: number): Promise<Member[]> {
  const response = await api.get(`/group/${groupId}/get-users`);
  return response.data.map((user: any) => ({
    id: user.id,
    name: user.name,
    username: user.login,
    avatar: getImageUrl(user.image),
  }));
}

export async function getMyAmount(groupId: number): Promise<number> {
  const response = await api.get(`/group/${groupId}/mySpendings`);
  return response.data;
}

export async function getGroups(): Promise<Group[]> {
  const response = await api.get('/user/groups');
  
  return response.data.map((group: any) => ({
    id: group.id,
    name: group.name,
    date: group.date || new Date().toISOString(),
    members: group.users?.length || 0,
    receipts: group.bills?.length || 0,
    totalAmount: group.bills?.reduce((sum: number, bill: any) => sum + calculateBillAmount(bill), 0) || 0,
    image: getImageUrl(group.image),
  }));
}

const convertMenuItemAssignedTo = (assignedTo: any) => {
  if (assignedTo == null || assignedTo.length == 0) {
    return [];
  }
  return assignedTo.map((user: any) => ({
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    username: user.username,
    avatar: getImageUrl(user.image),
  }));
}

const convertBillItems = async (items: any, members: Member[]) => {
  let billItems: MenuItem[] = [];

  for (const item of items) {
    const menuItemDetail = await menuItemService.getMenuItemDetail(item.id);
    billItems.push({
      id: menuItemDetail.id,
      name: menuItemDetail.name,
      price: menuItemDetail.price,
      quantity: menuItemDetail.quantity,
      assignedTo: convertMenuItemAssignedTo(menuItemDetail.assignedTo),
    });
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
    avatar: getImageUrl(user.image),
  })) || [];
  console.log(backendGroup.bills);  
  // Map bills to receipts
  const receipts: Bill[] = await Promise.all(backendGroup.bills?.map(async (bill: any) => ({
    id: bill.id,
    name: bill.name,
    amount: calculateBillAmount(bill),
    paidBy: bill.paidBy,
    date: bill.date,
    image: getImageUrl(bill.billImage),
    coverImage: getImageUrl(bill.coverImage),
    status: bill.status,
    items: await convertBillItems(bill.menuItems, members),
    groupId: bill.groupId,
    currency: bill.currency,
  })) || []);

  // Get the currency from the first bill, or default to USD
  const groupCurrency = receipts.length > 0 ? receipts[0].currency : 'USD';

  return {
    id: backendGroup.id,
    name: backendGroup.name,
    date: backendGroup.date || new Date().toISOString(),
    image: getImageUrl(backendGroup.image),
    totalAmount: receipts.reduce((sum, receipt) => sum + receipt.amount, 0),
    myAmount: receipts.reduce((sum, receipt) => {
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
    currency: groupCurrency,
  };
}

export async function createGroup(name: string, image: File): Promise<Group> {
  const response = await api.post('/group/create', name);
  const id = response.data.id;

  let imagePath = '';
  if (image && image instanceof File) {
    imagePath = await cloudStorageService.uploadImage(image);
    await groupService.updateGroupImage(id, imagePath);
  }

  const signedUrl = await cloudStorageService.getSignedUrl(imagePath);

  return {
    id,
    name: name || '',
    date: new Date().toISOString(),
    members: 1,
    receipts: 0,
    totalAmount: 0,
    image: signedUrl,
  };
}


export const groupService = {

  updateGroupName: async (groupId: number, name: string): Promise<void> => {
    await api.patch(`/Group/${groupId}/updata-name`, name, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  addMemberByLogin: async (groupId: number, login: string): Promise<void> => {
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
  updateGroupImage: async (groupId: number, imagePath: string): Promise<void> => {
    // const imagePath = await cloudStorageService.uploadImage(file);
    //http://localhost:5136/Group/2/ImagePath?newPath=path.jpg
    await api.patch(`/group/${groupId}/ImagePath?newPath=${imagePath}`);
  },
  getGroupMembers: async (groupId: number): Promise<Member[]> => {
    const response = await api.get(`/group/${groupId}/get-users`);
    return response.data.map((user: any) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: getImageUrl(user.image),
    }));
  },
};