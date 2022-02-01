using PlannerAPI.DataAccess.Entities;

namespace PlannerAPI.Features.Planner.LoadEntire;

public class Response
{
    public List<CourseItem> TentativeLeft { get; set; }
    public List<CourseItem> TentativeRight { get; set; }
    public List<AcademicYear> MainPlanner { get; set; }
}