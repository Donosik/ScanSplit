using MainBackend.Database.Entities;
using MainBackend.DTO;
using MainBackend.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MainBackend.Services;

public interface IBillService
{
    public Task<List<KeyValuePair<string, string>>> GetAllCurrencies();
    Task<BillResponse> CreateBill(BillDTO billDto,int groupId);
    
    Task AddMenuItemsToBillAsync(int billId, List<MenuItem> menuItems);

    
    Task UpadateNameBill(string billName, int billId);
    Task UpadateDateBill(DateTime date, int billId);

    Task<BillDetailDTO> GetBillDetailsAsync(int billId);
    
    Task AddPaymentToBill(int billId, int userId);
    Task <decimal> GetMySumInBill(int billId);
    
    Task UpdateBillImage(string billImage, int billId);
  
}