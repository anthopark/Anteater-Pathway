namespace PlannerAPI.DataAccess.Entities;

[Collection("users")]
public class User : Entity, ICreatedOn, IModifiedOn
{
    // Unique ID provided by Google Auth. Not an Email
    [Field("uid")] public string UID { get; set; }

    [Field("createdOn")] public DateTime CreatedOn { get; set; }
    [Field("modifiedOn")] public DateTime ModifiedOn { get; set; }
}