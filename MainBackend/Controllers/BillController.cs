using MainBackend.Database.Entities;
using MainBackend.DTO;
using MainBackend.Enums;
using MainBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MainBackend.Controllers;


[Authorize]
[ApiController]
[Route("[controller]")]

public class BillController: ControllerBase
{
    private readonly IBillService billService;

    public BillController(IBillService billService)
    {
        this.billService = billService;
    }
    
    // [HttpPost("create")]
    // public async Task<IActionResult> CreateGroup([FromBody] string groupName)
    // {
    //     var groupId = await groupService.CreateGroup(groupName);
    //     return Ok(new { Id = groupId });
    // }
    [HttpGet]
    public async Task<IActionResult> GetAllCurrencies()
    {
        var currencies = await billService.GetAllCurrencies();
        return Ok(currencies);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBill([FromBody] BillDTO billDTo)
    {
        await billService.CreateBill(billDTo);
        return Ok("Bill Created");
    }
}