using PlannerAPI.DataAccess.Models;

namespace PlannerAPI.Features.Courses.RetrieveAll
{
    public class CourseViewModel
    {
        public string DepartmentCode { get; set; }
        
        public string Number { get; set; }
        
        public string CourseCode { get; set; }
        
        public string Title { get; set; }
        
        public string Unit { get; set; }
    }
}