using System.Linq;
using MongoDB.Entities;
using PlannerAPI.DataAccess;
using PlannerAPI.DataAccess.Models;
using PlannerAPI.Services;

namespace PlannerAPI.Features.Courses.RetrieveAll
{
    public class Endpoint : EndpointWithoutRequest<Response>
    {
        public ICourseRetriever CourseRetriever { get; set; }

        public override void Configure()
        {
            Verbs(Http.GET);
            Routes("/api/course/all");
            AllowAnonymous();
        }

        public override async Task HandleAsync(EmptyRequest req, CancellationToken ct)
        {
            var courses = await CourseRetriever.RetrieveAllGroupedByDepartment();

            var result = MapToViewModel(courses);

            if (result.Count == 0)
            {
                await SendNotFoundAsync();
            }
            else
            {
                var response = new Response
                {
                    DepartmentCount = result.Count,
                    Courses = result
                };

                await SendAsync(response, statusCode: 200, cancellation: ct);
            }
        }

        private static List<List<CourseViewModel>> MapToViewModel(List<List<Course>> allCourses)
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
}