using System.Collections.Generic;
using MainBackend.Database.Generic.Entities;

namespace MainBackend.Database.Entities
{
    public class MenuItem : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public virtual ICollection<User> OrderedBy { get; set; }
    }
}