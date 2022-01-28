using PlannerAPI.Services;

namespace PlannerAPI.Features.ContactUs;

public class Endpoint : Endpoint<Request>
{
    public IEmailSender EmailSender { get; set; }
    
    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/contact-us");
        AllowAnonymous();
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        await EmailSender.SendContactUsEmailAsync(req.SenderEmail, req.ContactType, req.Content);
        await SendOkAsync(ct);
    }
}