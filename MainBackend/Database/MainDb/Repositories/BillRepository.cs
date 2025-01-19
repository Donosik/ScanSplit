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
    
    public async Task<Bill> GetBillByIdAsync(int billId)
    {
        return await GetQuery()
            .Include(b => b.MenuItems) // Załaduj MenuItems razem z Bill
            .FirstOrDefaultAsync(b => b.Id == billId);
    }

    // Dodaje MenuItems do Bill
    public async Task AddMenuItemsToBillAsync(Bill bill, List<MenuItem> menuItems)
    {
        foreach (var menuItem in menuItems)
        {
            bill.MenuItems.Add(menuItem);
        }

        // Zapisujemy zmiany w bazie danych
        await SaveChangesAsync();
    }

    // Zapisuje zmiany do bazy danych
    public async Task SaveChangesAsync()
    {
        await dbContext.SaveChangesAsync();
    }
}