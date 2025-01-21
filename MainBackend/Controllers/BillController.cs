using MainBackend.Database.Entities;
using MainBackend.DTO;
using MainBackend.Enums;
using MainBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;

namespace MainBackend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class BillController : ControllerBase
{
    private readonly IBillService billService;
    private readonly HttpClient _httpClient;

    public BillController(IBillService billService, HttpClient httpClient)
    {
        this.billService = billService;
        _httpClient = httpClient;
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

    [HttpPost("{groupId}")]
    public async Task<IActionResult> CreateBill([FromForm] BillDTO bill, IFormFile image, int groupId)
    {
        if (bill == null || groupId <= 0)
            return BadRequest("Invalid bill or groupId.");

        if (image == null || image.Length == 0)
            return BadRequest("No file uploaded.");

        try
        {
            BillResponse billId = await billService.CreateBill(bill, groupId);

            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            memoryStream.Seek(0, SeekOrigin.Begin);

            using var content = new MultipartFormDataContent();
            content.Add(new StreamContent(memoryStream), "file", image.FileName);

            var fastApiUrl = "https://scan-split-914997496942.europe-west1.run.app/upload-photo";
            var response = await _httpClient.PostAsync(fastApiUrl, content);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Failed to process receipt.");

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var receipt = JsonSerializer.Deserialize<Receipt>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (receipt == null)
                return BadRequest("Invalid receipt data.");

            var menuItems = receipt.Items.Select(item => new MenuItem
            {
                Name = item.Name,
                Price = (decimal)item.Price,
                Quantity = item.Quantity
            }).ToList();

            if (receipt.Tip.HasValue && receipt.Tip.Value > 0)
            {
                menuItems.Add(new MenuItem { Name = "Tip", Price = (decimal)receipt.Tip.Value, Quantity = 1 });
            }

            return Ok(new { billId, menuItems });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    public class Receipt
    {
        public string Name { get; set; }
        public string Date { get; set; }
        public string Location { get; set; }
        public double Total { get; set; }
        public double? Tip { get; set; }
        public double? Tax { get; set; }
        public string AdditionalInfo { get; set; }
        public List<Item> Items { get; set; }
    }

    public class Item
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public string Category { get; set; }
        public string Notes { get; set; }
    }

    [HttpPost("{billId}/add-menu-items")]
    public async Task<IActionResult> AddMenuItemsToBill(int billId, [FromBody] List<MenuItem> menuItems)
    {
        if (menuItems == null || !menuItems.Any())
        {
            return BadRequest("No menu items provided.");
        }

        try
        {
            await billService.AddMenuItemsToBillAsync(billId, menuItems);
            return Ok("Menu items added to the bill.");
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
        
        
    }

    
    [HttpPatch("{idBill})/updata-name")]
    public async Task<IActionResult> UpdateName([FromBody] string name, int idBill)
    {
        await billService.UpadateNameBill(name, idBill);
        return Ok();
    }
    [HttpPatch("{idBill}/updata-date")]
    public async Task<IActionResult> UpdateDate([FromBody] DateTime date, int  idBill)
    {
        await billService.UpadateDateBill(date, idBill);
        return Ok();
     }

    /// <summary>
    /// Gets details of a specific bill including menu items and assigned users
    /// </summary>
    /// <param name="id">The ID of the bill to retrieve</param>
    /// <returns>The bill details</returns>
    /// <response code="200">Returns the bill details</response>
    /// <response code="404">If the bill is not found</response>
    /// <response code="500">If there was an internal server error</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<BillDetailDTO>> GetBillDetails(int id)
    {
        try
        {
            var bill = await billService.GetBillDetailsAsync(id);
            if (bill == null)
            {
                return NotFound();
            }
            return Ok(bill);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }

    }

    [HttpPost("{billId}/payments")]
    public async Task<IActionResult> AddPayment(int billId, int userId)
    { try{
        await billService.AddPaymentToBill(billId, userId);

        return Ok(new { message = "Payment added successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
        }
    }
    
    
    [HttpGet("{billId}/mysum")]
    public async Task<IActionResult> GetMySumInBill(int billId)
    {
        try
        {
            var totalSum = await billService.GetMySumInBill(billId);
            return Ok(new { totalSum });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
        }
    }

    [HttpPatch("{billId}/ImagePath")]
    public async Task<IActionResult> UpdateImagePath(int billId, string newPath)
    {
        await billService.UpdateBillImage(newPath, billId);
        return Ok();
    }
}