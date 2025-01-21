using System.Collections.Generic;
using System.Threading.Tasks;
using MainBackend.Database.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IGroupRepository : IGenericRepository<Group>
{
    Task<Group> GetWithUsers(int id);
    Task<IEnumerable<User>> GetUsersFromGroup(int groupId);
    Task DeleteUserFromGroup(int groupId, int userIdToRemove);
    Task<Group?> GetGroupByIdAsync(int groupId);
    Task<Group> GetGroupWithBills(int groupId);
}