using System;
using AnteaterPathwayAPI.Controllers;
using AnteaterPathwayAPI.DataAccess.Repositories;
using AnteaterPathwayAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace AnteaterPathwayAPI.IntegrationTests
{
    public class CourseControllerTests : IntegrationTestsBase
    {
        private ICourseRepository _courseRepository;
        private readonly CourseController _sut;
        
        public CourseControllerTests() : base()
        {
            _courseRepository = new CourseRepository(DbContext);
            _sut = new CourseController(_courseRepository);
        }

        private void AddTestCourseItemsToDb(int amount = 1)
        {
            var courseCollection = _courseRepository.Collection;

            for (int i = 0; i < amount; i++)
            {
                var course = new Course()
                {
                    Department = "COMPSCI",
                    Number = $"{i + 1}",
                    Title = $"Intro to CompSci {i+1}" 
                };
                
                courseCollection.InsertOne(course);
            }
        }
        
        #region GetAllCourse() Test Scenarios
        
        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "GetAllCourses() Returns a list of three of courses when collection contains 3 courses")]
        public async void ReturnsCorrectNumberOfCourses_WhenCollectionIsNotEmpty()
        {
            AddTestCourseItemsToDb(3);
            
            var result = await _sut.GetAllCourses();
            
            Assert.Equal(3, result.Value.Count);
        }

        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "GetAllCourses() Returns 404 when collection is Empty")]
        public async void Returns404_WhenCollectionIsEmpty()
        {
            AddTestCourseItemsToDb(0);

            var result = await _sut.GetAllCourses();
            
            Assert.True(result.Result is NotFoundResult);
        }
        
        #endregion
    }
}