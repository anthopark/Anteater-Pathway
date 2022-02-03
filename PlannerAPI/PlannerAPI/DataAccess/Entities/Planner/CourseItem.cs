namespace PlannerAPI.DataAccess.Entities;

public class CourseItem
{
    [Field("courseId")] public string CourseId { get; set; } = string.Empty;
    [Field("departmentCode")] public string DepartmentCode { get; set; } = string.Empty;
    [Field("number")] public string Number { get; set; } = string.Empty;
    [Field("unit")] public string Unit { get; set; } = string.Empty;
    [Field("title")] public string Title { get; set; } = string.Empty;
    [Field("isCustomCreated")] public bool IsCustomCreated { get; set; } = false;
    [Field("isCustomUnit")] public bool IsCustomUnit { get; set; } = false;
    [Field("customMinUnit")] public string? CustomMinUnit { get; set; } = null;
    [Field("customMaxUnit")] public string? CustomMaxUnit { get; set; } = null;
    [Field("color")] public string Color { get; set; } = string.Empty;
}