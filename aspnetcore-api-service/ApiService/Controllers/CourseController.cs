using System.Collections.Generic;
using System.Threading.Tasks;
using ApiService.DataAccess.Repositories;
using ApiService.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }
        
        // GET: api/course/all
        [HttpGet("All")]
        public async Task<ActionResult<List<List<CompactCourse>>>> GetCompactCourses()
        {
            var result = await _courseRepository.GetAllGroupedCompactCourses();

            if (result.Count == 0)
            {
                return NotFound();
            }

            return result;
        }
    }
}