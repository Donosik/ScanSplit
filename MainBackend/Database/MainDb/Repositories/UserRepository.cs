using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class UserRepository: GenericRepository<User>, IUserRepository
{
    private readonly DB.Context.MainDb dbContext;

    public UserRepository(DB.Context.MainDb dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }
    

    public async Task<User> GetByLogin(string login)
    {
        return await dbContext.Users.FirstOrDefaultAsync(x => x.Login == login);
    }
    public async Task<User> GetByPhoneNumber(string phoneNumber)
    {
        return await dbContext.Users.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber);
    }

    public async Task<IEnumerable<Group>> GetUserGroups(int userId)
    {
        return await dbContext.Users
            .Where(user => user.Id == userId)
            .SelectMany(user => user.Groups)
            .Include(g => g.Users)
            .Include(g => g.Bills)
                .ThenInclude(b => b.MenuItems)
            .Include(g => g.Transfers)
                .ThenInclude(t => t.Payer)
            .Include(g => g.Transfers)
                .ThenInclude(t => t.Recipient)
            .ToListAsync();
    }

    public Task<User> GetByIdAsync(int userId)
    {
        return dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
    }
}