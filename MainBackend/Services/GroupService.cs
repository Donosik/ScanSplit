using System.Text.RegularExpressions;
using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;

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


    public async Task CreateGroup(string groupName)
    {
        var userId = identityService.GetLoggedUserId();
        var user = await uow.UserRepository.Get(userId);
        var group = new MainBackend.Database.Entities.Group();
        group.Name = groupName;
        group.Status = "aktywna";
        group.Users = new List<User>();
        group.Users.Add(user);
        uow.GroupRepository.Create(group);
        await uow.Save();
    }

    public async Task AddUserToGroupByLogin(string login, int idGroup)
    {
        var group = await uow.GroupRepository.Get(idGroup);
        var user = await uow.UserRepository.GetByLogin(login);
        if (group.Users == null)
        {
            group.Users = new List<User>();
        }
        group.Users.Add(user);
        uow.GroupRepository.Update(group);
        await uow.Save();
    }
    
    public async Task AddUserToGroupByPhoneNumber(string phoneNumber, int idGroup)
    {
        var group = await uow.GroupRepository.Get(idGroup);
        var user = await uow.UserRepository.GetByPhoneNumber(phoneNumber);
        if (group.Users == null)
        {
            group.Users = new List<User>();
        }
        group.Users.Add(user);
        uow.GroupRepository.Update(group);
        await uow.Save();
    }

    public async Task UpdateStatus(string status, int idGroup)
    {
        var group = await uow.GroupRepository.Get(idGroup);
        group.Status = status;
        uow.GroupRepository.Update(group);
        await uow.Save();
    }
}