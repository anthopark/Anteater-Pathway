using PlannerAPI.Services;

namespace PlannerAPI.Features.ContactUs;

public class Endpoint : Endpoint<Request>
{
    public IEmailSender EmailSender { get; set; }
    public IReCaptchaVerifier ReCaptchaVerifier { get; set; }
    
    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/user/contact-us");
        AllowAnonymous();
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var isRequestValid = await ReCaptchaVerifier.IsTokenValid(req.ReToken);

        if (!isRequestValid)
        {
            await SendUnauthorizedAsync(ct);
            return;
        }
        
        try
        {
            await EmailSender.SendContactUsEmailAsync(req.SenderEmail, req.Content);
        }
        catch (Exception e)
        {
            await SendErrorsAsync(ct);
            return;
        }
        
        await SendOkAsync(ct);
    }
}