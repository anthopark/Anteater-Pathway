using System;
using Mongo2Go;
using MongoDB.Driver;
using MongoDB.Entities;
using Xunit;

namespace PlannerAPI.IntegrationTests;

public class Mongo2GoFixture : IDisposable
{
    private readonly MongoDbRunner _runner;

    public Mongo2GoFixture()
    {
        _runner = MongoDbRunner.Start();
        DB.InitAsync("TestDB",
            MongoClientSettings.FromConnectionString(_runner.ConnectionString));
    }

    public void Dispose()
    {
        _runner.Dispose();
    }
}