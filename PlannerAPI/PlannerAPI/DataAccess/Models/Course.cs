using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;

namespace PlannerAPI.DataAccess.Models
{
    [BsonIgnoreExtraElements]
    [Collection("courses")]
    public class Course : Entity
    {
        [Field("dept")] public string? Department { get; set; }

        [Field("deptCode")] public string? DepartmentCode { get; set; } = string.Empty;

        [Field("num")] public string? Number { get; set; }

        [Field("title")] public string? Title { get; set; }

        [Field("unit")] public string? Unit { get; set; }

        [Field("desc")] public string? Description { get; set; }

        [Field("ge")] public string? GeCategory { get; set; }

        [Field("restriction")] public string? Restriction { get; set; }

        [Field("sameAs")] public string? SameAs { get; set; }

        [Field("overlapsWith")] public string? OverlapsWith { get; set; }

        [Field("concurrentWith")] public string? ConcurrentWith { get; set; }

        [Field("gradingOption")] public string? GradingOption { get; set; }

        [Field("repeatability")] public string? Repeatability { get; set; }

        [Field("corequisite")] public string? Corequisite { get; set; }

        [Field("preOrCorequisite")] public string? PreOrCorequisite { get; set; }

        [Field("offeredTerms")] public List<string> OfferedTerms { get; set; } = new();
    }
}