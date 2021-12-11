using Microsoft.Extensions.Logging;
using PlannerAPI.DataAccess.Models;
using PlannerAPI.Services;

namespace PlannerAPI.Features.Courses.RetrieveOne
{
    public class Endpoint : Endpoint<Request, Course>
    {
        public ICourseRetriever CourseRetriever { get; set; }

        public override void Configure()
        {
            Verbs(Http.GET);
            Routes("/api/course/{DepartmentCode}/{Number}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var result = await CourseRetriever.RetrieveOne(req.DepartmentCode.ToUpper(), req.Number.ToUpper());
            
            if (result == null)
            {
                await SendNotFoundAsync();
            }
            else
            {
                await SendAsync(result, statusCode: 200, cancellation: ct);
            }
        }
    }
}