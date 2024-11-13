using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class LocationRepository : GenericRepository<Location>, ILocationRepository
{
    private readonly DB.Context.MainDb dbContext;

    public LocationRepository(DB.Context.MainDb dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}