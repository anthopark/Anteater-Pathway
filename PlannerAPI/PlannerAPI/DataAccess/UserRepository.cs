using PlannerAPI.DataAccess.Entities;

namespace PlannerAPI.DataAccess;

public class UserRepository : DataAccessBase<User>, IUserRepository
{
    public async Task CreateUser(string uid)
    {
        if (await FindUser(uid) != null)
        {
            throw new Exception("User already exists.");
        }
        
        var newUser = new User
        {
            UID = uid
        };
        
        await Add(newUser);
    }
    
    public async Task<User?> FindUser(string uid)
    {
        var result = await DB.Find<User>()
            .Match(user => user.UID == uid)
            .ExecuteSingleAsync();

        return result;
    }

}

public interface IUserRepository
{
    public Task CreateUser(string uid);
    public Task<User?> FindUser(string uid);
}