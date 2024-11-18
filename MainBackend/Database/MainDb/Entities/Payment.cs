using MainBackend.Database.Generic.Entities;

namespace MainBackend.Database.Entities
{
    public class Payment : IEntity
    {
        public int Id { get; set; }
        public User User { get; set; }
        public virtual int UserId { get; set; }
        public decimal Amount { get; set; }
    }
}