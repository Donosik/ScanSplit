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
    Task<BillDetailDTO> GetBillDetailsAsync(int billId);
}