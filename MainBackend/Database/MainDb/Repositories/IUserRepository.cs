using MainBackend.Database.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IUserRepository: IGenericRepository<User>
{
    Task<User> GetByLogin(string login);
    Task<User> GetByPhoneNumber(string phoneNumber);
    Task<IEnumerable<Group>> GetUserGroups(int userId);
    Task<User> GetByIdAsync(int userId);
}