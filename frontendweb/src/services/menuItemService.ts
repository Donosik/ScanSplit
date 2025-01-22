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
//   mapUsersFromMenuItem: (item: MenuItem) => {
//     let users = [];
//     if (item.assignedTo) {
//       users = item.assignedTo.map(user => user.id);
//     }
//     if (item.orderedBy) {
//       users = item.orderedBy.map(user => user.id);
//     }
//     return users;
//   },
  addMenuItem: async (billId: number, item: MenuItem) => {
    const payload = [{
        id: Math.floor(Math.random() * 1000000), // replace with random int
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        orderedBy: []
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
    const response = await api.patch(`/menuitem/${id}/updata-name?menuItemName=${name}`);
    return response.data;
  },
  updateMenuItemQuantity: async (id: number, quantity: number) => {
    const response = await api.patch(`/menuitem/${id}/updata-quantity?quantity=${quantity}`);
    return response.data;
  },
  updateMenuItemPrice: async (id: number, price: number) => {
    const response = await api.patch(`/menuitem/${id}/updata-price?price=${price}`);
    return response.data;
  }
};
