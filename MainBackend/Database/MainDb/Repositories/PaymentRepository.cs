using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class PaymentRepository: GenericRepository<Payment>, IPaymentRepository
{
   private readonly DbContext dbContext;

    public PaymentRepository(DbContext dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }


}