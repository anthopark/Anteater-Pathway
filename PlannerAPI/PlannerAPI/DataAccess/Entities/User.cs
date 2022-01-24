namespace PlannerAPI.DataAccess.Entities;

[Collection("users")]
public class User: Entity
{
    // Unique ID provided by Google Auth. Not an Email 
    public string UID { get; set; }
}