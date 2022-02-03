using PlannerAPI.DataAccess;

namespace PlannerAPI.Features.Planner.LoadEntire;

public class Endpoint : Endpoint<Request, Response>
{
    public IPlannerRepository PlannerRepository { get; set; }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/planner/load/entire/{UID}");
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

        var response = new Response
        {
            TentativeLeft = planner.TentativeLeft,
            TentativeRight = planner.TentativeRight,
            MainPlanner = planner.MainPlanner
        };

        await SendAsync(response, 200, ct);
    }
}