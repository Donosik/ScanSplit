using System.Text.Json.Serialization;
using MainBackend.Database.DB.Context;
using MainBackend.Extensions;
using MainBackend.Helpers;
using MainBackend.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MainDb>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MainDb")));

builder.Services.AddAllScopes();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new CurrencyJsonConverter());
    options.JsonSerializerOptions.ReferenceHandler=ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented=true;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddJwtBearerToSwagger();

builder.Services.AddJwt(builder.Configuration);

builder.Services.AddHttpClient();


builder.Services.AddCors();


var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();