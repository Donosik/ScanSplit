using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class MenuItemRepository : GenericRepository<MenuItem>, IMenuItemRepository
{
    private readonly DbContext dbContext;

    public MenuItemRepository(DbContext dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}