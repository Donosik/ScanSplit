using MainBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MainBackend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UploadImageController: ControllerBase
{
   private ICloudStorageService _cloudStorageService;

   public UploadImageController(ICloudStorageService cloudStorageService)
   {
      _cloudStorageService = cloudStorageService;
   }


   [HttpPost]
   public async Task<IActionResult> UploadImage(IFormFile file)
   {
      // Check if the file is null or empty
      if (file == null || file.Length == 0)
      {
         return BadRequest("No file uploaded.");
      }

      // Create a stream for the uploaded file
      using var stream = file.OpenReadStream();
      var contentType = file.ContentType;
      var imagePath = await _cloudStorageService.UploadImageAsync(stream, file.FileName, contentType);
      return Ok(imagePath);
   }
}