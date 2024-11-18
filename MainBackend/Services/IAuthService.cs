using MainBackend.DTO;

namespace MainBackend.Services;

public interface IAuthService
{
    Task Register(RegisterDTO registerDTO);
    Task<string> Login(LoginDTO loginDTO);
}