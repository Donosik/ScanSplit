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


}