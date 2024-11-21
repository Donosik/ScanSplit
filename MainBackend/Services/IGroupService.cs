namespace MainBackend.Services;

public interface IGroupService
{
    public Task CreateGroup (string groupName);
    public Task AddUserToGroupByLogin(string login, int idGroup);

    public Task AddUserToGroupByPhoneNumber(string phoneNumber, int idGroup);

    public Task UpdateStatus(string status, int idGroup);
}