using PlannerAPI.DataAccess.Entities;
using PlannerAPI.Services;

namespace PlannerAPI.Features.Courses.RetrieveOne;

public class Endpoint : Endpoint<Request, Course>
{
    public ICourseRetriever CourseRetriever { get; set; }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/course/{DepartmentCode}/{Number}");
        AllowAnonymous();
        Describe(builder => builder
            .Produces<Course>(200, "application/json")
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
        
        await SendAsync(result, statusCode: 200, cancellation: ct);
    }
}