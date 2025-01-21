namespace MainBackend.Services;

public interface ICloudStorageService
{
    public Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType);
    public Task DeleteImageAsync(string objectName);
    public string GetSignedUrl(string objectName, TimeSpan? expiration = null); 
}