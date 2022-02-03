using PlannerAPI.DataAccess.Entities;

namespace PlannerAPI.Features.Planner.SaveEntire;

public class Request
{
    public string UID { get; set; }
    public List<CourseItem> TentativeLeft { get; set; }
    public List<CourseItem> TentativeRight { get; set; }
    public List<AcademicYear> MainPlanner { get; set; }
}