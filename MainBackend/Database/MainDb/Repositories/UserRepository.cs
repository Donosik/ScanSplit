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
}