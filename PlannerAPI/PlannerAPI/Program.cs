using System.Text.Json;
using FastEndpoints.Swagger;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.IdentityModel.Tokens;
using PlannerAPI.Configurations;
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

    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<IPlannerRepository, PlannerRepository>();
    builder.Services.AddScoped<ICourseRepository, CourseRepository>();
    builder.Services.AddScoped<ICourseRetriever, CourseRetriever>();

    builder.Services.AddCors();
    builder.Services.AddFastEndpoints();
    builder.Services.AddSwaggerDoc();
    builder.Services.AddResponseCaching();
    builder.Services.Configure<JsonOptions>(option =>
        option.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);

    var firebaseConfig = new FirebaseConfiguration();
    firebaseConfig.LoadCredentialConfigurations(builder.Configuration);
    FirebaseApp.Create(new AppOptions
    {
        Credential =
            GoogleCredential.FromJson(firebaseConfig.GetCredentialInJsonText())
    });

    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(option =>
        {
            option.Authority = builder.Configuration["Jwt:Firebase:ValidIssuer"];
            option.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Firebase:ValidIssuer"],
                ValidAudience = builder.Configuration["Jwt:Firebase:ValidAudience"]
            };
        });


    var app = builder.Build();

    app.UseSerilogRequestLogging();
    app.UseCors(b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseResponseCaching();
    app.UseFastEndpoints();

    if (app.Environment.IsDevelopment())
    {
        app.UseOpenApi();
        app.UseSwaggerUi3(s => s.ConfigureDefaults());
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