using System;
using MongoDB.Bson.Serialization.Attributes;

namespace AnteaterPathwayAPI.Models
{
    [BsonIgnoreExtraElements]
    public class Course : MongoDbBaseModel
    {
        [BsonRequired][BsonElement("dept")]
        public string Department { get; set; }
        
        [BsonRequired][BsonElement("deptCode")]
        public string DepartmentCode { get; set; }
        
        [BsonRequired][BsonElement("num")]
        public string Number { get; set; }
        
        [BsonRequired][BsonElement("title")]
        public string Title { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("unit")]
        public string Unit { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("desc")]
        public string Description { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("ge")]
        public string GeCategory { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("restriction")]
        public string Restriction { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("sameAs")]
        public string SameAs { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("overlapsWith")]
        public string OverlapsWith { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("concurrentWith")]
        public string ConcurrentWith { get; set; }
        [BsonIgnoreIfNull][BsonElement("gradingOption")]
        public string GradingOption { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("repeatability")]
        public string Repeatability { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("corequisite")]
        public string Corequisite { get; set; }
        
        [BsonIgnoreIfNull][BsonElement("preOrCorequisite")]
        public string PreOrCorequisite { get; set; }
    }
}