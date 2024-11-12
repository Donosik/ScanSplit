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


}