using MainBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainBackend.Database.DB.Context;

public class MainDb : DbContext
{
    public MainDb(DbContextOptions<MainDb> options) : base(options)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Transfer> Transfers { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Login).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Password).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(12);
            entity.Property(e => e.EmailAddress).HasMaxLength(100);

            entity.HasMany(u => u.Groups)
                   .WithMany(g => g.Users)
                   .UsingEntity<Dictionary<string, object>>(
                        "UserGroup", // Nazwa tabeli pośredniej
                        j => j.HasOne<Group>().WithMany().HasForeignKey("GroupId"),
                        j => j.HasOne<User>().WithMany().HasForeignKey("UserId")
                        );
        });

        // Group
        modelBuilder.Entity<Group>(entity =>
        {
            entity.ToTable("Groups");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Status).IsRequired().HasMaxLength(40);

            entity.HasMany(e => e.Bills).WithOne().OnDelete(DeleteBehavior.Cascade); 
            entity.HasMany(e => e.Transfers).WithOne().OnDelete(DeleteBehavior.Cascade);
        });
        // Bill
        modelBuilder.Entity<Bill>(entity =>
        {
            entity.ToTable("Bills");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Date).IsRequired();
            entity.Property(e => e.BillImage).HasMaxLength(255);


            entity.HasOne(e => e.Location).WithMany().OnDelete(DeleteBehavior.Restrict);
            entity.HasMany(e => e.MenuItems).WithMany().UsingEntity(j => j.ToTable("BillMenuItems"));
            entity.HasMany(e => e.Payments).WithOne().OnDelete(DeleteBehavior.Cascade);
        });

        // MenuItem
        modelBuilder.Entity<MenuItem>(entity =>
        {
            entity.ToTable("MenuItems");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Price).IsRequired().HasColumnType("decimal(6,2)");

            entity.HasMany<User>("OrderedBy").WithMany("OrderedItems").UsingEntity(j => j.ToTable("UserMenuItems"));

        });

        //Payment
        modelBuilder.Entity<Payment>(entity =>
        {
            entity.ToTable("Payments");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).IsRequired().HasColumnType("decimal(6,2)");

            entity.HasOne(e => e.User).WithMany().HasForeignKey(e => e.UserId).OnDelete(DeleteBehavior.Restrict);
        });

        //Location
        modelBuilder.Entity<Location>(entity =>
        {
            entity.ToTable("Locations");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.City).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Country).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Address).HasMaxLength(200);
        });

        //Transfer
        modelBuilder.Entity<Transfer>(entity =>
        {
            entity.ToTable("Transfers");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).IsRequired().HasColumnType("decimal(6,2)");
            entity.Property(e => e.Status).IsRequired().HasMaxLength(20);

            entity.HasOne(e => e.Payer).WithMany().HasForeignKey(e => e.PayerId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Recipient).WithMany().HasForeignKey(e => e.RecipientId).OnDelete(DeleteBehavior.Restrict);
        });
    }
}