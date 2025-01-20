using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class BillRepository: GenericRepository<Bill>, IBillRepository
{
    private readonly DB.Context.MainDb dbContext;

    public BillRepository(DB.Context.MainDb dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<Bill?> GetBillDetails(int billId)
    {
        return await GetQuery()
            .Include(b => b.MenuItems)
                .ThenInclude(mi => mi.OrderedBy)
            .Include(b => b.Payments)
                .ThenInclude(p => p.User)
            .FirstOrDefaultAsync(b => b.Id == billId);
    }

    public async Task<Bill?> GetBillByIdAsync(int billId)
    {
        return await GetQuery()
            .Include(b => b.MenuItems)
            .FirstOrDefaultAsync(b => b.Id == billId);
    }

    public async Task AddMenuItemsToBillAsync(Bill bill, List<MenuItem> menuItems)
    {
        foreach (var menuItem in menuItems)
        {
            bill.MenuItems.Add(menuItem);
        }
            
        await SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await dbContext.SaveChangesAsync();
    }
}