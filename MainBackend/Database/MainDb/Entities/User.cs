using MainBackend.Database.Generic.Entities;
using MainBackend.DTO;

namespace MainBackend.Database.Entities
{
    public class User : IEntity
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public virtual ICollection<Group> Groups { get; set; } = new List<Group>();
      
        public User()
        {
        }

        public User(RegisterDTO registerDto)
        {
            Login = registerDto.Login;
            Password = registerDto.Password;
            Name = registerDto.Name;
            LastName = registerDto.LastName;
            PhoneNumber = registerDto.PhoneNumber;
            EmailAddress = registerDto.Email;
            Groups = new List<Group>();
        }
    }
}