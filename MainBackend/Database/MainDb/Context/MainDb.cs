using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.DB.Context;

public class MainDb : DbContext
{
    public MainDb(DbContextOptions<MainDb> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}