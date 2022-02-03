using PlannerAPI.DataAccess;
using PlannerAPI.DataAccess.Entities;

namespace PlannerAPI.Services;

public class CourseRetriever : ICourseRetriever
{
    private readonly ICourseRepository _courseRepository;

    public CourseRetriever(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<List<List<Course>>> RetrieveAllGroupedByDepartment()
    {
        var allCourses = await _courseRepository.FindAll();

        var result = allCourses
            .GroupBy(course => course.DepartmentCode)
            .Select(g => g.ToList())
            .OrderBy(list => list[0].DepartmentCode)
            .ToList();

        return result;
    }

    public async Task<Course?> RetrieveOne(string departmentCode, string number)
    {
        return await _courseRepository.FindByCourseCode(departmentCode, number);
    }
}

public interface ICourseRetriever
{
    public Task<List<List<Course>>> RetrieveAllGroupedByDepartment();
    public Task<Course?> RetrieveOne(string departmentCode, string number);
}