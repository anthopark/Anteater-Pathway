namespace PlannerAPI.DataAccess.Entities;

[Collection("planners")]
public class Planner : Entity, ICreatedOn, IModifiedOn
{
    [Field("uid")] public string UID { get; set; }
    [Field("createdOn")] public DateTime CreatedOn { get; set; }
    [Field("modifiedOn")] public DateTime ModifiedOn { get; set; }
    [Field("tentativeLeft")] public List<CourseItem> TentativeLeft { get; set; }
    [Field("tentativeRight")] public List<CourseItem> TentativeRight { get; set; }
    [Field("mainPlanner")] public List<AcademicYear> MainPlanner { get; set; }
}