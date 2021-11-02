using ApiService.CourseSearch.Applications;
using ApiService.CourseSearch.Controllers;
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
            var courseFinder = new CourseFinder(_courseRepository);
            _sut = new CourseController(courseFinder);
        }


        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "GetAllCourses() returns a list of three of courses when collection contains 3 courses")]
        public async void ReturnsCorrectNumberOfCourses_WhenCollectionIsNotEmpty()
        {
            await AddTestCourseItemsToMongoDb(3);

            var result = await _sut.GetCompactCourses();

            Assert.Equal(3, result.Value[0].Count);
        }

        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "GetAllCourses() returns 404 when collection is empty")]
        public async void Returns404_WhenCollectionIsEmpty()
        {
            await AddTestCourseItemsToMongoDb(0);

            var result = await _sut.GetCompactCourses();

            Assert.True(result.Result is NotFoundResult);
        }
    }
}