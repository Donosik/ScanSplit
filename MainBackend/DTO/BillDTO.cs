using System.Text.Json.Serialization;
using MainBackend.Enums;
using MainBackend.Helpers;

namespace MainBackend.DTO;

public class BillDTO
{
    public DateTime Date { get; set; }
    public LocationDTO Location { get; set; } 
    public string BillImage { get; set; }
    public string Name { get; set; }
    public Currency Currency { get; set; } 
}