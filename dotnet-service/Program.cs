using dotnet_service.data;
using dotnet_service.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options=>options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();  // This enables the basic endpoint explorer (Swagger generation)
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<OrderService>();
builder.Services.AddControllers();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // Middleware to generate Swagger JSON
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.MapGet("/",()=>{
    return "server runing";
});

app.UseHttpsRedirection();



app.MapControllers();
app.Run();

