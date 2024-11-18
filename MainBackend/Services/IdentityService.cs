using System.Security.Claims;
using MainBackend.Database.Entities;
using MainBackend.Exceptions;

namespace MainBackend.Services;

public class IdentityService : IIdentityService
{
    private readonly IHttpContextAccessor httpContextAccessor;

    public IdentityService(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    public int GetLoggedUserId()
    {
        var clientIdClaim = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
        if (clientIdClaim == null || !int.TryParse(clientIdClaim, out int clientId))
        {
            throw new UserNotLoggedException();
        }

        return clientId;
    }
}