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
}