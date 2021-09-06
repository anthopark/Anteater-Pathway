using System;
using System.IO;
using System.Threading.Tasks;
using CliWrap;
using CliWrap.Buffered;

namespace AnteaterPathwayAPI.BackgroundTasks.CourseDataDownload
{
    public class CourseDataDownloader
    {
        private readonly string _scriptName;
        private readonly string _scriptDirectory;
        private readonly string _outputDirectoryName;

        public CourseDataDownloader(
            string scriptName,
            string scriptDirectory,
            string outputDirectoryName)
        {
            _scriptName = scriptName;
            _scriptDirectory = scriptDirectory;

            if (!File.Exists(Path.Join(_scriptDirectory, _scriptName)))
            {
                throw new FileNotFoundException($"Couldn't find {Path.Join(_scriptDirectory, _scriptName)}");
            }
            
            _outputDirectoryName = outputDirectoryName;
        }

        public async Task Download()
        {
            var result = await ExecuteCommand();
        }
        

        private async Task<BufferedCommandResult> ExecuteCommand()
        {
            var result = await Cli.Wrap("python3")
                .WithArguments($"{_scriptName} {_outputDirectoryName}")
                .WithWorkingDirectory(_scriptDirectory)
                // .WithValidation(CommandResultValidation.None)
                .ExecuteBufferedAsync();

            return result;
        }
    }
}