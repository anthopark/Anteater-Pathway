namespace PlannerAPI.DataAccess.Entities;

public class AcademicYear
{
    [Field("year")]
    public int Year { get; set; }
    [Field("quarters")]
    public List<Quarter> Quarters { get; set; } = new();
}