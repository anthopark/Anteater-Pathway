using System.Threading.Tasks;
using AnteaterPathwayAPI.BackgroundTasks.CourseDataDownload;
using AnteaterPathwayAPI.BackgroundTasks.CourseDataUpdate;
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
    [Collection("IntegrationTests")]
    public class CourseUpdaterTests : IntegrationTestsBase
    {
        private const string _catalogueDataDirectoryPath = "../../../test-course-catalogue-data/";
        private const string _offeringDataDirectoryPath = "../../../test-course-offering-data/";
        
        // private const string _catalogueDataDirectoryPath = "../../../../AnteaterPathwayAPI/CourseDataScripts/test-course-catalogue-data/";
        // private const string _offeringDataDirectoryPath = "../../../../AnteaterPathwayAPI/CourseDataScripts/course-offering-data/";

        private readonly ITestOutputHelper _output;
        private readonly CatalogeDataUpdater _catalogueDataUpdater;
        private readonly OfferingDataUpdater _offeringDataUpdater;
        

        public CourseUpdaterTests(ITestOutputHelper output) : base()
        {
            var serviceProvider = new ServiceCollection()
                .AddLogging()
                .BuildServiceProvider();
            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<CatalogeDataUpdater>();


            var mockCatalogueUpdaterLogger = new Mock<ILogger<CatalogeDataUpdater>>();
            var mockOfferingUpdaterLogger = new Mock<ILogger<OfferingDataUpdater>>();

            _catalogueDataUpdater = new CatalogeDataUpdater(
                mockCatalogueUpdaterLogger.Object,
                _courseRepository,
                _catalogueDataDirectoryPath
            );

            _offeringDataUpdater = new OfferingDataUpdater(
                mockOfferingUpdaterLogger.Object,
                _courseRepository,
                _offeringDataDirectoryPath
            );

            _output = output;
        }


        [Fact(DisplayName = "CatalogeDataUpdater.Update() Inserts all new course items from csv files when DB is empty")]
        public async Task InsertsAllNewCourse_WhenDbIsEmpty()
        {
            await _catalogueDataUpdater.Update();
            
            _output.WriteLine(_catalogueDataUpdater.ReportStatistics());

            var expectedInsertCount = await _courseRepository.Collection.CountDocumentsAsync(_ => true);
            
            Assert.Equal(1, _catalogueDataUpdater.CsvFileCount);
            Assert.Equal(expectedInsertCount, _catalogueDataUpdater.InsertCount);
        }

        [Fact(DisplayName =
            "CatalogeDataUpdater.Update() should update the correct number of course items when DB has pre-existing course items")]
        public async Task UpdatesCorrectNumberOfCourse_WhenCourseAlreadyExistsInDb()
        {
            await AddSingleCourseItemToMongoDb("COMPSCI", "122A");
            await AddSingleCourseItemToMongoDb("COMPSCI", "122B");
            await AddSingleCourseItemToMongoDb("COMPSCI", "122C");

            await _catalogueDataUpdater.Update();
            
            _output.WriteLine(_catalogueDataUpdater.ReportStatistics());
            
            Assert.Equal(1, _catalogueDataUpdater.CsvFileCount);
            Assert.Equal(3, _catalogueDataUpdater.UpdateCount);
            Assert.Equal(150, _catalogueDataUpdater.InsertCount);
        }

        [Fact(DisplayName = "OfferingDataUpdater.Update() updates offered terms correctly")]
        public async Task UpdatesOfferedTermsCorrectly()
        {
            // Insert 153 COMPSCI courses
            await _catalogueDataUpdater.Update();

            await _offeringDataUpdater.Update();

            var course1 = await _courseRepository.GetCourse("COMPSCI", "122A");
            var course2 = await _courseRepository.GetCourse("COMPSCI", "141");
            var course3 = await _courseRepository.GetCourse("COMPSCI", "145");
            
            _output.WriteLine("COMPSCI 122A Offered Terms:");
            course1.OfferedTerms.ForEach(x => _output.WriteLine($"\t{x}"));
            
            _output.WriteLine("COMPSCI 141 Offered Terms:");
            course2.OfferedTerms.ForEach(x => _output.WriteLine($"\t{x}"));
            
            _output.WriteLine("COMPSCI 145 Offered Terms:");
            course3.OfferedTerms.ForEach(x => _output.WriteLine($"\t{x}"));
            
            var expectedTerms = new string[]
            {
                "2021-fa", "2021-sp", "2021-wi", "2020-fa", "2019-sp", "2019-wi"
            };
            
            Assert.Equal(6, course1.OfferedTerms.Count);
            
            for (int i = 0; i < expectedTerms.Length; i++)
            {
                Assert.Equal(expectedTerms[i], course1.OfferedTerms[i]);    
            }
        }
    }
}