﻿using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;
using MainBackend.DTO;
using MainBackend.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    
    public async Task<BillResponse> CreateBill(BillDTO billDto, int groupId)
    {
        var newBill = new Bill(billDto);
        uow.BillRepository.Create(newBill);
        
        var group = await uow.GroupRepository.Get(groupId);
        if (group == null)
        {
            throw new Exception("Group does not exist");
        }
        
        group.Bills.Add(newBill);
        uow.GroupRepository.Update(group);
        await uow.Save();
        
        return new BillResponse { BillId = newBill.Id };
    }

    public async Task AddMenuItemsToBillAsync(int billId, List<MenuItem> menuItems)
    {
        if (menuItems == null || !menuItems.Any())
        {
            throw new ArgumentException("No menu items provided.");
        }

        var bill = await uow.BillRepository.GetBillByIdAsync(billId);
        if (bill == null)
        {
            throw new KeyNotFoundException($"Bill with ID {billId} not found.");
        }

        await uow.BillRepository.AddMenuItemsToBillAsync(bill, menuItems);
    }

    public async Task<BillDetailDTO> GetBillDetailsAsync(int billId)
    {
        try
        {
            var bill = await uow.BillRepository.GetBillDetails(billId);
            if (bill == null)
            {
                return null;
            }

            // Calculate total amount from menu items
            decimal totalAmount = bill.MenuItems?.Sum(item => item.Price * (item.Quantity ?? 1)) ?? 0;

            // Get the payer information
            string paidBy = GetPaidByInfo(bill);

            var menuItems = MapMenuItems(bill.MenuItems);

            return new BillDetailDTO
            {
                Id = bill.Id,
                Name = bill.Name ?? "Unnamed bill",
                Image = bill.BillImage ?? "default-receipt.png",
                Date = bill.Date,
                Amount = totalAmount,
                Status = "pending", // bill.Status.ToString().ToLower(),
                Currency = bill.Currency.ToString(),
                PaidBy = paidBy,
                Items = menuItems
            };
        }
        catch (Exception ex)
        {
            throw new Exception($"Error retrieving bill details: {ex.Message}", ex);
        }
    }

    private string GetPaidByInfo(Bill bill)
    {
        if (bill.Payments?.Any() != true || bill.Payments.First()?.User == null)
        {
            return "Not assigned";
        }
        return bill.Payments.First().User.Name;
    }

    private List<MenuItemDetailDTO> MapMenuItems(ICollection<MenuItem> menuItems)
    {
        if (menuItems == null)
        {
            return new List<MenuItemDetailDTO>();
        }

        return menuItems.Select(item => new MenuItemDetailDTO
        {
            Id = item.Id,
            Name = item.Name ?? "Unnamed item",
            Price = item.Price,
            Quantity = item.Quantity ?? 1,
            AssignedTo = item.OrderedBy?.Select(user => new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.EmailAddress,
                Image = user.Image ?? "default-avatar.png"
            }).ToList() ?? new List<UserDTO>()
        }).ToList();
    }
}