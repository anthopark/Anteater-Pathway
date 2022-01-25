using PlannerAPI.DataAccess.Entities;

namespace PlannerAPI.DataAccess;

public class PlannerRepository : DataAccessBase<Planner>, IPlannerRepository
{
    public async Task CreatePlanner(string uid)
    {
        if (await FindPlanner(uid) != null)
        {
            throw new Exception("Planner already exists.");
        }
        
        var newPlanner = new Planner()
        {
            UID = uid
        };
        await Add(newPlanner);
    }

    public async Task<Planner?> FindPlanner(string uid)
    {
        var result = await DB.Find<Planner>()
            .Match(planner => planner.UID == uid)
            .ExecuteSingleAsync();

        return result;
    }
}


public interface IPlannerRepository
{
    public Task CreatePlanner(string uid);
    public Task<Planner?> FindPlanner(string uid);
}