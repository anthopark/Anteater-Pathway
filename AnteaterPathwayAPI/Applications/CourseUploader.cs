using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AnteaterPathwayAPI.DataAccess.Repositories;
using CsvHelper;

namespace AnteaterPathwayAPI.Applications
{
    public class CourseUploader
    {
        private readonly ICourseRepository _courseRepository;
        private int _updateCount = 0;
        private int _insertNewCount = 0;
        private int _totalRecordCount = 0;
        
        public string[] CsvFiles
        {
            get
            {
                var currentDirectory = Directory.GetCurrentDirectory();
                var csvDirectoryPath = $"{currentDirectory}/CourseDataScripts/course-data/";
                
                if (!Directory.Exists(csvDirectoryPath))
                {
                    throw new DirectoryNotFoundException($"Couldn't find {csvDirectoryPath}");
                }

                return Directory.GetFiles(csvDirectoryPath);
            }
        }
        public CourseUploader(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task Upload()
        {
            _updateCount = 0;
            _insertNewCount = 0;
            _totalRecordCount = 0;
            foreach (var csvFile in CsvFiles)
            {
                foreach (var record in GetRecordsFromCsvFile(csvFile))
                {
                    _totalRecordCount++;
                    var course = await _courseRepository.GetCourse(record.Department, record.Number);
                    if (course is null)
                    {
                        // TODO: Insert as a new course document
                        _insertNewCount++;
                    }
                    else
                    {
                        // TODO: Update the existing course document
                        _updateCount++;
                    }
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

        public string ReportUpload()
        {
            return $"Total Records: {_totalRecordCount}\nUpdated: {_updateCount}, Newly inserted: {_insertNewCount}";
        }
        
    }
}