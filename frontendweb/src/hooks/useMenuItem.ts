import { menuItemService } from '@/services/menuItemService';
import { Member } from '@/types';

export function useMenuItem() {
    const updateMenuItemDetails = async (menuItemId: number, item: MenuItem) => {
        await menuItemService.updateMenuItemDetails(menuItemId, item);
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
