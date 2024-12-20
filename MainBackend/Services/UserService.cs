﻿using System.Security.Cryptography;
using System.Text;
using MainBackend.Database.Entities;
using MainBackend.Database.Generic.Repositories;
using MainBackend.Database.MainDb.UoW;
using MainBackend.DTO;

namespace MainBackend.Services;

public class UserService: IUserService
{
    private readonly IIdentityService identityService;
    private readonly IUoW uow;

    public UserService(IUoW uow, IIdentityService identityService)
    {
        this.identityService = identityService;
        this.uow = uow;
    }

    public async Task DeleteMe()
    {
        var userId = identityService.GetLoggedUserId();
        await uow.UserRepository.Delete(userId);
        await uow.Save();
    }

    public async Task<UserDTO> GetMe()
    { 
        var userId = identityService.GetLoggedUserId();
        UserDTO userDto = new UserDTO();
        var user= await uow.UserRepository.Get(userId);
        userDto.PhoneNumber = user.PhoneNumber;
        userDto.Name = user.Name;
        userDto.LastName = user.LastName;
        userDto.Email = user.EmailAddress;
        userDto.Login = user.Login;
        userDto.Id = user.Id;
        
       return userDto;
    }

    public async Task UpdateMe(UserDTO userDto)
    {
        var userId = identityService.GetLoggedUserId();
        var user = await uow.UserRepository.Get(userId);
        user.Login=userDto.Login;
        user.PhoneNumber = userDto.PhoneNumber;
        user.Name = userDto.Name;
        user.LastName = userDto.LastName;
        user.EmailAddress = userDto.Email;
        
        uow.UserRepository.Update(user);
        await uow.Save();
    }

    public async Task UpdatePassword(string password)
    {
        var userId = identityService.GetLoggedUserId();
        var user = await uow.UserRepository.Get(userId);
        user.Password = HashPassword(password);
        uow.UserRepository.Update(user);
        await uow.Save();
    }
    
    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
    }
}