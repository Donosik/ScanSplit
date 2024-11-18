using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;
using MainBackend.DTO;
using MainBackend.Exceptions;
using Microsoft.IdentityModel.Tokens;

namespace MainBackend.Services;

public class AuthService : IAuthService
{
    private readonly IUoW uow;
    private readonly IConfiguration configuration;

    public AuthService(IUoW uow, IConfiguration configuration)
    {
        this.uow = uow;
        this.configuration = configuration;
    }

    public async Task Register(RegisterDTO registerDto)
    {
        await CheckRegisterDto(registerDto);
        User newUser = new User(registerDto);
        newUser.Password = HashPassword(registerDto.Password);
        uow.UserRepository.Create(newUser);
        await uow.Save();
    }

    private async Task<bool> CheckRegisterDto(RegisterDTO registerDto)
    {
        User user = await uow.UserRepository.GetByLogin(registerDto.Login);
        if (user != null)
            throw new UserAlreadyExistException();
        return true;
    }

    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
    }

    public async Task<string> Login(LoginDTO loginDTO)
    {
        User user = await uow.UserRepository.GetByLogin(loginDTO.Login);
        if (user == null)
            throw new LoginNotFoundException();
        if (user.Password != HashPassword(loginDTO.Password))
            throw new IncorrectPasswordException();
        return GenerateJwtToken(user);
    }

    private string GenerateJwtToken(User user)
    {
        var issuer = configuration["JwtSettings:Issuer"];
        var audience = configuration["JwtSettings:Audience"];
        var key = configuration["JwtSettings:Key"];
        var expiration = DateTime.UtcNow.AddHours(8);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Id.ToString()),
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiration,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}