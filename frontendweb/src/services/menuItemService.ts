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
  },
  updateMenuItemName: async (id: number, name: string) => {
    // http://localhost:5136/MenuItem/1/updata-name?menuItemName=test%20endpoint
    const response = await api.post(`/menuitem/${id}/updata-name?menuItemName=${name}`);
    return response.data;
  },
  updateMenuItemQuantity: async (id: number, quantity: number) => {
    const response = await api.post(`/menuitem/${id}/updata-quantity?quantity=${quantity}`);
    return response.data;
  },
  updateMenuItemPrice: async (id: number, price: number) => {
    const response = await api.post(`/menuitem/${id}/updata-price?price=${price}`);
    return response.data;
  }
};
