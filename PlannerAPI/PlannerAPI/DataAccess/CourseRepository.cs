using MongoDB.Entities;
using PlannerAPI.DataAccess.Models;

namespace PlannerAPI.DataAccess
{
    public class CourseRepository : DataAccessBase<Course>, ICourseRepository
    {
        public CourseRepository() : base()
        {
        }

        public async Task<Course?> FindByCourseCode(string departmentCode, string number)
        {
            var result = await DB.Find<Course>()
                .Match(course => course.DepartmentCode == departmentCode && course.Number == number)
                .ExecuteSingleAsync();

            return result;
        }
    }

    public interface ICourseRepository : IDataAccessBase<Course>
    {
        public Task<Course?> FindByCourseCode(string departmentCode, string number);
    }
}
