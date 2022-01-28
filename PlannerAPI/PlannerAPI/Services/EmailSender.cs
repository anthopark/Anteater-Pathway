using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using PlannerAPI.Configurations;

namespace PlannerAPI.Services;

public class EmailSender : IEmailSender
{
    private readonly EmailSettings _emailSettings;
    
    public EmailSender(IConfiguration config)
    {
        _emailSettings = new EmailSettings();
        config.GetSection("EmailSettings").Bind(_emailSettings);
    }


    public async Task SendContactUsEmailAsync(string senderEmail, string contactType, string content)
    {
        var message = new MimeMessage();
        message.Sender = MailboxAddress.Parse(_emailSettings.FromEmail);
        message.To.Add(MailboxAddress.Parse(_emailSettings.ToEmail));
        message.Subject = $"[Anteater Pathway] {contactType}";

        message.Body = new TextPart("plain")
        {
            Text = $"{content}\n\nUser Email: {senderEmail}"
        };

        using var smtp = new SmtpClient();
        smtp.Connect(_emailSettings.Host, _emailSettings.Port, SecureSocketOptions.StartTls);
        smtp.Authenticate(_emailSettings.FromEmail, _emailSettings.Password);
        await smtp.SendAsync(message);
        smtp.Disconnect(true);
    }
}

public interface IEmailSender
{
    Task SendContactUsEmailAsync(string senderEmail, string contactType, string content);
}