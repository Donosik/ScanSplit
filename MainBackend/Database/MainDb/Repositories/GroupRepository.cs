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
            PhoneNumber = u.PhoneNumber
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

}