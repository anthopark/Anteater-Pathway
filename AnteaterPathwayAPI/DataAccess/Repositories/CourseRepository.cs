using System.Threading.Tasks;
using AnteaterPathwayAPI.Models;
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
    }

    public interface ICourseRepository : IMongoDbDataAcessBase<Course>
    {
        Task<Course> GetCourse(string department, string number);
    }
}