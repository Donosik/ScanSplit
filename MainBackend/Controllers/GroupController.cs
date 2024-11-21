using MainBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MainBackend.Controllers;


[Authorize]
[ApiController]
[Route("[controller]")]

public class GroupController: ControllerBase
{
    private readonly IGroupService groupService;

    public GroupController(IGroupService groupService)
    {
        this.groupService = groupService;
    }
    
    [HttpPost("create")]
    public async Task<IActionResult> CreateGroup([FromBody] string groupName)
    {
        await groupService.CreateGroup(groupName);
        return Ok();
    }
    
    [HttpPost("add-user-by-login")]
    public async Task<IActionResult> AddUserToGroupByLogin([FromBody] string login, int idGroup)
    {
         await groupService.AddUserToGroupByLogin(login, idGroup);
        return Ok();
    }
    
    [HttpPost("add-user-by-phone")]
    public async Task<IActionResult> AddUserToGroupByPhoneNumber([FromBody] string phoneNumber, int idGroup)
    {
        await groupService.AddUserToGroupByPhoneNumber(phoneNumber, idGroup);
        return Ok();
    }
    
    [HttpPatch("")]
    public async Task<IActionResult> UpdateStatus([FromBody] string status, int idGroup)
    {
        await groupService.UpdateStatus(status, idGroup);
        return Ok();
    }
}