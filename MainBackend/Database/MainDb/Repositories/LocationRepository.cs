using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class LocationRepository : GenericRepository<Location>, ILocationRepository
{
    private readonly DbContext dbContext;

    public LocationRepository(DbContext dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}