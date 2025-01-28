using MainBackend.Database.Entities;

namespace MainBackend.Services;

public interface IGroupSettlementService
{
    Task<List<Transfer>> CalculateSettlementsAsync(int groupId);
}