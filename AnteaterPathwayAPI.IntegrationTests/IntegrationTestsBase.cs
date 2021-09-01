using System;
using AnteaterPathwayAPI.DataAccess;
using Mongo2Go;
using AnteaterPathwayAPI.SystemConfigurations;
using Xunit.Abstractions;

namespace AnteaterPathwayAPI.IntegrationTests
{
    public class IntegrationTestsBase : IDisposable
    {
        private MongoDbRunner _runner;
        protected MongoDbContext DbContext { get; set; }

        public IntegrationTestsBase()
        {
            SetupMongo2Go();
        }
        
        public void Dispose()
        {
            _runner.Dispose();
        }

        protected void SetupMongo2Go()
        {
            _runner = MongoDbRunner.Start();

            var settings = new MongoDbSettings()
            {
                ConnectionString = _runner.ConnectionString,
                DatabaseName = "TestDB"
            };

            DbContext = new MongoDbContext(settings);
        }
    }
}