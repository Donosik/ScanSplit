using MainBackend.Database.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IBillRepository : IGenericRepository<Bill>
{
    Task<Bill> GetBillByIdAsync(int billId);
    Task AddMenuItemsToBillAsync(Bill bill, List<MenuItem> menuItems);

    public Task<Bill?> GetBillDetails(int billId);
    Task<Bill?> GetBillWithOredrByByIdAsync(int billId);
    Task SaveChangesAsync();

}