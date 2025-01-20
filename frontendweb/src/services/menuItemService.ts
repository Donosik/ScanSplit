import { MenuItem } from '@/types';
import { api } from './api';

export const menuItemService = {
  getMenuItemDetail: async (id: number) => {
    const response = await api.get(`/menuitem/${id}`);
    return response.data;
  },
  updateAssignedUsers: async (id: number, userIds: number[]) => {
    const response = await api.put(`/menuitem/${id}/users`, userIds);
    return response.data;
  },
  addMenuItem: async (billId: number, item: MenuItem) => {
    const payload = [{
        id: 1234,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        assignedTo: [] // TODO: Update with assigned to
    }]

    
    const response = await api.post(`/Bill/${billId}/add-menu-items`, payload);
   
    return response.data;
  },
  updateMenuItemDetails: async (id: number, item: MenuItem) => {
    const response = await api.post(`/menuitem/${id}`, item);
    return response.data;
  }
};
