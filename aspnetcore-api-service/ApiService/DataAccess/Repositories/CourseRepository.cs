using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<List<List<CompactCourse>>> GetAllGroupedCompactCourses()
        {
            var projection = Builders<Course>.Projection.Expression(item =>
                new CompactCourse
                {
                    Department = item.Department,
                    DepartmentCode = item.DepartmentCode,
                    Number = item.Number,
                    CourseCode = $"{item.DepartmentCode} {item.Number}",
                    Title = item.Title,
                    Unit = item.Unit
                });


            var compactCourses = await Collection.Aggregate().Project(projection).ToListAsync();

            var result = compactCourses
                .GroupBy(item => item.DepartmentCode)
                .Select(group => group.ToList())
                .ToList();

            return result;
        }
    }

    public interface ICourseRepository : IMongoDbDataAcessBase<Course>
    {
        Task<Course> GetCourse(string departmentCode, string number);
        Task<List<List<CompactCourse>>> GetAllGroupedCompactCourses();
    }
}