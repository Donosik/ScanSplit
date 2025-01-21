using System;
using System.IO;
using System.Threading.Tasks;

namespace MainBackend.Services;

public interface ICloudStorageService
{
    Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType);
    Task<bool> DeleteImageAsync(string objectName);
    Task<string> GetSignedUrlAsync(string objectName, TimeSpan? expiration = null);
}