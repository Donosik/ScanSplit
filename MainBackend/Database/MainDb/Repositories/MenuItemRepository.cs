using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class MenuItemRepository : GenericRepository<MenuItem>, IMenuItemRepository
{
    private readonly DB.Context.MainDb dbContext;

    public MenuItemRepository(DB.Context.MainDb dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


    public async Task<MenuItem?> FindByMenuId(int itemId)
    {
        // include connected users
       return await GetQuery()
           .Include(x => x.OrderedBy)
           .FirstOrDefaultAsync(x => x.Id == itemId); 
    }

    public async Task<MenuItem?> GetMenuItemByIdAsync(int menuItemid)
    {
        return await GetQuery()
            .FirstOrDefaultAsync(b => b.Id == menuItemid);
    }

}