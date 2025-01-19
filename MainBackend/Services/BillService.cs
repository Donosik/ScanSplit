﻿using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;
using MainBackend.DTO;
using MainBackend.Enums;

namespace MainBackend.Services;

public class BillService: IBillService
{
    private readonly IIdentityService identityService;
    private readonly IUoW uow;

    public BillService(IUoW uow, IIdentityService identityService)
    {
        this.identityService = identityService;
        this.uow = uow;
    }

    public async Task<List<KeyValuePair<string, string>>> GetAllCurrencies()
    {
        return await Task.FromResult(CurrencyExtensions.GetAllCurrencies());
    }
    
// to do id bill w adresie, id grupy w paragonie 
    public async Task<int> CreateBill(BillDTO billDto,int groupId)
    {
        Bill newbill = new Bill(billDto);
        uow.BillRepository.Create(newbill);
        Group group = await uow.GroupRepository.Get(groupId);
        if (group == null)
            throw new Exception("Group does not exist");
        group.Bills.Add(newbill);
        uow.GroupRepository.Update(group);
        await uow.Save(2);
        return newbill.Id;
    }
    public async Task AddMenuItemsToBillAsync(int billId, List<MenuItem> menuItems)
    {
        if (menuItems == null || !menuItems.Any())
        {
            throw new ArgumentException("No menu items provided.");
        }

        // Pobieramy istniejący rachunek z repozytorium
        var bill = await uow.BillRepository.GetBillByIdAsync(billId);

        if (bill == null)
        {
            throw new KeyNotFoundException($"Bill with ID {billId} not found.");
        }

        // Dodajemy pozycje menu do rachunku
        await uow.BillRepository.AddMenuItemsToBillAsync(bill, menuItems);
    }
    public async Task UpdateBillPhotoAsync(int billId, string photoUrl)
    {
        var bill = await uow.BillRepository.GetBillByIdAsync(billId);
        if (bill == null)
        {
            throw new KeyNotFoundException("Bill not found.");
        }

        bill.BillImage= photoUrl;
        uow.BillRepository.Update(bill);
        await uow.Save();
    }
}