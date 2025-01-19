using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.IO;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        string filePath = "path/to/your/image.jpg"; // Path to the image
        string apiUrl = "http://localhost:8000/upload-photo"; // FastAPI endpoint URL

        using (var client = new HttpClient())
        using (var form = new MultipartFormDataContent())
        using (var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
        using (var fileContent = new StreamContent(fileStream))
        {
            // Set content headers for the file
            fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("image/jpeg");
            form.Add(fileContent, "file", Path.GetFileName(filePath)); // Match name with FastAPI parameter

            // Send the request
            HttpResponseMessage response = await client.PostAsync(apiUrl, form);
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Response from FastAPI: " + responseContent);
            }
            else
            {
                Console.WriteLine("Failed to send photo: " + response.StatusCode);
            }
        }
    }
}