using MainBackend.Database.Entities;
using MainBackend.Database.Generic.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class PaymentRepository: IPaymentRepository, GenericRepository<Payment>
{
    protected readonly DbContext dbContext;

    protected GenericRepository(DbContext dbContext)
    {
        this.dbContext = dbContext;
    }


}