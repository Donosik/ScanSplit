using MainBackend.Database.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IUserRepository: IGenericRepository<User>
{
    Task<User> GetByLogin(string login);
    Task<User> GetByPhoneNumber(string phoneNumber);
    Task<IEnumerable<(int id , string name)>>  GetUserGroups(int userId);
}