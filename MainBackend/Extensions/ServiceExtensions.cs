using MainBackend.Database.Generic.Repositories;
using MainBackend.Database.MainDb.UoW;
using MainBackend.Services;

namespace MainBackend.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddAllScopes(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        
        services.AddScoped<IUoW, UoW>();
        
        //Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITransferRepository, TransferRepository>();
        services.AddScoped<IBillRepository, BillRepository>();
        services.AddScoped<IGroupRepository, GroupRepository>();
        services.AddScoped<ILocationRepository, LocationRepository>();
        services.AddScoped<IMenuItemRepository, MenuItemRepository>();
        services.AddScoped<IPaymentRepository, PaymentRepository>();
        
        //Services
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IIdentityService, IdentityService>();
        
        return services;
    }
}