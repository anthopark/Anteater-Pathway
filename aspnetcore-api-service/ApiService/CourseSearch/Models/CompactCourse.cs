using MongoDB.Bson.Serialization.Attributes;

namespace ApiService.CourseSearch.Models
{
    [BsonIgnoreExtraElements]
    public class CompactCourse
    {
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