using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;
using MainBackend.DTO;
using MainBackend.Enums;
using System.Collections.Generic;

namespace MainBackend.Services;

public class MenuItemService : IMenuItemService
{
    private readonly IIdentityService identityService;
    private readonly IUoW uow;

    public MenuItemService(IIdentityService identityService, IUoW uow)
    {
        this.identityService = identityService;
        this.uow = uow;
    }

    public async Task<MenuItem?> GetMenuItemWithUsersAsync(int menuItemId)
    {
        return await uow.MenuItemRepository.FindByMenuId(menuItemId);
    }

    public async Task<MenuItem?> UpdateAssignedUsersAsync(int menuItemId, List<int> userIds)
    {
        var menuItem = await uow.MenuItemRepository.FindByMenuId(menuItemId);
        if (menuItem == null)
        {
            return null;
        }

        // Clear existing users
        menuItem.OrderedBy.Clear();

        // Add new users
        foreach (var userId in userIds)
        {
            var user = await uow.UserRepository.GetByIdAsync(userId);
            if (user != null)
            {
                menuItem.OrderedBy.Add(user);
            }
        }

        await uow.Save();
        return menuItem;
    }
}