using System.Threading.Tasks;
using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public class PaymentRepository: GenericRepository<Payment>, IPaymentRepository
{
   private readonly DB.Context.MainDb dbContext;

    public PaymentRepository(DB.Context.MainDb dbContext) : base(dbContext)
    {
        this.dbContext = dbContext;
    }
    
    public async Task<Payment?> GetPaymetByIdAsync(int paymentId)
    {
        return await GetQuery()
            .FirstOrDefaultAsync(b => b.Id == paymentId);
    }


}