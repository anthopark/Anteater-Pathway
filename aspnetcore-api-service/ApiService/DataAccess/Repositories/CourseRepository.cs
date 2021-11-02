using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiService.CourseSearch.Models;
using ApiService.Models;
using MongoDB.Driver;

namespace ApiService.DataAccess.Repositories
{
    public class CourseRepository : MongoDbDataAccessBase<Course>, ICourseRepository
    {
        public CourseRepository(IMongoDbContext dbContext) : base("courses", dbContext)
        {
        }

        public async Task<Course> GetCourse(string departmentCode, string number)
        {
            var departmentCodeFilter = Builders<Course>.Filter.Eq(item => item.DepartmentCode, departmentCode);
            var numberFilter = Builders<Course>.Filter.Eq(item => item.Number, number);

            var filter = Builders<Course>.Filter.And(departmentCodeFilter, numberFilter);

            var course = await Collection.Find(filter).FirstOrDefaultAsync();

            return course;
        }
        
    }

    public interface ICourseRepository : IMongoDbDataAcessBase<Course>
    {
        Task<Course> GetCourse(string departmentCode, string number);
    }
}