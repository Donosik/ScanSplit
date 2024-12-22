using System.Text.RegularExpressions;
using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;
using MainBackend.Enums;
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
        return await uow.GroupRepository.Get(id);
    }
}