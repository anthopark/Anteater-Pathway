using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AnteaterPathwayAPI.DataAccess.Repositories;
using AnteaterPathwayAPI.Models;
using CsvHelper;
using Microsoft.Extensions.Logging;

namespace AnteaterPathwayAPI.BackgroundTasks.CourseDataUpdate
{
    public class OfferingDataUpdater : CourseDataUpdater
    {
        private readonly ILogger<OfferingDataUpdater> _logger;

        public int CsvFileCount => CsvFiles.Length;

        public OfferingDataUpdater(
            ILogger<OfferingDataUpdater> logger,
            ICourseRepository courseRepository,
            string offeringDataDirectoryPath) : base(courseRepository, offeringDataDirectoryPath)
        {
            _logger = logger;
        }

        public override async Task Update()
        {
            _logger.LogInformation("Start Processing {CsvFileCount} files", CsvFileCount);

            foreach (var csvFile in CsvFiles)
            {
                _logger.LogInformation("Processing {CsvFile}...", csvFile);
                foreach (var offeringCsvRecord in GetRecordsFromCsvFile(csvFile))
                {
                    var courseDocument =
                        await _courseRepository.GetCourse(offeringCsvRecord.Department, offeringCsvRecord.Number);

                    if (courseDocument is not null)
                    {
                        await UpdateTerms(courseDocument, ExtractTerm(csvFile));
                    }
                }
            }

            _logger.LogInformation("Finished process {CsvFileCount}", CsvFileCount);
        }

        private IEnumerable<OfferingCsvRecord> GetRecordsFromCsvFile(string csvFile)
        {
            using (var reader = new StreamReader(csvFile))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                return csv.GetRecords<OfferingCsvRecord>().ToList();
            }
        }

        private async Task UpdateTerms(Course course, string offeredTerm)
        {
            var offeredTerms = course.OfferedTerms;

            if (!offeredTerms.Contains(offeredTerm))
            {
                offeredTerms.Add(offeredTerm);
            }

            offeredTerms = SortByTerm(offeredTerms);

            course.OfferedTerms = offeredTerms;

            await _courseRepository.Update(course);
        }

        private string ExtractTerm(string csvFile)
        {
            var fileName = Path.GetFileName(csvFile);
            var year = fileName.Split("-")[0];

            string term = "";
            if (fileName.Contains("Fall"))
            {
                term = "fa";
            }
            else if (fileName.Contains("Winter"))
            {
                term = "wi";
            }
            else if (fileName.Contains("Spring"))
            {
                term = "sp";
            }
            else if (fileName.Contains("Summer"))
            {
                term = "su";
            }

            return $"{year}-{term}";
        }

        private List<string> SortByTerm(List<string> terms)
        {
            var result = terms.OrderByDescending(x => x, new TermComparer()).ToList();
            result = result.OrderByDescending(x => x, new YearComparer()).ToList();

            return result;
        }
    }

    internal class TermComparer : IComparer<string>
    {
        private readonly string[] _termOrder = 
        {
            "wi", "sp", "su", "fa"
        };

        public int Compare(string first, string second)
        {
            if (first is null)
            {
                return -1;
            }

            if (second is null)
            {
                return 1;
            }
            
            return Array.IndexOf(_termOrder, first.Split("-")[1])
                .CompareTo(Array.IndexOf(_termOrder, second.Split("-")[1]));
        }
    }

    internal class YearComparer : IComparer<string>
    {
        public int Compare(string first, string second)
        {
            if (first is null)
            {
                return -1;
            }

            if (second is null)
            {
                return 1;
            }

            return Int32.Parse(first.Split("-")[0]).CompareTo(Int32.Parse(second.Split("-")[0]));
        }
    }
}