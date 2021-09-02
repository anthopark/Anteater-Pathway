using CsvHelper.Configuration.Attributes;

namespace AnteaterPathwayAPI.BackgroundTasks.CourseUpload
{
    public class CourseCsvRecord
    {
        [Name("department")]
        public string Department { get; set; }
        
        [Name("department code")]
        public string DepartmentCode { get; set; }
        [Name("number")]
        public string Number { get; set; }
        [Name("title")]
        public string Title { get; set; }
        [Name("unit")]
        public string Unit { get; set; }
        [Name("description")]
        public string Description { get; set; }
        [Name("ge")]
        public string GeCategory { get; set; }
        [Name("restriction")]
        public string Restriction { get; set; }
        [Name("same as")]
        public string SameAs { get; set; }
        [Name("overlaps with")]
        public string OverlapsWith { get; set; }
        [Name("concurrent with")]
        public string ConcurrentWith { get; set; }
        [Name("grading option")]
        public string GradingOption { get; set; }
        [Name("repeatability")]
        public string Repeatability { get; set; }
        [Name("corequisite")]
        public string Corequisite { get; set; }
        [Name("prerequisite or corequisite")]
        public string PreOrCorequisite { get; set; }
    }
}