using System.Text.Json;
using FastEndpoints.NSwag;
using Microsoft.AspNetCore.Http.Json;
using PlannerAPI.DataAccess;
using PlannerAPI.Services;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
    var builder = WebApplication.CreateBuilder(args);

    await DB.InitAsync(
        builder.Configuration["DatabaseName"],
        MongoClientSettings.FromConnectionString(builder.Configuration["ConnectionString"]));

    builder.Host.UseSerilog((ctx, lc) => lc
        .WriteTo.Console()
        .ReadFrom.Configuration(ctx.Configuration));

    builder.Services.AddScoped<ICourseRepository, CourseRepository>();
    builder.Services.AddScoped<ICourseRetriever, CourseRetriever>();

    builder.Services.AddCors();
    builder.Services.AddFastEndpoints();
    builder.Services.AddNSwag();
    builder.Services.Configure<JsonOptions>(option =>
        option.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);

    var app = builder.Build();
    app.UseSerilogRequestLogging();
    app.UseCors(b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
    app.UseFastEndpoints();

    if (app.Environment.IsDevelopment())
    {
        app.UseOpenApi();
        app.UseSwaggerUi3();
    }
    else
    {
        app.UseDefaultExceptionHandler();
    }

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}