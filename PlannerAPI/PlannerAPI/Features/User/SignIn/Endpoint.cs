using PlannerAPI.DataAccess;

namespace PlannerAPI.Features.User.SignIn;

public class Endpoint : Endpoint<Request, Response>
{
    public IUserRepository UserRepository { get; set; }
    
    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/user/sign-in");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var result = await UserRepository.FindUserByUID(req.UID);
        var response = new Response();
        
        if (result == null)
        {
            // create new user & new planner
            response.IsNewUser = true;
        }
        else
        {
            response.IsNewUser = false;
        }

        await SendAsync(response, 200, cancellation: ct);
    }
}