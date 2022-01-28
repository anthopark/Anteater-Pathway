namespace PlannerAPI.Configurations;

public class EmailSettings
{
    public string FromEmail { get; set; } = String.Empty;
    public string ToEmail { get; set; } = String.Empty;
    public string DisplayName { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;
    public string Host { get; set; } = String.Empty;
    public int Port { get; set; } = default;
}