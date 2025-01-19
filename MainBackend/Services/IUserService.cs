using MainBackend.Database.Entities;
using MainBackend.DTO;

namespace MainBackend.Services;

public interface IUserService
{
    public Task DeleteMe();
    public Task<UserDTO> GetMe();
    
    public Task<UserDTO> GetUserByLogin(string login);
    
    public Task UpdateMe(UserDTO userDto);
    
    public Task UpdatePassword(string password);
    
    public Task<IEnumerable<GroupDTO>> GetGroupsForUser();

}