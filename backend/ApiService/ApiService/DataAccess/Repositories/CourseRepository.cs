using System.Collections.Generic;
using System.Threading.Tasks;
using ApiService.Models;
using MongoDB.Driver;

namespace ApiService.DataAccess.Repositories
{
    public class CourseRepository : MongoDbDataAccessBase<Course>, ICourseRepository
    {
        public CourseRepository(IMongoDbContext dbContext) : base("courses", dbContext) {}

        public async Task<Course> GetCourse(string departmentCode, string number)
        {
            var departmentCodeFilter = Builders<Course>.Filter.Eq(item => item.DepartmentCode, departmentCode);
            var numberFilter = Builders<Course>.Filter.Eq(item => item.Number, number);

            var filter = Builders<Course>.Filter.And(departmentCodeFilter, numberFilter);

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
        Task<Course> GetCourse(string departmentCode, string number);
        Task<List<Course>> GetAllCompactCourses();
    }
}