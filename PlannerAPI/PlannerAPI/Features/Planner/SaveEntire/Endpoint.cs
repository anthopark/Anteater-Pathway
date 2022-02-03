using PlannerAPI.DataAccess;
using Serilog;

namespace PlannerAPI.Features.Planner.SaveEntire;

public class Endpoint : Endpoint<Request>
{
    public IPlannerRepository PlannerRepository { get; set; }
    
    public override void Configure()
    {
        Verbs(Http.PATCH);
        Routes("/api/planner/save/entire");
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var planner = await PlannerRepository.FindPlanner(req.UID);
        
        if (planner == null)
        {
            Logger.LogError("Planner not found: {UID}", req.UID);
            await SendNotFoundAsync(ct);
            return;
        }

        planner.TentativeLeft = req.TentativeLeft;
        planner.TentativeRight = req.TentativeRight;
        planner.MainPlanner = req.MainPlanner;

        await planner.SaveAsync(cancellation: ct);
        await SendOkAsync(ct);
    }
}