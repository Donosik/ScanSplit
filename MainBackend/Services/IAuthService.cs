using MainBackend.DTO;

namespace MainBackend.Services;

public interface IAuthService
{
    Task Register(RegisterDTO registerDto);
    Task<string> Login(LoginDTO loginDTO);
}