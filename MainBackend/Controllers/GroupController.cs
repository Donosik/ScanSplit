using MainBackend.Enums;
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
        var groupId = await groupService.CreateGroup(groupName);
        return Ok(new { Id = groupId });
    }
    
    [HttpPost("groups/{idGroup}/add-user-by-login")]
    public async Task<IActionResult> AddUserToGroupByLogin(int idGroup, [FromQuery] string login)
    {
         await groupService.AddUserToGroupByLogin(login, idGroup);
        return Ok();
    }
    
    [HttpPost("groups/{idGroup}/add-user-by-phone")]
    public async Task<IActionResult> AddUserToGroupByPhoneNumber([FromQuery] string phoneNumber, int idGroup)
    {
        await groupService.AddUserToGroupByPhoneNumber(phoneNumber, idGroup);
        return Ok();
    }
    
    [HttpPatch("")]
    public async Task<IActionResult> UpdateStatus([FromBody] GroupStatus status, int idGroup)
    {
        await groupService.UpdateStatus(status, idGroup);
        return Ok();
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetGroup(int id)
    {
        var group = await groupService.GetGroupById(id);
        if (group == null)
        {
            return NotFound();
        }
        return Ok(group);
    }
}