using MainBackend.Database.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IUserRepository: IGenericRepository<User>
{
    Task<User> GetByLogin(string login);
}