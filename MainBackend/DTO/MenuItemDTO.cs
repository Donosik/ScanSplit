using System.Text.Json.Serialization;
using MainBackend.Enums;
using MainBackend.Helpers;

namespace MainBackend.DTO;

public class MenuItemDTO
{
   
    public string Name { get; set; }
    public decimal Price { get; set; } 
    public decimal Quantity { get; set; }
}