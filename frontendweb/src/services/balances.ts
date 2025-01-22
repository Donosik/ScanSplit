import { api } from '@/lib/api';

export const balanceService = {
  getBalances: async (groupId: number) => {
    // Static values for testing
    return [
      { "PayerId": 1, "RecipientId": 2, "Amount": 25 },
      { "PayerId": 2, "RecipientId": 1, "Amount": 40 }
    ];
    
    // Uncomment the following line when the API is ready
    // const response = await api.get(`/balances/${groupId}`);
    // return response.data;
  },
};