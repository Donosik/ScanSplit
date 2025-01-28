using System.Threading.Tasks;
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
    private readonly IGroupSettlementService settlementService;

    public GroupController(IGroupService groupService,IGroupSettlementService settlementService)
    {
        this.groupService = groupService;
        this.settlementService = settlementService;
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
    [HttpGet("{idGroup}/get-users")]
    public async Task<IActionResult> GetListUsers(int idGroup)
    {
        var users = await groupService.GetUsersByGroupId(idGroup);
        if (users == null)
        {
            return NotFound();
        }
        return Ok(users);
    }
    
    [HttpDelete("{idGroup}/remove-user")]
    public async Task<IActionResult> RemoveUserFromGroup(int idGroup, [FromQuery] string login)
    {
        await groupService.RemoveUserFromGroup(login, idGroup);
        return Ok();
    }

    [HttpDelete("{idGroup}/leave")]
    public async Task<IActionResult> LeaveGroup(int idGroup)
    {
        await groupService.RemoveSelfFromGroup(idGroup);
        return Ok();
    }

    [HttpDelete("{idGroup}")]
    public async Task<IActionResult> DeleteGroup(int idGroup)
    {
        await groupService.DeleteGroup(idGroup);
        return Ok();
    }
    
    [HttpPatch("{idGroup}/updata-name")]
    public async Task<IActionResult> Updataame([FromBody] string name, int idGroup)
    {
        await groupService.UpadataNameGroup(name, idGroup);
        return Ok();
    }
 
    [HttpPatch("{groupId}/ImagePath")]
    public async Task<IActionResult> UpdateImagePath(int groupId, string newPath)
    {
        await groupService.UpdateGroupImage(newPath, groupId);
        return Ok();
    }

    [HttpGet("{groupId}/mySpendings")]
    public async Task<IActionResult> GetMySpendings(int groupId)
    {
        decimal value = await groupService.GetMySumInGroup(groupId);
        return Ok(value);
    }
    
    [HttpGet("{groupId}/allGroupSpendings")]
    public async Task<IActionResult> GetAllGroupSpendings(int groupId)
    {
        decimal value = await groupService.GetSumInGroup(groupId);
        return Ok(value);
    }
    
    
    [HttpGet("{groupId}/settlements")]
    public async Task<IActionResult> GetSettlements(int groupId)
    {
        try
        {
            var settlements = await settlementService.CalculateSettlementsAsync(groupId);
            return Ok(settlements);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}