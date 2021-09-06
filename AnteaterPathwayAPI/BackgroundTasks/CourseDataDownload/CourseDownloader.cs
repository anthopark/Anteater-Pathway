using System.IO;
using System.Threading.Tasks;
using CliWrap;
using CliWrap.Buffered;
using Microsoft.Extensions.Logging;

namespace AnteaterPathwayAPI.BackgroundTasks.CourseDataDownload
{
    public class CourseDownloader
    {
        private const string _downloadScript = "download_course_data.py";
        private const string _downloadDirectoryName = "course-data";
        private readonly string _downloadScriptPath;

        private readonly ILogger _logger;

        public CourseDownloader(ILogger<CourseDownloader> logger, string downloadScriptPath)
        {
            _logger = logger;
            _downloadScriptPath = downloadScriptPath;

            if (!Directory.Exists(_downloadScriptPath))
            {
                throw new DirectoryNotFoundException($"Couldn't find {_downloadScriptPath}");
            }
        }

        public async Task Download()
        {
            _logger.LogInformation("Start downloading courses...");
            string args = $"{_downloadScript} {_downloadDirectoryName}";
            var result = await ExecuteCommand("python3", args);

            if (result.ExitCode != 0)
            {
                _logger.LogError("python3 {Args} has non-zero exit\n\n{ErrorMessage}", args, result.StandardError);
            }
            _logger.LogInformation("Finished downloading courses");
                
        }

        private async Task<BufferedCommandResult> ExecuteCommand(string pathToExe, string args)
        {
            var result = await Cli.Wrap(pathToExe)
                .WithArguments(args)
                .WithWorkingDirectory(_downloadScriptPath)
                .WithValidation(CommandResultValidation.None)
                .ExecuteBufferedAsync();

            return result;
        }
    }
}