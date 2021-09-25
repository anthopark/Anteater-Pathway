using ApiService.BackgroundTasks.CourseDataDownload;
using Xunit;

namespace ApiService.IntegrationTests
{
    public class CourseDownloaderTests
    {
        private readonly CourseDataDownloader _catalogueDownloader;
        private readonly CourseDataDownloader _offeringDownloader;

        private const string _catalogueScriptName = "download_catalogue_data.py";

        private const string _catalogueScriptDirectory =
            "../../../../ApiService/CourseDataScripts/";

        private const string _offeringScriptName = "download_offering_data.py";

        private const string _offeringScriptDirectory =
            "../../../../ApiService/CourseDataScripts/";

        private const string _catalogueOutputDirecotory = "test-course-catalogue-data";
        private const string _offeringOutputDirecotory = "test-course-offering-data";

        public CourseDownloaderTests()
        {
            _catalogueDownloader = new CourseDataDownloader(
                _catalogueScriptName,
                _catalogueScriptDirectory,
                _catalogueOutputDirecotory
            );

            _offeringDownloader = new CourseDataDownloader(
                _offeringScriptName,
                _offeringScriptDirectory,
                _offeringOutputDirecotory
            );
        }

        [Fact]
        public async void TestCalaogueDataDownloader()
        {
            await _catalogueDownloader.Download();
        }

        [Fact]
        public async void TestOfferingDataDownloader()
        {
            await _offeringDownloader.Download();
        }
    }
}