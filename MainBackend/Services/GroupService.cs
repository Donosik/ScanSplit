using System.Text.RegularExpressions;
using System.Threading.Tasks.Dataflow;
using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;
using MainBackend.Enums;
using MainBackend.Exceptions;
using Group = MainBackend.Database.Entities.Group;

namespace MainBackend.Services;

public class GroupService: IGroupService
{
    private readonly IIdentityService identityService;
    private readonly IUoW uow;

    public GroupService(IUoW uow, IIdentityService identityService)
    {
        this.identityService = identityService;
        this.uow = uow;
    }


    public async Task<int> CreateGroup(string groupName)
    {
        var userId = identityService.GetLoggedUserId();
        var user = await uow.UserRepository.Get(userId);
        var group = new MainBackend.Database.Entities.Group();
        group.Name = groupName;
        group.Status = GroupStatus.Active;
        group.Users.Add(user);
        uow.GroupRepository.Create(group);
        await uow.Save();
        return group.Id;
    }

    public async Task AddUserToGroupByLogin(string login, int idGroup)
    {
        var group = await uow.GroupRepository.Get(idGroup);
        var user = await uow.UserRepository.GetByLogin(login);
        group.Users.Add(user);
        uow.GroupRepository.Update(group);
        await uow.Save();
    }
    
    public async Task AddUserToGroupByPhoneNumber(string phoneNumber, int idGroup)
    {
        var group = await uow.GroupRepository.Get(idGroup);
        var user = await uow.UserRepository.GetByPhoneNumber(phoneNumber);
        group.Users.Add(user);
        uow.GroupRepository.Update(group);
        await uow.Save();
    }

    public async Task UpdateStatus(GroupStatus status,int idGroup)
    {
        var group = await uow.GroupRepository.Get(idGroup);
        group.Status = status;
        uow.GroupRepository.Update(group);
        await uow.Save();
    }
    
    
    public async Task<Group> GetGroupById(int id)
    {
        return await uow.GroupRepository.GetWithUsers(id);
    }
    
    public async Task<IEnumerable<User>> GetUsersByGroupId(int idGroup)
    {
        var group = await uow.GroupRepository.GetUsersFromGroup(idGroup);

        if (group == null)
            throw new Exception("Group not found");

        return group;
    }
    
    
    public async Task RemoveUserFromGroup(string login, int idGroup)
    {
        var user = await uow.UserRepository.GetByLogin(login);
        await uow.GroupRepository.DeleteUserFromGroup(idGroup, user.Id);
        await uow.Save();
    }

    public async Task RemoveSelfFromGroup(int idGroup)
    {
        var userId = identityService.GetLoggedUserId();
        
        await uow.GroupRepository.DeleteUserFromGroup(idGroup, userId);
        await uow.Save();
    }

    public async Task DeleteGroup(int idGroup)
    {
        var group = await uow.GroupRepository.Get(idGroup);
        if (group == null)
            throw new Exception("Group not found");

        uow.GroupRepository.Delete(group);
        await uow.Save();
    }
    
    public async  Task UpadataNameGroup(string grouplName, int groupId){
        var group = await uow.GroupRepository.GetGroupByIdAsync(groupId);
        group.Name = grouplName;
        uow.GroupRepository.Update(group);
        await uow.Save();
    }

    public async Task UpdateGroupImage(string groupImage, int billId)
    {
        Group group=await uow.GroupRepository.Get(billId);
        if (group == null)
            throw new NotFoundException();
        group.Image= groupImage;
        uow.GroupRepository.Update(group);
        await uow.Save();
    }
}