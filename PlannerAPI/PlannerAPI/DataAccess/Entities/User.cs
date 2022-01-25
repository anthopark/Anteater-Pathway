namespace PlannerAPI.DataAccess.Entities;

[Collection("users")]
public class User: Entity
{
    // Unique ID provided by Google Auth. Not an Email
    [Field("uid")]
    public string UID { get; set; }
}