import { menuItemService } from '@/services/menuItemService';
import { Member, MenuItem } from '@/types';

export function useMenuItem() {
    const updateMenuItemDetails = async (menuItemId: number, item: MenuItem) => {
        try {
            await menuItemService.updateMenuItemName(menuItemId, item.name);
            await menuItemService.updateMenuItemQuantity(menuItemId, item.quantity);
            await menuItemService.updateMenuItemPrice(menuItemId, item.price);
        } catch (error) {
            console.error('Error updating menu item details:', error);
            throw error;
        }
    };
    const updateMembers = async (menuItemId: number, members: Member[]) => {
        const userIds = members.map(member => member.id);
        await menuItemService.updateAssignedUsers(menuItemId, userIds);
    };
    const addMenuItem = async (billId: number, item: MenuItem) => {
        await menuItemService.addMenuItem(billId, item);
    };
    return {
        updateMenuItemDetails,
        updateMembers,
        addMenuItem,
    };


}
