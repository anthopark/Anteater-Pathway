namespace PlannerAPI.Features.Courses.RetrieveAll;

public class Response
{
    public int DepartmentCount { get; set; }
    public List<List<CourseViewModel>>? Courses { get; set; }
}