using PlannerAPI.DataAccess.Entities;

namespace PlannerAPI.DataAccess;

public class UserRepository : DataAccessBase<User>, IUserRepository
{
    public async Task<User?> FindUserByUID(string uid)
    {
        var result = await DB.Find<User>()
            .Match(user => user.UID == uid)
            .ExecuteSingleAsync();

        return result;
    }
}

public interface IUserRepository
{
    public Task<User?> FindUserByUID(string uid);
}