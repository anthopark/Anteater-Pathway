using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiService.CourseSearch.Models;
using ApiService.DataAccess.Repositories;

namespace ApiService.CourseSearch.Applications
{
    public class CourseFinder : ICourseFinder
    {
        private readonly ICourseRepository _courseRepository;

        public CourseFinder(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task<List<List<CompactCourse>>> FindAllCourses()
        {
            var allCourses = await _courseRepository.FindAll();

            return allCourses
                .Select(course => new CompactCourse
                {
                    DepartmentCode = course.DepartmentCode,
                    Number = course.Number,
                    CourseCode = $"{course.DepartmentCode} {course.Number}",
                    Title = course.Title,
                    Unit = course.Unit
                })
                .GroupBy(compactCourse => compactCourse.DepartmentCode)
                .Select(g => g.ToList())
                .OrderBy(list => list[0].DepartmentCode)
                .ToList();
        }
    }

    public interface ICourseFinder
    {
        Task<List<List<CompactCourse>>> FindAllCourses();
    }
}