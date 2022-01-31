using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Linq;
using PlannerAPI.Configurations;

namespace PlannerAPI.Services;

public class ReCaptchaVerifier : IReCaptchaVerifier
{
    private readonly ReCaptchaSettings _reCaptchaSettings;
    private readonly ILogger _logger;

    public ReCaptchaVerifier(IConfiguration config, ILogger<ReCaptchaVerifier> logger)
    {
        _reCaptchaSettings = new ReCaptchaSettings();
        _logger = logger;
        config.GetSection("ReCaptchaSettings").Bind(_reCaptchaSettings);
    }

    public async Task<bool> IsTokenValid(string reToken)
    {
        var result = false;

        try
        {
            result = await verifyWithGoogle(reToken);
        }
        catch (Exception e)
        {
            _logger.Log(LogLevel.Error, "Unexpected error calling reCAPTCHA api");
        }

        return result;
    }

    private async Task<bool> verifyWithGoogle(string reToken)
    {
        var parameters = new Dictionary<string, string>
        {
            {"secret", _reCaptchaSettings.SecretKey},
            {"response", reToken}
        };
            
        using var client = new HttpClient();
        var response =
            await client.PostAsync(
                $"{_reCaptchaSettings.GoogleVerificationUrl}", new FormUrlEncodedContent(parameters));
        var jsonString = await response.Content.ReadAsStringAsync();
        dynamic apiJson = JObject.Parse(jsonString);

        return apiJson.success;
    }
}

public interface IReCaptchaVerifier
{
    public Task<bool> IsTokenValid(string reToken);
}