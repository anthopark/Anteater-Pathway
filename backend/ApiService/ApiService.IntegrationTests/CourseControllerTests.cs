using ApiService.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace ApiService.IntegrationTests
{
    [Collection("IntegrationTests")]
    public class CourseControllerTests : IntegrationTestsBase
    {
        private readonly CourseController _sut;
        
        public CourseControllerTests() : base()
        {
            _sut = new CourseController(_courseRepository);
        }

        
        #region GetAllCourse() Test Scenarios
        
        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "GetAllCourses() returns a list of three of courses when collection contains 3 courses")]
        public async void ReturnsCorrectNumberOfCourses_WhenCollectionIsNotEmpty()
        {
            await AddTestCourseItemsToMongoDb(3);
            
            var result = await _sut.GetAllCourses();
            
            Assert.Equal(3, result.Value.Count);
        }

        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "GetAllCourses() returns 404 when collection is empty")]
        public async void Returns404_WhenCollectionIsEmpty()
        {
            await AddTestCourseItemsToMongoDb(0);

            var result = await _sut.GetAllCourses();
            
            Assert.True(result.Result is NotFoundResult);
        }

        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "Courses from GetAllCourse() only contains a certain fields")]
        public async void ReturnedCoursesOnlyContainsCertainFields()
        {
            await AddTestCourseItemsToMongoDb(3);

            var result = await _sut.GetAllCourses();
            
            foreach (var course in result.Value)
            {
                Assert.NotNull(course.DepartmentCode);
                Assert.NotNull(course.Number);
                Assert.NotNull(course.Title);
                
                Assert.Null(course.Description);
                Assert.Null(course.Unit);
                Assert.Null(course.GeCategory);
            }
        }
        
        #endregion
    }
}