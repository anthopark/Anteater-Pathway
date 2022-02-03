namespace PlannerAPI.Features.ContactUs;

public class Request
{
    public string SenderEmail { get; set; } = String.Empty;
    public string Content { get; set; } = String.Empty;
    public string ReToken { get; set; } = String.Empty;
}