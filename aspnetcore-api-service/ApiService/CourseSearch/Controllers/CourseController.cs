using System.Collections.Generic;
using System.Threading.Tasks;
using ApiService.CourseSearch.Applications;
using ApiService.CourseSearch.Models;
using ApiService.DataAccess.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiService.CourseSearch.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseFinder _courseFinder;

        public CourseController(ICourseFinder courseFinder)
        {
            _courseFinder = courseFinder;
        }
        
        // GET: api/course/all
        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<List<CompactCourse>>>> GetCompactCourses()
        {
            var result = await _courseFinder.FindAllCourses();

            if (result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}