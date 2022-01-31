namespace PlannerAPI.DataAccess.Entities;

public class Quarter
{
    [Field("year")]
    public int Year { get; set; }
    [Field("season")]
    public string Season { get; set; }
    [Field("courseItems")]
    public List<CourseItem> CourseItems { get; set; } = new();
}