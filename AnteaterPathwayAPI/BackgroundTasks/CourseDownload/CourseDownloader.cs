using System;
using System.Threading.Tasks;
using CliWrap;
using CliWrap.Buffered;

namespace AnteaterPathwayAPI.BackgroundTasks.CourseDownload
{
    public class CourseDownloader
    {
        private readonly string _downloadDirectory;

        public CourseDownloader(string downloadDirectory)
        {
            _downloadDirectory = downloadDirectory;
        }

        public async Task Download()
        {
            var result = await ExecuteCommand("python3", $"download_course_data.py {_downloadDirectory}");

            if (result.ExitCode != 0)
            {
                throw new Exception(result.StandardError);
            }
                
        }

        private async Task<BufferedCommandResult> ExecuteCommand(string pathToExe, string args)
        {
            var result = await Cli.Wrap(pathToExe)
                .WithArguments(args)
                .WithWorkingDirectory("./CourseDataScripts")
                .WithValidation(CommandResultValidation.None)
                .ExecuteBufferedAsync();

            return result;
        }
    }
}