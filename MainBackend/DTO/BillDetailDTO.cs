using MainBackend.Database.Entities;
using System;
using System.Collections.Generic;

namespace MainBackend.DTO;

public class BillDetailDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = "No name";
    public string Image { get; set; } = "no-image.jpg";
    public DateTime Date { get; set; } = DateTime.Now;
    public decimal Amount { get; set; } = Decimal.Zero;
    public string Status { get; set; } = "pending";
    public string Currency { get; set; } = "USD";
    public string PaidBy { get; set; } = "Not paid";
    public List<MenuItemDetailDTO> Items { get; set; } = new List<MenuItemDetailDTO>();
}

public class MenuItemDetailDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public List<UserDTO> AssignedTo { get; set; } = new List<UserDTO>();
} 