namespace PlannerAPI.Features.Course.RetrieveAll;

public class Response
{
    public int DepartmentCount { get; set; }
    public List<List<CourseViewModel>>? Courses { get; set; }
}