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
                    Title = $"Intro to CompSci {i+1}",
                    Unit = "4",
                    Description = "This course is part of CS introductory series."
                };
                
                courseCollection.InsertOne(course);
            }
        }
        
        #region GetAllCourse() Test Scenarios
        
        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "GetAllCourses() returns a list of three of courses when collection contains 3 courses")]
        public async void ReturnsCorrectNumberOfCourses_WhenCollectionIsNotEmpty()
        {
            AddTestCourseItemsToDb(3);
            
            var result = await _sut.GetAllCourses();
            
            Assert.Equal(3, result.Value.Count);
        }

        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "GetAllCourses() returns 404 when collection is empty")]
        public async void Returns404_WhenCollectionIsEmpty()
        {
            AddTestCourseItemsToDb(0);

            var result = await _sut.GetAllCourses();
            
            Assert.True(result.Result is NotFoundResult);
        }

        [Trait("Category", "Course Search Integration Tests")]
        [Fact(DisplayName = "Courses from GetAllCourse() only contains a certain fields")]
        public async void ReturnedCoursesOnlyContainsCertainFields()
        {
            AddTestCourseItemsToDb(3);

            var result = await _sut.GetAllCourses();
            
            foreach (var course in result.Value)
            {
                Assert.NotNull(course.Department);
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