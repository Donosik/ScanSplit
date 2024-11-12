using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class GroupRepository : GenericRepository<Group>, IGroupRepository
{
    private readonly DbContext dbContext;

    public GroupRepository(DbContext dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}