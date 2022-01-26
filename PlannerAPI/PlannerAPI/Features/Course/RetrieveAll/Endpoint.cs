using Microsoft.AspNetCore.Mvc;
using PlannerAPI.DataAccess.Entities;
using PlannerAPI.Services;

namespace PlannerAPI.Features.Course.RetrieveAll;

public class Endpoint : EndpointWithoutRequest<Response>
{
    public ICourseRetriever CourseRetriever { get; set; }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/course/all");
        AllowAnonymous();
        ResponseCache(3600, ResponseCacheLocation.Any, false);
        Describe(builder => builder
            .Produces<Response>(200, "application/json")
            .ProducesProblem(404)
            .ProducesProblem(500));
    }

    public override async Task HandleAsync(EmptyRequest req, CancellationToken ct)
    {
        var courses = await CourseRetriever.RetrieveAllGroupedByDepartment();

        if (courses.Count == 0)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        var result = MapToViewModel(courses);

        var response = new Response
        {
            DepartmentCount = result.Count,
            Courses = result
        };

        await SendAsync(response, 200, cancellation: ct);
    }

    private static List<List<CourseViewModel>> MapToViewModel(List<List<DataAccess.Entities.Course>> allCourses)
    {
        return allCourses.Select(courses => courses.Select(course => new CourseViewModel
                {
                    DepartmentCode = course.DepartmentCode,
                    Number = course.Number,
                    CourseCode = $"{course.DepartmentCode} {course.Number}",
                    Title = course.Title,
                    Unit = course.Unit
                })
                .ToList())
            .ToList();
    }
}