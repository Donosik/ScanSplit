using MainBackend.Database.Generic.Entities;

namespace MainBackend.Database.Entities
{
    public class Transfer : IEntity
    {
        public int Id { get; set; }
        public virtual User Payer { get; set; }
        public virtual int PayerId { get; set; }
        public virtual User Recipient { get; set; }
        public virtual int RecipientId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
    }
}
