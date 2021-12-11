using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;

namespace PlannerAPI.DataAccess.Models
{
    [BsonIgnoreExtraElements]
    [Collection("courses")]
    public class Course : Entity
    {
        [Field("dept")] public string Department { get; set; } = string.Empty;

        [Field("deptCode")] public string DepartmentCode { get; set; } = string.Empty;

        [Field("num")] public string Number { get; set; } = string.Empty;

        [Field("title")] public string Title { get; set; } = string.Empty;

        [Field("unit")] public string Unit { get; set; } = string.Empty;

        [Field("desc")] public string Description { get; set; } = string.Empty;

        [Field("ge")] public string GeCategory { get; set; } = string.Empty;

        [Field("restriction")] public string Restriction { get; set; } = string.Empty;

        [Field("sameAs")] public string SameAs { get; set; } = string.Empty;

        [Field("overlapsWith")] public string OverlapsWith { get; set; } = string.Empty;

        [Field("concurrentWith")] public string ConcurrentWith { get; set; } = string.Empty;

        [Field("gradingOption")] public string GradingOption { get; set; } = string.Empty;

        [Field("repeatability")] public string Repeatability { get; set; } = string.Empty;

        [Field("corequisite")] public string Corequisite { get; set; } = string.Empty;

        [Field("preOrCorequisite")] public string PreOrCorequisite { get; set; } = string.Empty;

        [Field("offeredTerms")] public List<string> OfferedTerms { get; set; } = new();
    }
}