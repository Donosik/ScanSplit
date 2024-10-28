using MainBackend.Database.Generic.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.Generic.Repositories;

public abstract class GenericRepository<T> : IGenericRepository<T> where T : class, IEntity
{
    protected readonly DbContext dbContext;

    protected GenericRepository(DbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    protected IQueryable<T> GetQuery()
    {
        return dbContext.Set<T>();
    }

    public async Task<T> Get(int id)
    {
        return await GetQuery().FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<ICollection<T>> GetAll()
    {
        return await GetQuery().ToListAsync();
    }

    public void Create(T entity)
    {
        dbContext.Set<T>().Add(entity);
    }

    public void Update(T entity)
    {
        dbContext.Set<T>().Update(entity);
    }

    public void Delete(T entity)
    {
        dbContext.Set<T>().Remove(entity);
    }

    public async Task Delete(int id)
    {
        Delete(await Get(id));
    }
}