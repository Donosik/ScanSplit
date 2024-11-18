using System.Net;
using MainBackend.Exceptions;
using RestSharp;

namespace MainBackend.Services;

public class AiBackendService : IAiBackendService
{
    private RestClient client;
    private IConfiguration configuration;

    public AiBackendService(IConfiguration configuration)
    {
        this.configuration = configuration;
        var restClientOptions = new RestClientOptions
        {
            BaseUrl = new Uri(this.configuration["AiBackend:BaseUrl"]),
        };
        client = new RestClient(restClientOptions);
    }

    public async Task SendImage()
    {
        var request = new RestRequest("upload-photo", Method.Post);
        var response = await client.ExecuteAsync(request);
        if (response.StatusCode == HttpStatusCode.OK)
        {
            //TODO: Dodać walidacje odpowiedzi z backendu
        }
        else
        {
            throw new AiBackendServiceException();
        }
    }
}