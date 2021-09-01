using AnteaterPathwayAPI.Applications;
using AnteaterPathwayAPI.DataAccess.Repositories;
using Xunit;
using Xunit.Abstractions;

namespace AnteaterPathwayAPI.IntegrationTests
{
    public class CourseUploaderTests : IntegrationTestsBase
    {
        private ICourseRepository _courseRepository;
        private readonly ITestOutputHelper _output;
        private readonly CourseUploader _sut;

        public CourseUploaderTests(ITestOutputHelper output) : base()
        {
            _courseRepository = new CourseRepository(DbContext);
            _sut = new CourseUploader(_courseRepository);
            _output = output;
        }

        [Fact]
        public async void test()
        {
            await _sut.Upload();
            _output.WriteLine(_sut.ReportUpload());
        }
    }
}