using System;
using System.Collections.Generic;
using MainBackend.Database.Generic.Entities;

namespace MainBackend.Database.Entities
{
    public class Bill : IEntity
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual Location Location{ get; set; }
        public string BillImage { get; set; } //jako string bo przechowuje URL do obrazu 
        public virtual ICollection<MenuItem> MenuItems { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}