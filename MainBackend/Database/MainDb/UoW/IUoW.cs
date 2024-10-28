namespace MainBackend.Database.MainDb.Wrapper;

public interface IUoW : IDisposable
{
    Task<bool> Save(int entities = 1);
    void Dispose();
}