using MainBackend.Database.Generic.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IGenericRepository<T> where T : class,IEntity
{
    Task<T> Get(int id);
    Task<ICollection<T>> GetAll();
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task Delete(int id);
}