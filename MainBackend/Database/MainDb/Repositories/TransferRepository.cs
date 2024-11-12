using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class TransferRepository: GenericRepository<Transfer>, ITransferRepository
{
    private readonly DbContext dbContext;

    public TransferRepository(DbContext dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}