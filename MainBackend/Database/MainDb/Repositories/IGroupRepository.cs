using MainBackend.Database.Entities;

namespace MainBackend.Database.Generic.Repositories;

public interface IGroupRepository : IGenericRepository<Group>
{
    Task<Group> GetWithUsers(int id);
    Task<IEnumerable<User>> GetUsersFromGroup(int groupId);
}