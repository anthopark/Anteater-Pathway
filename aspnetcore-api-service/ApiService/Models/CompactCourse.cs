using MongoDB.Bson.Serialization.Attributes;

namespace ApiService.Models
{
    [BsonIgnoreExtraElements]
    public class CompactCourse
    {
        [BsonRequired][BsonElement("dept")]
        public string Department { get; set; }
        
        [BsonRequired][BsonElement("deptCode")]
        public string DepartmentCode { get; set; }
        
        [BsonRequired][BsonElement("num")]
        public string Number { get; set; }
        
        [BsonRequired][BsonElement("courseCode")]
        public string CourseCode { get; set; }
        
        [BsonRequired][BsonElement("title")]
        public string Title { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("unit")]
        public string Unit { get; set; }
    }
}