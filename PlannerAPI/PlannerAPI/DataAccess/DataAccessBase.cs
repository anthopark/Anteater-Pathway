using MongoDB.Driver;
using MongoDB.Entities;

namespace PlannerAPI.DataAccess
{
    public class DataAccessBase<T> : IDataAccessBase<T> where T : Entity
    {
        public DataAccessBase()
        {
        }
        
        public IMongoCollection<T> Collection => DB.Collection<T>();

        public virtual async Task Add(T record)
        {
            await DB.SaveAsync(record);
        }

        public virtual async Task<bool> Update(T record)
        {
            var result = await DB.Update<T>()
                .Match(item => item.ID == record.ID)
                .ModifyWith(record)
                .ExecuteAsync();

            return result.ModifiedCount == 1;
        }

        public virtual async Task<bool> Delete(string id)
        {
            var result = await DB.DeleteAsync<T>(id);

            return result.DeletedCount == 1;
        }
        
        public virtual async Task<T> Find(string id)
        {
            return await DB.Find<T>().OneAsync(id);
        }

        public virtual async Task<List<T>> FindAll()
        {
            return await DB.Find<T>().ManyAsync(item => true);
        }
    }


    public interface IDataAccessBase<T>
    {
        IMongoCollection<T> Collection { get; }
        Task Add(T record);
        Task<bool> Update(T record);
        Task<T> Find(string id);
        Task<List<T>> FindAll();
        Task<bool> Delete(string id);
    }
}