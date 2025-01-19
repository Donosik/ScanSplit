using System;
using System.Collections.Generic;
using MainBackend.Database.Generic.Entities;
using MainBackend.DTO;
using MainBackend.Enums;
using Microsoft.Identity.Client;

namespace MainBackend.Database.Entities
{
    public class Bill : IEntity
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual Location Location{ get; set; }
        public string BillImage { get; set; } //jako string bo przechowuje URL do obrazu 
        public string CoverImage { get; set; }
        public string Name { get; set; }
        public Currency Currency { get; set; }
        public virtual ICollection<MenuItem> MenuItems { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        
        public Bill()
        {}

        public Bill(BillDTO billDto)
        {
            Date = billDto.Date;
            Location = billDto.Location != null ? new Location
            {
                Name = billDto.Location.Name,
                City = billDto.Location.City,
                Country = billDto.Location.Country,
                Address = billDto.Location.Address
            } : null;
            BillImage = billDto.BillImage;
            Name = billDto.Name;
            Currency = billDto.Currency;
        }
    }
    
    
}