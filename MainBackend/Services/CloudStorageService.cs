using System.IO;
using Google.Cloud.Storage.V1;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace MainBackend.Services;

public class CloudStorageService : ICloudStorageService
{
    private readonly StorageClient _storageClient;
    private readonly string _bucketName;
    private readonly ILogger<CloudStorageService> _logger;
    private readonly string _credentialsPath;

    public CloudStorageService(ILogger<CloudStorageService> logger, IConfiguration configuration)
    {
        _logger = logger;
        
        var googleCloudConfig = configuration.GetSection("GoogleCloudStorage");
        _bucketName = googleCloudConfig["BucketName"] ?? throw new InvalidOperationException("Google Cloud Storage bucket name not configured");
        _credentialsPath = Path.Combine(AppContext.BaseDirectory, googleCloudConfig["CredentialsPath"] 
            ?? throw new InvalidOperationException("Google Cloud Storage credentials path not configured"));

        try
        {
            if (!File.Exists(_credentialsPath))
            {
                throw new FileNotFoundException($"Google Cloud credentials file not found at: {_credentialsPath}");
            }

            var credential = GoogleCredential.FromFile(_credentialsPath);
            _storageClient = StorageClient.Create(credential);
            
            // Verify bucket exists
            _storageClient.GetBucket(_bucketName);
            _logger.LogInformation("Successfully initialized Google Cloud Storage client");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to initialize Google Cloud Storage client");
            throw new InvalidOperationException("Failed to initialize Google Cloud Storage. See inner exception for details.", ex);
        }
    }

    /// <summary>
    /// Uploads an image to the specified Cloud Storage bucket.
    /// </summary>
    /// <param name="imageStream">The stream of the image to upload.</param>
    /// <param name="fileName">The name of the file being uploaded.</param>
    /// <param name="contentType">The content type of the file.</param>
    /// <returns>The signed URL of the uploaded image.</returns>
    public async Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType)
    {
        try
        {
            var objectName = $"{Guid.NewGuid()}_{fileName}";
            await _storageClient.UploadObjectAsync(_bucketName, objectName, contentType, imageStream);
            _logger.LogInformation("Successfully uploaded image: {ObjectName}", objectName);
            return objectName;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to upload image {FileName}", fileName);
            throw new InvalidOperationException($"Failed to upload image {fileName}. See inner exception for details.", ex);
        }
    }

    /// <summary>
    /// Deletes an image from the specified Cloud Storage bucket.
    /// </summary>
    /// <param name="objectName">The name of the object to delete.</param>
    public async Task<bool> DeleteImageAsync(string objectName)
    {
        try
        {
            await _storageClient.DeleteObjectAsync(_bucketName, objectName);
            _logger.LogInformation("Successfully deleted image: {ObjectName}", objectName);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete image {ObjectName}", objectName);
            throw new InvalidOperationException($"Failed to delete image {objectName}. See inner exception for details.", ex);
        }
    }

    /// <summary>
    /// Generates a signed URL for accessing an image stored in the Cloud Storage bucket.
    /// </summary>
    /// <param name="objectName">The name of the object to retrieve.</param>
    /// <param name="expiration">The expiration time for the signed URL.</param>
    /// <returns>The signed URL of the image.</returns>
    public async Task<string> GetSignedUrlAsync(string objectName, TimeSpan? expiration = null)
    {
        try
        {
            var urlSigner = UrlSigner.FromServiceAccountPath(_credentialsPath);
            var expirationTime = expiration ?? TimeSpan.FromHours(1);

            var signedUrl = await urlSigner.SignAsync(
                bucket: _bucketName,
                objectName: objectName,
                duration: expirationTime
            );

            _logger.LogInformation("Successfully generated signed URL for: {ObjectName}", objectName);
            return signedUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to generate signed URL for {ObjectName}", objectName);
            throw new InvalidOperationException($"Failed to generate signed URL for {objectName}. See inner exception for details.", ex);
        }
    }
}