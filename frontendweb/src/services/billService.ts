import { Bill, BillStatus, MenuItem, User } from '@/types';
import { api } from './api';
import internal from 'stream';

export interface CreateBillRequest {
  name: string;
  date: string;
  amount: number;
  currency: string;
  paidBy: string;
  status: BillStatus;
  image?: string;
}
export interface BillIdObject {
  billId: number;
}
export interface BillResponse {
  billId: BillIdObject;
  menuItems: MenuItem[];
}

export interface BillDetailsResponse {
  id: number;
  name: string;
  image: string;
  date: string;
  amount: number;
  status: string;
  currency: string;
  paidBy: string; 
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    assignedTo: User[];
  }[];
}

export const billService = {
  getBill: async (id: number): Promise<BillDetailsResponse> => {
    const response = await api.get(`/bill/${id}`);
    return response.data;
  },

  async getAllCurrencies(): Promise<{ key: string; value: string }[]> {
    const response = await api.get<{ key: string; value: string }[]>('/bill');
    return response.data;
  },
  createBill: async (groupId: number, formData: FormData): Promise<{ billId: BillIdObject; menuItems: MenuItem[] }> => {
    const response = await api.post<{ billId: BillIdObject; menuItems: MenuItem[] }>(`/bill/${groupId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  // async createBill(groupId: number, bill: CreateBillRequest, image: File): Promise<BillResponse> {
  //   const formData = new FormData();
  //   formData.append('image', image);
  //   Object.entries(bill).forEach(([key, value]) => {
  //     formData.append(key, value.toString());
  //   });

  //   const response = await api.post<BillResponse>(`/bill/${groupId}`, formData);
  //   return response.data;
  // },
  async addMenuItemsToBill(billId: number, menuItems: MenuItem[]) {
    const payload = menuItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      orderedBy: [],
      transfers: [],
      status: 0,
    }));
    await api.post(`/bill/${billId}/add-menu-items`, payload);
  },
  async getBillDetails(billId: number): Promise<BillDetailsResponse> {
    const response = await api.get<BillDetailsResponse>(`/bill/${billId}`);
    return response.data;
  },

  async addMenuItems(billId: number, menuItems: MenuItem[]): Promise<void> {
    if (menuItems == null || !menuItems.length) {
      throw new Error("No menu items provided.");
    }

    const bill = await this.getBill(billId);
    if (!bill) {
      throw new Error(`Bill with ID ${billId} not found.`);
    }

    await api.post(`/bill/${billId}/add-menu-items`, menuItems);
  },

  updateBillStatus: async (billId: number, status: 'pending' | 'settled'): Promise<void> => {
    await api.patch(`/bill/${billId}/status`, { status });
  },

  updateBillPaidBy: async (billId: number, paidBy: string): Promise<void> => {
    await api.patch(`/bill/${billId}/paid-by`, { paidBy });
  },

  updateBill: async (billId: number, updates: Partial<Bill>): Promise<void> => {
    await api.patch(`/bill/${billId}`, updates);
  },

  deleteBill: async (billId: number): Promise<void> => {
    await api.delete(`/bill/${billId}`);
  },

  async updateBillName(billId: number, name: string): Promise<void> {
    await api.patch(`/bill/${billId}/updata-name`, name);
  },

  async updateBillDate(billId: number, date: Date): Promise<void> {
    await api.patch(`/bill/${billId}/updata-date`, date);
  }
}; 