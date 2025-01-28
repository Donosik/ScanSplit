using System.Collections.Generic;
using System.Threading.Tasks;
using MainBackend.Database.Entities;
using MainBackend.Enums;

namespace MainBackend.Services;

public interface IGroupService
{
    public Task<int> CreateGroup(string groupName);
    public Task AddUserToGroupByLogin(string login, int idGroup);

    public Task AddUserToGroupByPhoneNumber(string phoneNumber, int idGroup);

    public Task UpdateStatus(GroupStatus status, int idGroup);
    public Task<Group> GetGroupById(int id);
    public Task<IEnumerable<User>> GetUsersByGroupId(int idGroup);
    public Task DeleteGroup(int idGroup);
    public Task RemoveSelfFromGroup(int idGroup);

    public Task RemoveUserFromGroup(string login, int idGroup);
    Task UpadataNameGroup(string grouplName, int groupId);
    Task UpdateGroupImage(string groupImage, int billId);
    Task<decimal> GetMySumInGroup(int groupId);
    Task<decimal> GetSumInGroup(int groupId);
}