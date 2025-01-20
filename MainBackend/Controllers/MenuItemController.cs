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
using System.Collections.Generic;

namespace MainBackend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class MenuItemController : ControllerBase
{
    private readonly IMenuItemService _menuItemService;
    private readonly HttpClient _httpClient;

    public MenuItemController(IMenuItemService menuItemService, HttpClient httpClient)
    {
        _menuItemService = menuItemService;
        _httpClient = httpClient;
    }

    /// <summary>
    /// Gets a menu item with its assigned users
    /// </summary>
    /// <param name="id">The ID of the menu item</param>
    /// <returns>The menu item with its assigned users</returns>
    /// <response code="200">Returns the menu item with its users</response>
    /// <response code="404">If the menu item is not found</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MenuItem>> GetMenuItemWithUsers(int id)
    {
        var menuItem = await _menuItemService.GetMenuItemWithUsersAsync(id);
        
        if (menuItem == null)
        {
            return NotFound();
        }

        return Ok(menuItem);
    }

    /// <summary>
    /// Updates the list of users assigned to a menu item
    /// </summary>
    /// <param name="id">The ID of the menu item</param>
    /// <param name="userIds">List of user IDs to assign to the menu item</param>
    /// <returns>The updated menu item with its assigned users</returns>
    /// <response code="200">Returns the updated menu item</response>
    /// <response code="404">If the menu item is not found</response>
    [HttpPut("{id}/users")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MenuItem>> UpdateAssignedUsers(int id, [FromBody] List<int> userIds)
    {
        var menuItem = await _menuItemService.UpdateAssignedUsersAsync(id, userIds);
        
        if (menuItem == null)
        {
            return NotFound();
        }

        return Ok(menuItem);
    }

    // [HttpGet]
    // public async Task<IActionResult> GetAssignedUsersForMenuItem(int id)
    // {
    //     try
    //     {
    //         var item = _menuItemService.GetAssignedUsersAsync(id);
    //         
    //         return Ok(item);
    //     }
    //     catch
    //     {
    //         return NotFound();
    //     }
    // }
}