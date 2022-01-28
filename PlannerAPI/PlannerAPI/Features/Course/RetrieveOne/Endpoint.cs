using PlannerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace PlannerAPI.Features.Course.RetrieveOne;

public class Endpoint : Endpoint<Request, DataAccess.Entities.Course>
{
    public ICourseRetriever CourseRetriever { get; set; }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/course/{DepartmentCode}/{Number}");
        AllowAnonymous();
        ResponseCache(3600, ResponseCacheLocation.Any, false);
        Describe(builder => builder
            .Produces<DataAccess.Entities.Course>(200, "application/json")
            .ProducesProblem(404, "plain/text")
            .ProducesProblem(500));
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var result = await CourseRetriever.RetrieveOne(req.DepartmentCode.ToUpper(), req.Number.ToUpper());

        if (result == null)
        {
            await SendNotFoundAsync(ct);
            return;
        }
        
        await SendAsync(result, 200, cancellation: ct);
    }
}