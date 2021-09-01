using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AnteaterPathwayAPI.DataAccess.Repositories;
using AnteaterPathwayAPI.Models;
using CsvHelper;

namespace AnteaterPathwayAPI.Applications
{
    public class CourseUploader
    {
        private readonly ICourseRepository _courseRepository;

        private long _updateCount = 0;
        private long _insertCount = 0;
        private long _recordCount = 0;

        public string[] CsvFiles
        {
            get
            {
                var csvDirectoryPath = $"{Directory.GetCurrentDirectory()}/CourseDataScripts/course-data/";

                if (!Directory.Exists(csvDirectoryPath))
                {
                    throw new DirectoryNotFoundException($"Couldn't find {csvDirectoryPath}");
                }

                var csvFiles = Directory.GetFiles(csvDirectoryPath);

                if (csvFiles.Length == 0)
                {
                    throw new FileNotFoundException($"No files has been found in {csvDirectoryPath}");
                }

                foreach (var csvFile in csvFiles)
                {
                    if (!csvFile.EndsWith(".csv"))
                    {
                        throw new Exception($"Invalid CSV file format: {csvFile}");
                    }
                }

                return csvFiles;
            }
        }

        public long InsertedCount => _insertCount;
        public long UpdateCount => _updateCount;

        public CourseUploader(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task Upload()
        {
            ResetStatistics();

            foreach (var csvFile in CsvFiles)
            {
                foreach (var courseCsvRecord in GetRecordsFromCsvFile(csvFile))
                {
                    var courseDocument = await _courseRepository.GetCourse(courseCsvRecord.DepartmentCode, courseCsvRecord.Number);
                    
                    if (courseDocument is null)
                    {
                        // TODO: Insert as a new course document
                        InsertNewCourseDocument(courseCsvRecord);
                        _insertCount++;
                    }
                    else
                    {
                        // TODO: Update the existing course document
                        UpdateCourseDocument(courseDocument, courseCsvRecord);
                        _updateCount++;
                    }
                    _recordCount++;
                }
            }
        }

        private IEnumerable<CourseCsvRecord> GetRecordsFromCsvFile(string csvFile)
        {
            using (var reader = new StreamReader(csvFile))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                return csv.GetRecords<CourseCsvRecord>().ToList();
            }
        }

        private void ResetStatistics()
        {
            _updateCount = 0;
            _insertCount = 0;
            _recordCount = 0;
        }

        private void InsertNewCourseDocument(CourseCsvRecord record)
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

        private void UpdateCourseDocument(Course course, CourseCsvRecord record)
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
            return $"Csv File Counts: {CsvFiles.Length}\n" +
                   $"Total Records: {_recordCount}\n" +
                   $"Updated: {_updateCount}; Newly inserted: {_insertCount}";
        }
    }
}