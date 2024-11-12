using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class UserRepository: GenericRepository<User>, IUserRepository
{
    private readonly DbContext dbContext;

    public UserRepository(DbContext dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}