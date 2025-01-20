using MainBackend.Database.Entities;
using MainBackend.DTO;
using MainBackend.Enums;
using System.Collections.Generic;

namespace MainBackend.Services;

public interface IMenuItemService
{
    /// <summary>
    /// Gets a menu item with its assigned users by ID
    /// </summary>
    /// <param name="menuItemId">The ID of the menu item</param>
    /// <returns>The menu item with its assigned users</returns>
    Task<MenuItem?> GetMenuItemWithUsersAsync(int menuItemId);
    
    /// <summary>
    /// Updates the list of users assigned to a menu item
    /// </summary>
    /// <param name="menuItemId">The ID of the menu item to update</param>
    /// <param name="userIds">List of user IDs to assign to the menu item</param>
    /// <returns>The updated menu item with its assigned users, or null if menu item not found</returns>
    Task<MenuItem?> UpdateAssignedUsersAsync(int menuItemId, List<int> userIds);
    
    Task UpadateNameMenuItem(string menuItemName, int menuItemId);
    Task UpadateQuantityMenuItem(int quantity, int idMenuItem);
    Task UpadatePriceMenuItem(decimal Price, int idMenuItem);
}