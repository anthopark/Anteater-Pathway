using PlannerAPI.DataAccess.Entities;

namespace PlannerAPI.Features.Planner.SaveEntirePlanner;

public class Request
{
    public string UID { get; set; }
    public List<CourseItem> TentativeCourseItemsLeft { get; set; }
    public List<CourseItem> TentativeCourseItemsRight { get; set; }
    public List<AcademicYear> MainPlanner { get; set; }
}