using System;
using System.IO;
using System.Threading.Tasks;
using ApiService.DataAccess.Repositories;

namespace ApiService.BackgroundTasks.CourseDataUpdate
{
    public abstract class CourseDataUpdater
    {
        protected readonly ICourseRepository _courseRepository;
        protected readonly string _dataDirectoryPath;

        public CourseDataUpdater(
            ICourseRepository courseRepository,
            string dataDirectoryPath)
        {
            _courseRepository = courseRepository;
            _dataDirectoryPath = dataDirectoryPath;
        }

        protected string[] CsvFiles
        {
            get
            {
                if (!Directory.Exists(_dataDirectoryPath))
                {
                    throw new DirectoryNotFoundException($"Couldn't find {_dataDirectoryPath}");
                }

                var csvFiles = Directory.GetFiles(_dataDirectoryPath);

                if (csvFiles.Length == 0)
                {
                    throw new FileNotFoundException($"No files has been found in {_dataDirectoryPath}");
                }

                foreach (var csvFile in csvFiles)
                {
                    if (!csvFile.EndsWith(".csv"))
                    {
                        throw new FormatException($"Invalid CSV file format: {csvFile}");
                    }
                }

                return csvFiles;
            }
        }

        public abstract Task Update();
    }
}