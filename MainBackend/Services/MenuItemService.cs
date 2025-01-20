using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;
using MainBackend.DTO;
using MainBackend.Enums;
using System.Collections.Generic;
using MainBackend.Exceptions;

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

    public async Task UpadateNameMenuItem(string menuItemName, int menuItemId)
    {
        var menuItem = await uow.MenuItemRepository.GetMenuItemByIdAsync(menuItemId);
        if (menuItem == null)
            throw new NotFoundException();
        menuItem.Name = menuItemName;
        uow.MenuItemRepository.Update(menuItem);
        await uow.Save();
        
    }
    
    public async Task UpadateQuantityMenuItem(int quantity, int idMenuItem)
    {
        var menuItem = await uow.MenuItemRepository.GetMenuItemByIdAsync(idMenuItem);
        if(menuItem == null)
            throw new NotFoundException();
        menuItem.Quantity =quantity;
        uow.MenuItemRepository.Update(menuItem);
        await uow.Save();
        
    }
    public async Task UpadatePriceMenuItem(decimal Price, int idMenuItem)
    {
        var menuItem = await uow.MenuItemRepository.GetMenuItemByIdAsync(idMenuItem);
        if(menuItem == null)
            throw new NotFoundException();
        menuItem.Price = Price;
        uow.MenuItemRepository.Update(menuItem);
        await uow.Save();
        
    }
}