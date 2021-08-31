using System;
using MongoDB.Bson.Serialization.Attributes;

namespace AnteaterPathwayAPI.Models
{
    [BsonIgnoreExtraElements]
    public class Course : MongoDbBaseModel
    {
        [BsonElement("dept")]
        public string Department { get; set; }
        [BsonElement("num")]
        public string Number { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("unit")]
        public string Unit { get; set; }
        [BsonElement("desc")]
        public string Description { get; set; }
        [BsonElement("ge")]
        public string GeCategory { get; set; }
        [BsonElement("restriction")]
        public string Restriction { get; set; }
        [BsonElement("sameAs")]
        public string SameAs { get; set; }
        [BsonElement("overlapsWith")]
        public string OverlapsWith { get; set; }
        [BsonElement("concurrentWith")]
        public string ConcurrentWith { get; set; }
        [BsonElement("gradingOption")]
        public string GradingOption { get; set; }
        [BsonElement("repeatability")]
        public string Repeatability { get; set; }
        [BsonElement("corequisite")]
        public string Corequisite { get; set; }
        [BsonElement("preOrCorequisite")]
        public string PreOrCorequisite { get; set; }
    }
}