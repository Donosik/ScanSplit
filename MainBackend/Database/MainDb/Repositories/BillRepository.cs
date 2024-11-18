using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class BillRepository: GenericRepository<Bill>, IBillRepository
{
    private readonly DB.Context.MainDb dbContext;

    public BillRepository(DB.Context.MainDb dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}