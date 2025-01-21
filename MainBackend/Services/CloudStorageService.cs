using Google.Cloud.Storage.V1;
using System;
using System.IO;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using MainBackend.Services;

public class CloudStorageService: ICloudStorageService
{
    private readonly StorageClient _storageClient;
    private readonly string _bucketName = "scan-split-images";

    public CloudStorageService()
    {
        var serviceAccountPath = Environment.GetEnvironmentVariable("SCAN_SPLIT_GOOGLE_APPLICATION_CREDENTIALS");
        _storageClient = StorageClient.Create(GoogleCredential.FromFile(serviceAccountPath));
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
        var objectName = Guid.NewGuid() + "_" + fileName;
        await _storageClient.UploadObjectAsync(_bucketName, objectName, contentType, imageStream);
        return objectName;
    }

    /// <summary>
    /// Deletes an image from the specified Cloud Storage bucket.
    /// </summary>
    /// <param name="objectName">The name of the object to delete.</param>
    public async Task DeleteImageAsync(string objectName)
    {
        await _storageClient.DeleteObjectAsync(_bucketName, objectName);
    }

    /// <summary>
    /// Generates a signed URL for accessing an image stored in the Cloud Storage bucket.
    /// </summary>
    /// <param name="objectName">The name of the object to retrieve.</param>
    /// <param name="expiration">The expiration time for the signed URL.</param>
    /// <returns>The signed URL of the image.</returns>
    public string GetSignedUrl(string objectName, TimeSpan? expiration = null)
    {
        var urlSigner = UrlSigner.FromServiceAccountPath(Environment.GetEnvironmentVariable("SCAN_SPLIT_GOOGLE_APPLICATION_CREDENTIALS"));
        var expirationTime = expiration ?? TimeSpan.FromHours(1); // Default to 1 hour

        // Create the signed URL
        var signedUrl = urlSigner.Sign(
            bucket: _bucketName,
            objectName: objectName,
            duration: expirationTime
            // expiration: DateTime.UtcNow.Add(expirationTime),
            // options: null // You can specify additional options if needed
        );

        return signedUrl;
    }
}