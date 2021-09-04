using AnteaterPathwayAPI.BackgroundTasks.CourseDownload;
using AnteaterPathwayAPI.BackgroundTasks.CourseUpload;
using AnteaterPathwayAPI.DataAccess.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using Moq;
using Xunit;
using Xunit.Abstractions;

namespace AnteaterPathwayAPI.IntegrationTests
{
    public class CourseUploaderTests : IntegrationTestsBase
    {
        private const string _dataDirectoryPath = "../../../../AnteaterPathwayAPI/CourseDataScripts/course-data/";
        private const string _downloadScriptPath = "../../../../AnteaterPathwayAPI/CourseDataScripts/";
        
        private readonly ITestOutputHelper _output;
        private readonly CourseUploader _sut;
        private readonly CourseDownloader _sut2;


        public CourseUploaderTests(ITestOutputHelper output) : base()
        {

            var serviceProvider = new ServiceCollection()
                .AddLogging()
                .BuildServiceProvider();
            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<CourseUploader>();
            
            
            var mockCourseUploaderLogger = new Mock<ILogger<CourseUploader>>();
            var mockCourseDownloaderLogger = new Mock<ILogger<CourseDownloader>>();
            
            _sut = new CourseUploader(_courseRepository, mockCourseUploaderLogger.Object,_dataDirectoryPath);
            _sut2 = new CourseDownloader(mockCourseDownloaderLogger.Object, _downloadScriptPath);
            _output = output;
        }
        

        [Fact(DisplayName = "Upload() Inserts all new course items from csv files when DB is empty")]
        public async void InsertsAllNewCourse_WhenDbIsEmpty()
        {
            await _sut.Upload();
            _output.WriteLine(_sut.ReportStatistics());
            Assert.Equal(await _courseRepository.Collection.CountDocumentsAsync(new BsonDocument()), _sut.InsertCount);
        }

        [Fact(DisplayName = "Upload() should update the correct number of course items when DB has pre-existing course items")]
        public async void UpdatesCorrectNumberOfCourse_WhenCourseAlreadyExistsInDb()
        {
            await AddSingleCourseItemToMongoDb("COMPSCI", "122A");
            await AddSingleCourseItemToMongoDb("COMPSCI", "122B");
            await AddSingleCourseItemToMongoDb("COMPSCI", "122C");
            
            await _sut.Upload();
            _output.WriteLine(_sut.ReportStatistics());
            Assert.Equal(3, _sut.UpdateCount);
        }

        [Fact]
        public async void Test()
        {
            await _sut2.Download();
        }
    }
}