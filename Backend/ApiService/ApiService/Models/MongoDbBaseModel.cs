using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiService.Models
{
    public class MongoDbBaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
