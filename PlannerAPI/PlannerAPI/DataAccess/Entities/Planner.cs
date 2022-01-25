namespace PlannerAPI.DataAccess.Entities;

[Collection("planners")]
public class Planner : Entity
{
    [Field("uid")]
    public string UID { get; set; }
}