namespace MainBackend.DTO;

public class UserDTO
{
    public int Id { get; set; }
    public string Login { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string? Image { get; set; }
}