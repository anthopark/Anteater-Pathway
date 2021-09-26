using ApiService.SystemConfiguration;
using MongoDB.Driver;

namespace ApiService.DataAccess
{
    public class MongoDbContext : IMongoDbContext
    {
        private readonly IMongoDatabase _db;

        public MongoDbContext(IMongoDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            _db = client.GetDatabase(settings.DatabaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _db.GetCollection<T>(name);
        }
    }

    public interface IMongoDbContext
    {
        public IMongoCollection<T> GetCollection<T>(string name);
    }
}