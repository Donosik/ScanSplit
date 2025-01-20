using MainBackend.Database.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IMenuItemRepository : IGenericRepository<MenuItem>
{
    Task<MenuItem?> FindByMenuId(int menuItemId);
}