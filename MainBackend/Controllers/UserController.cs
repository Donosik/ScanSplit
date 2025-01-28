using System;
using System.Threading.Tasks;
using MainBackend.DTO;
using MainBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MainBackend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UserController: ControllerBase
{
    private readonly IUserService userService;

    public UserController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpDelete("")]
    public IActionResult DeleteMe()
    {
        userService.DeleteMe();
        return Ok();
    }

    [HttpGet("")]
    public async Task<IActionResult> GetMe()
    {
        
        return Ok(await userService.GetMe());
    }

    [HttpGet("{login}")]
    public async Task<IActionResult> GetUserByLogin(string login)
    {
        
        var user = await userService.GetUserByLogin(login);
        if (user == null)
        {
            return NotFound($"User with login '{login}' not found.");
        }
        return Ok(user);
    }
    [HttpPut("")]
    public async Task<IActionResult> UpdateMe([FromBody] UserDTO userDto)
    {
        await userService.UpdateMe(userDto);
        return Ok();
    }

    [HttpPatch("")]
    public async Task<IActionResult> UpdatePassword([FromBody] string password)
    {
        await userService.UpdatePassword(password);
        return Ok();
    }
    
    [HttpGet("groups")]
    public async Task<IActionResult> GetMyGroups()
    {
        var groups = await userService.GetGroupsForUser();
        return Ok(groups);
    }
    
    [HttpPatch("{userId}/ImagePath")]
    public async Task<IActionResult> UpdateImagePath(int userId, string newPath)
    {
        await userService.UpdateUserImage(newPath, userId);
        return Ok();
    }
}