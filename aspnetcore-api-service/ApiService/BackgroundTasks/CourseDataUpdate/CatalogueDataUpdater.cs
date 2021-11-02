using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApiService.CourseSearch.Models;
using ApiService.DataAccess.Repositories;
using ApiService.Models;
using CsvHelper;
using Microsoft.Extensions.Logging;

namespace ApiService.BackgroundTasks.CourseDataUpdate
{
   public class CatalogeDataUpdater : CourseDataUpdater
    {
        private readonly ILogger<CatalogeDataUpdater> _logger;
        
        private long _updateCount = 0;
        private long _insertCount = 0;
        private long _recordCount = 0;

        public int CsvFileCount => CsvFiles.Length;

        public long InsertCount => _insertCount;
        public long UpdateCount => _updateCount;

        public CatalogeDataUpdater(
            ILogger<CatalogeDataUpdater> logger,
            ICourseRepository courseRepository, 
            string courseDataDirectoryPath) : base (courseRepository, courseDataDirectoryPath)
        {
            _logger = logger;
        }

        public override async Task Update()
        {
            ResetStatistics();
            _logger.LogInformation("Start processing {CsvFileCount} files...", CsvFileCount);

            foreach (var csvFile in CsvFiles)
            {
                _logger.LogInformation("processing {CsvFile}", csvFile);
                foreach (var catalogueCsvRecord in GetRecordsFromCsvFile(csvFile))
                {
                    var courseDocument =
                        await _courseRepository.GetCourse(catalogueCsvRecord.DepartmentCode, catalogueCsvRecord.Number);

                    if (courseDocument is null)
                    {
                        InsertNewCourseDocument(catalogueCsvRecord);
                        _insertCount++;
                    }
                    else
                    {
                        UpdateCourseDocument(courseDocument, catalogueCsvRecord);
                        _updateCount++;
                    }

                    _recordCount++;
                }
            }
            
            _logger.LogInformation("Finished process {CsvFileCount} files", CsvFileCount);
        }

        private IEnumerable<CatalogueCsvRecord> GetRecordsFromCsvFile(string csvFile)
        {
            using (var reader = new StreamReader(csvFile))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                return csv.GetRecords<CatalogueCsvRecord>().ToList();
            }
        }

        private void ResetStatistics()
        {
            _updateCount = 0;
            _insertCount = 0;
            _recordCount = 0;
        }

        private void InsertNewCourseDocument(CatalogueCsvRecord record)
        {
            _courseRepository.Add(new Course()
            {
                Department = record.Department,
                DepartmentCode = record.DepartmentCode,
                Number = record.Number,
                Title = String.IsNullOrEmpty(record.Title) ? null : record.Title,
                Unit = String.IsNullOrEmpty(record.Unit) ? null : record.Unit,
                Description = String.IsNullOrEmpty(record.Description) ? null : record.Description,
                GeCategory = String.IsNullOrEmpty(record.GeCategory) ? null : record.GeCategory,
                Restriction = String.IsNullOrEmpty(record.Restriction) ? null : record.Restriction,
                SameAs = String.IsNullOrEmpty(record.SameAs) ? null : record.SameAs,
                OverlapsWith = String.IsNullOrEmpty(record.OverlapsWith) ? null : record.OverlapsWith,
                ConcurrentWith = String.IsNullOrEmpty(record.ConcurrentWith) ? null : record.ConcurrentWith,
                GradingOption = String.IsNullOrEmpty(record.GradingOption) ? null : record.GradingOption,
                Repeatability = String.IsNullOrEmpty(record.Description) ? null : record.Description,
                Corequisite = String.IsNullOrEmpty(record.Corequisite) ? null : record.Corequisite,
                PreOrCorequisite = String.IsNullOrEmpty(record.PreOrCorequisite) ? null : record.PreOrCorequisite
            });
        }

        private void UpdateCourseDocument(Course course, CatalogueCsvRecord record)
        {
            course.Title = String.IsNullOrEmpty(record.Title) ? null : record.Title;
            course.Unit = String.IsNullOrEmpty(record.Unit) ? null : record.Unit;
            course.Description = String.IsNullOrEmpty(record.Description) ? null : record.Description;
            course.GeCategory = String.IsNullOrEmpty(record.GeCategory) ? null : record.GeCategory;
            course.Restriction = String.IsNullOrEmpty(record.Restriction) ? null : record.Restriction;
            course.SameAs = String.IsNullOrEmpty(record.SameAs) ? null : record.SameAs;
            course.OverlapsWith = String.IsNullOrEmpty(record.OverlapsWith) ? null : record.OverlapsWith;
            course.ConcurrentWith = String.IsNullOrEmpty(record.ConcurrentWith) ? null : record.ConcurrentWith;
            course.GradingOption = String.IsNullOrEmpty(record.GradingOption) ? null : record.GradingOption;
            course.Repeatability = String.IsNullOrEmpty(record.Description) ? null : record.Description;
            course.Corequisite = String.IsNullOrEmpty(record.Corequisite) ? null : record.Corequisite;
            course.PreOrCorequisite = String.IsNullOrEmpty(record.PreOrCorequisite) ? null : record.PreOrCorequisite;

            _courseRepository.Update(course);
        }

        public string ReportStatistics()
        {
            return $"Course Upload Report: {DateTime.UtcNow.ToString("MM-dd-yyyy")}\n" +
                   $"CSV File Counts: {CsvFileCount}\n" +
                   $"Total Records: {_recordCount}\n" +
                   $"Updated: {_updateCount}; Newly inserted: {_insertCount}";
        }
    }
}