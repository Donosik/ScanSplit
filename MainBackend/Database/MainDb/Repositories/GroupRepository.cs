using System.Collections.Generic;
using System.Threading.Tasks;
using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class GroupRepository : GenericRepository<Group>, IGroupRepository
{
    private readonly DB.Context.MainDb dbContext;

    public GroupRepository(DB.Context.MainDb dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<Group> GetWithUsers(int id)
    {
        return await GetQuery()
            .Include(x => x.Users)
            .Include(x => x.Bills)
                .ThenInclude(b => b.MenuItems)
            .Include(x => x.Transfers)
                .ThenInclude(t => t.Payer)
            .Include(x => x.Transfers)
                .ThenInclude(t => t.Recipient)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<User>> GetUsersFromGroup(int groupId)
    {
        return await GetQuery().Where(g => g.Id == groupId).SelectMany(g => g.Users.Select(u=>new User
        {
            Id = u.Id,
            EmailAddress = u.EmailAddress,
            Groups = new List<Group>(),
            Name = u.Name,
            Login = u.Login,
            LastName = u.LastName,
            Password = "",
            PhoneNumber = u.PhoneNumber,
            Image = u.Image
        })).ToListAsync();
    }
    public async Task DeleteUserFromGroup(int groupId, int userIdToRemove)
    {
        var group=await GetQuery().Include(x=>x.Users).FirstOrDefaultAsync(g => g.Id == groupId);
        var user=await dbContext.Users.FirstOrDefaultAsync(x=>x.Id == userIdToRemove);
        if (user != null && group != null)
        {
                group.Users.Remove(user);
        }
    }
   
    public async Task<Group?> GetGroupByIdAsync(int groupId)
    {
        return await GetQuery()
            .FirstOrDefaultAsync(b => b.Id == groupId);
    }

    public async Task<Group> GetGroupWithBills(int groupId)
    {
        return await GetQuery().Include(b => b.Bills).FirstOrDefaultAsync(b => b.Id == groupId);
    }

    public async Task<Group?> GetGroupByIdAsyncAllInfo(int groupId)
    {
        return await GetQuery()
            .Include(g => g.Users) // Załadowanie użytkowników w grupie
            .Include(g => g.Bills)
            .ThenInclude(b => b.MenuItems) // Załadowanie elementów menu związanych z rachunkami
            .ThenInclude(mi => mi.OrderedBy)
            .Include(g => g.Bills)
            .ThenInclude(b => b.Payments) // Załadowanie płatności związanych z rachunkami
            .Include(g => g.Bills)
            .FirstOrDefaultAsync(g => g.Id == groupId);
    }

}