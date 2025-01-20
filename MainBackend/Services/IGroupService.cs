using MainBackend.Database.Entities;
using MainBackend.Enums;

namespace MainBackend.Services;

public interface IGroupService
{
    public Task<int> CreateGroup (string groupName);
    public Task AddUserToGroupByLogin(string login, int idGroup);

    public Task AddUserToGroupByPhoneNumber(string phoneNumber, int idGroup);

    public Task UpdateStatus(GroupStatus status, int idGroup);
    public Task<Group> GetGroupById(int id);
    public Task<IEnumerable<User>> GetUsersByGroupId(int idGroup);
    public Task DeleteGroup(int idGroup);
    public Task RemoveSelfFromGroup(int idGroup);

    public Task RemoveUserFromGroup(string login, int idGroup);
}