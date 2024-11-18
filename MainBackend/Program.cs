using MainBackend.Database.DB.Context;
using MainBackend.Extensions;
using MainBackend.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MainDb>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MainDb")));

builder.Services.AddAllScopes();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddJwtBearerToSwagger();

builder.Services.AddJwt(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();