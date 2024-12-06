using MainBackend.Database.Entities;

namespace MainBackend.DTO;

public class GroupDTO
{
        public int? Id { get; set; }
        public string Name {get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Bill> Bills { get; set; }
        public ICollection<Transfer> Transfers { get; set; }
        public string Status { get; set; }
}