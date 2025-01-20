import { api } from './api';

export const menuItemService = {
  getMenuItemDetail: async (id: number) => {
    const response = await api.get(`/menuitem/${id}`);
    return response.data;
  },
  updateAssignedUsers: async (id: number, userIds: number[]) => {
    const response = await api.put(`/menuitem/${id}/users`, userIds);
    return response.data;
  }
};