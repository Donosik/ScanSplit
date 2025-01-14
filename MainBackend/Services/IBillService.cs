using MainBackend.Database.Entities;
using MainBackend.DTO;
using MainBackend.Enums;

namespace MainBackend.Services;

public interface IBillService
{
    public Task<List<KeyValuePair<string, string>>> GetAllCurrencies();
    Task CreateBill(BillDTO billDto);
}