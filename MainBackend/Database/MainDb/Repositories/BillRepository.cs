using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class BillRepository: GenericRepository<Bill>, IBillRepository
{
    private readonly DbContext dbContext;

    public BillRepository(DbContext dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}