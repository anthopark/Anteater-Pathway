using AnteaterPathwayAPI.Applications;
using AnteaterPathwayAPI.DataAccess.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;
using Xunit;
using Xunit.Abstractions;

namespace AnteaterPathwayAPI.IntegrationTests
{
    public class CourseUploaderTests : IntegrationTestsBase
    {
        private readonly ITestOutputHelper _output;
        private readonly CourseUploader _sut;

        public CourseUploaderTests(ITestOutputHelper output) : base()
        {
            _sut = new CourseUploader(_courseRepository);
            _output = output;
        }
        

        [Fact(DisplayName = "Upload() Inserts all new course items from csv files when DB is empty")]
        public async void InsertsAllNewCourse_WhenDbIsEmpty()
        {
            await _sut.Upload();
            _output.WriteLine(_sut.ReportStatistics());
            Assert.Equal(await _courseRepository.Collection.CountDocumentsAsync(new BsonDocument()), _sut.InsertedCount);
        }

        [Fact(DisplayName = "Upload() should update the correct number of course items when DB has pre-existing course items")]
        public async void UpdatesCorrectNumberOfCourse_WhenCourseAlreadyExistsInDb()
        {
            AddSingleCourseItemToMongoDb("COMPSCI", "122A");
            AddSingleCourseItemToMongoDb("COMPSCI", "122B");
            AddSingleCourseItemToMongoDb("COMPSCI", "122C");
            
            await _sut.Upload();
            _output.WriteLine(_sut.ReportStatistics());
            Assert.Equal(3, _sut.UpdateCount);
        }
    }
}