namespace PlannerAPI.Configurations;

public class ReCaptchaSettings
{
    public string SecretKey { get; set; } = string.Empty;
    public string GoogleVerificationUrl { get; set; } = string.Empty;
}