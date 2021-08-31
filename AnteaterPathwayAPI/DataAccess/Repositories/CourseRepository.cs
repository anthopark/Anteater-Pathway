using System.Collections.Generic;
using System.Threading.Tasks;
using AnteaterPathwayAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AnteaterPathwayAPI.DataAccess.Repositories
{
    public class CourseRepository : MongoDbDataAccessBase<Course>, ICourseRepository
    {
        public CourseRepository(IMongoDbContext dbContext) : base("courses", dbContext) {}

        public async Task<Course> GetCourse(string department, string number)
        {
            var departmentFilter = Builders<Course>.Filter.Eq(item => item.Department, department);
            var numberFilter = Builders<Course>.Filter.Eq(item => item.Number, number);

            var filter = Builders<Course>.Filter.And(departmentFilter, numberFilter);

            var course = await Collection.Find(filter).FirstOrDefaultAsync();

            return course;
        }

        public async Task<List<Course>> GetAllCompactCourses()
        {
            var fieldsBuilder = Builders<Course>.Projection;
            var fields = fieldsBuilder
                .Exclude(item => item.Id)
                .Exclude(item => item.Description)
                .Exclude(item => item.Unit)
                .Exclude(item => item.GeCategory)
                .Exclude(item => item.Restriction)
                .Exclude(item => item.OverlapsWith)
                .Exclude(item => item.ConcurrentWith)
                .Exclude(item => item.GradingOption)
                .Exclude(item => item.Repeatability)
                .Exclude(item => item.Corequisite)
                .Exclude(item => item.PreOrCorequisite);

            return await Collection.Find(_ => true).Project<Course>(fields).ToListAsync();
        }
    }

    public interface ICourseRepository : IMongoDbDataAcessBase<Course>
    {
        Task<Course> GetCourse(string department, string number);
        Task<List<Course>> GetAllCompactCourses();
    }
}