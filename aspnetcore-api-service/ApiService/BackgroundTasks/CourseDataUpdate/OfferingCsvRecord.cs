using CsvHelper.Configuration.Attributes;

namespace ApiService.BackgroundTasks.CourseDataUpdate
{
    public class OfferingCsvRecord
    {
        [Name("dept")] 
        public string Department { get; set; }

        [Name("num")]
        public string Number { get; set; }
    }
}