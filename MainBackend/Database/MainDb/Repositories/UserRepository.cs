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

    public async Task<IEnumerable<(int id , string name)>> GetUserGroups(int userId)
    {
        var groups = await dbContext.Users
            .Where(user => user.Id == userId)
            .SelectMany(user => user.Groups)
            .Select(group => new { group.Id, group.Name }) 
            .ToListAsync();
        
        return groups.Select(group => (id: group.Id, name: group.Name));
    }
}