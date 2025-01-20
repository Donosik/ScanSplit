﻿using MainBackend.Database.Entities;
using MainBackend.DTO;
using MainBackend.Enums;

namespace MainBackend.Services;

public interface IBillService
{
    public Task<List<KeyValuePair<string, string>>> GetAllCurrencies();
    Task<BillResponse> CreateBill(BillDTO billDto,int groupId);
    
    Task AddMenuItemsToBillAsync(int billId, List<MenuItem> menuItems);
    
    Task UpadateNameBill(string billName, int billId);
    Task UpadateDateBill(DateTime date, int billId);
}