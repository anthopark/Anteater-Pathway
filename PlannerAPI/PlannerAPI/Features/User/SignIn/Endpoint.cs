using PlannerAPI.DataAccess;

namespace PlannerAPI.Features.User.SignIn;

public class Endpoint : Endpoint<Request, Response>
{
    public IUserRepository UserRepository { get; set; }
    public IPlannerRepository PlannerRepository { get; set; }
    
    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/user/sign-in");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var result = await UserRepository.FindUser(req.UID);
        var response = new Response();
        
        if (result == null)
        {
            await UserRepository.CreateUser(req.UID);
            await PlannerRepository.CreatePlanner(req.UID);
            
            response.IsNewUser = true;
            
            Logger.LogInformation("New User Signed in: {UID}", req.UID);
        }
        else
        {
            response.IsNewUser = false;
            Logger.LogInformation("Returning User Signed in: {UID}", req.UID);
        }
        
        await SendAsync(response, 200, cancellation: ct);
    }
}