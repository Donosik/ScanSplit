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
        Console.WriteLine("halo3");
        foreach (var group in groups)
        {
            Console.WriteLine($"Group ID: {group.Id}, Group Name: {group.Name}");
        }
        return Ok(groups);
    }
}