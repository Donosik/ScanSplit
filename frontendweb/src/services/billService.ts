import { api } from './api';
import { Bill, MenuItem } from '@/types';

export const billService = {
  getBill: async (id: number): Promise<Bill> => {
    const response = await api.get(`/bill/${id}`);
    return response.data;
  },

  getAllCurrencies: async (): Promise<string[]> => {
    const response = await api.get('/bill');
    const currencies = response.data.map((item: { key: string; value: string }) => item.key);
    return currencies;
  },

  createBill: async (groupId: number, formData: FormData): Promise<{ billId: number; menuItems: MenuItem[] }> => {
    const response = await api.post(`/bill/${groupId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  addMenuItemsToBill: async (billId: number, menuItems: MenuItem[]): Promise<void> => {
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
  }
}; 