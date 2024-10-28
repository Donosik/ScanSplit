namespace MainBackend.Database.MainDb.Wrapper;

public class UoW : IUoW
{
    private readonly DB.Context.MainDb context;
    
    public UoW(DB.Context.MainDb context)
    {
        this.context = context;
    }

    public async Task<bool> Save(int entities = 1)
    {
        int result = await context.SaveChangesAsync();
        if (result >= entities)
            return true;
        return false;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if(disposing)
            context.Dispose();
    }
}