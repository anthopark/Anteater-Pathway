using System.Threading.Tasks;
using PlannerAPI.DataAccess;
using PlannerAPI.DataAccess.Models;
using PlannerAPI.IntegrationTests.Utilities;
using PlannerAPI.Services;
using Xunit;

namespace PlannerAPI.IntegrationTests.Services;

[TestCaseOrderer("PlannerAPI.IntegrationTests.Utilities.PriorityOrderer", "PlannerAPI.IntegrationTests")]
public class CourseRetrieverTests : IClassFixture<Mongo2GoFixture>
{
    private static readonly CourseRepository CourseRepository = new();
    private readonly CourseRetriever _sut = new(CourseRepository);

    [Fact, TestPriority(0)]
    public async Task SetUpMongo2GoScenario()
    {
        await AddCourseToMongo2Go("COMPSCI", "122A");
        await AddCourseToMongo2Go("IN4MATX", "43");
        await AddCourseToMongo2Go("STATS", "7");

        Assert.True(true);
    }

    [Fact]
    public async Task ShouldRetrieveAllCoursesGroupedByDepartment()
    {
        var result = await _sut.RetrieveAllGroupedByDepartment();

        Assert.Equal(3, result.Count);
    }

    [Fact]
    public async Task ShouldRetrieveCorrectOneCourse()
    {
        var departmentCode = "STATS";
        var number = "7";

        var result = await _sut.RetrieveOne(departmentCode, number);

        Assert.NotNull(result);
        Assert.Equal(departmentCode, result.DepartmentCode);
        Assert.Equal(number, result.Number);
    }
    
    private async Task AddCourseToMongo2Go(string departmentCode, string number)
    {
        var course = new Course
        {
            DepartmentCode = departmentCode,
            Number = number
        };

        await CourseRepository.Add(course);
    }
}