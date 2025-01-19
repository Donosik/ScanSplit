using System.Collections.Generic;
using MainBackend.Database.Generic.Entities;
using MainBackend.Enums;

namespace MainBackend.Database.Entities
{
    public class Group : IEntity
    {
        public int Id { get; set; }

        public string Name {get; set; }
        
        public string Image { get; set; }
        public HashSet<User> Users { get; set; } = new HashSet<User>();
        public ICollection<Bill> Bills { get; set; }
        public ICollection<Transfer> Transfers { get; set; }
        public GroupStatus Status { get; set; }
    }
}
