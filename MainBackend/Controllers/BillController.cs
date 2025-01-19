using MainBackend.Database.Entities;
using MainBackend.DTO;
using MainBackend.Enums;
using MainBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

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
        int billId = await billService.CreateBill(bill, groupId);
        if (image == null || image.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        try
        {
            // Send file to FastAPI micro-backend
            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            memoryStream.Seek(0, SeekOrigin.Begin);

            using var content = new MultipartFormDataContent();
            content.Add(new StreamContent(memoryStream), "file", image.FileName);

            var fastApiUrl =
                "https://scan-split-914997496942.europe-west1.run.app/upload-photo"; // Update to your FastAPI endpoint
            var response = await _httpClient.PostAsync(fastApiUrl, content);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to process receipt.");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();

            // Deserialize JSON into Receipt object
            var receipt = JsonSerializer.Deserialize<Receipt>(jsonResponse, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (receipt == null)
            {
                return BadRequest("Invalid receipt data.");
            }


            // Map Receipt to MenuItems list
            var menuItems = receipt.Items.Select(item => new MenuItem
            {
                Name = item.Name,
                Price = (decimal)item.Price,
                Quantity = (int)item.Quantity,
            }).ToList();

            if (receipt.Tip != null && receipt.Tip > 0.0)
            {
                menuItems.Add(new MenuItem
                {
                    Name = "Tip",
                    Price = (decimal)receipt.Tip,
                    Quantity = 1
                });
            }

            // Zwróć listę MenuItems
            return Ok(new
            {
                billId = billId,
                menuItems = menuItems
            });
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
}