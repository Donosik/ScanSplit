using MainBackend.Database.Generic.Entities;

namespace MainBackend.Database.Entities
{
    public class Location : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public virtual Bill Bill { get; set; }
    }
}
