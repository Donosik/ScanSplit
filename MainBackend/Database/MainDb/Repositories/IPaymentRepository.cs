using System.Threading.Tasks;
using MainBackend.Database.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IPaymentRepository: IGenericRepository<Payment>
{
    Task<Payment?> GetPaymetByIdAsync(int paymentId);
}