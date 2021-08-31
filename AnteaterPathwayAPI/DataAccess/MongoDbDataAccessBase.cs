using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AnteaterPathwayAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AnteaterPathwayAPI.DataAccess
{
    public class MongoDbDataAccessBase<T> : IMongoDbDataAcessBase<T> where T : MongoDbBaseModel
    {
        private readonly string _collectionName;
        private readonly IMongoDbContext _dbContext;
        
        public MongoDbDataAccessBase(string collectionName, IMongoDbContext dbContext)
        {
            _collectionName = collectionName;
            _dbContext = dbContext;
        }

        public IMongoCollection<T> Collection => _dbContext.GetCollection<T>(_collectionName);
        
        public virtual async Task Add(T record)
        {
            await Collection.InsertOneAsync(record);
        }

        public virtual async Task<bool> Update(T record)
        {
            var filter = Builders<T>.Filter.Eq(item => item.Id, record.Id);

            var result = await Collection.ReplaceOneAsync(filter, record);

            return result.ModifiedCount == 1;
        }

        public async Task<T> Find(string id)
        {
            var filter = Builders<T>.Filter.Eq(item => item.Id, id);
            return await Collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<List<T>> FindAll()
        {
            return await Collection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<bool> Delete(string id)
        {
            var filter = Builders<T>.Filter.Eq(item => item.Id, id);
            var result = await Collection.DeleteOneAsync(filter);
            return result.DeletedCount == 1;
        }
    }

    public interface IMongoDbDataAcessBase<T>
    {
        Task Add(T record);
        Task<bool> Update(T record);
        Task<T> Find(string id);
        Task<List<T>> FindAll();
        Task<bool> Delete(string id);

    }
}