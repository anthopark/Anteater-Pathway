using FastEndpoints.Swagger;
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
    builder.Services.AddSwagger();
    builder.Services.Configure<JsonOptions>(option =>
        option.SerializerOptions.PropertyNamingPolicy = null);

    var app = builder.Build();
    app.UseSerilogRequestLogging();
    app.UseCors(b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
    app.UseFastEndpoints();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
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