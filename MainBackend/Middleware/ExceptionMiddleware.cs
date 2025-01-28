using System.Net;
using System.Text.Json.Serialization;
using MainBackend.Exceptions;
using Newtonsoft.Json;

namespace MainBackend.Middleware;

public class ExceptionMiddleware
{
    private readonly ILogger<ExceptionMiddleware> logger;
    private readonly RequestDelegate next;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        this.next = next;
        this.logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
            var response = context.Response;
            response.ContentType = "application/json";
            var (statusCode, statusDescription) = HandleException(ex);
            response.StatusCode = (int)statusCode;
            await response.WriteAsync(JsonConvert.SerializeObject(statusDescription));
        }
    }

    private (HttpStatusCode code,string message) HandleException(Exception exception)
    {
        HttpStatusCode code;
        string message;
        switch (exception)
        {
            case IncorrectDBSaveException:
                code = HttpStatusCode.BadRequest;
                message = "Cannot save data to DB";
                break;
            case IncorrectPasswordException or LoginNotFoundException:
                code = HttpStatusCode.NotFound;
                message = "Invalid username or password";
                break;
            case UserAlreadyExistException:
                code = HttpStatusCode.Conflict;
                message = "User already exist";
                break;
            case UserNotLoggedException:
                code = HttpStatusCode.Unauthorized;
                message = "User not logged in";
                break;
            case NotFoundException:
                code = HttpStatusCode.NotFound;
                message = "Object not found";
                break;
            default:
                code=HttpStatusCode.InternalServerError;
                message = "Internal Server Error";
                break;
        }
        return (code, message);
    }
}