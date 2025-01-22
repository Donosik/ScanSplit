using System.Linq;
using MainBackend.Database.Entities;
using MainBackend.Database.MainDb.UoW;
using MainBackend.Exceptions;

namespace MainBackend.Services;

public class GroupSettlementService : IGroupSettlementService
{
    private readonly IIdentityService identityService;
    private readonly IUoW uow;
    
    public GroupSettlementService(IUoW uow, IIdentityService identityService)
    {
        this.identityService = identityService;
        this.uow = uow;
    }
    
    public async Task<List<Transfer>> CalculateSettlementsAsync(int groupId)
    {
        
        var group=await uow.GroupRepository.GetGroupByIdAsyncAllInfo(groupId);
        if (group == null)
            throw new NotFoundException();
        
        var balances = new Dictionary<int, decimal>();
        
        foreach (var user in group.Users)
        {
            balances[user.Id] = 0;
        }

        

        foreach (var bill in group.Bills)
        {
            var billBalances = CalculateBill(bill, group.Users); // Rozlicz rachunek
            foreach (var (userId, amount) in billBalances)
            {
                balances[userId] += amount; // Zaktualizuj bilans
            }
        }
        foreach (var kvp in balances)
        {
            Console.WriteLine($"User ID: {kvp.Key}, Balance: {kvp.Value}");
        }
        return SuggestSettlement(balances);
    }
private Dictionary<int, decimal> CalculateBill(Bill bill, ICollection<User> userCount)
    {
        var costs = new Dictionary<int, decimal>();
        foreach (var menuItem in bill.MenuItems)
        {
            var usersToCharge = menuItem.OrderedBy;
            if (usersToCharge == null || usersToCharge.Count == 0)
            {
                usersToCharge = userCount;
            }

            var itemCost = menuItem.Price * menuItem.Quantity;
            var costPerUser = itemCost / usersToCharge.Count;

            foreach (var user in usersToCharge)
            {
                if (user == null)
                {
                    // Jeśli któryś z użytkowników jest null, pomijamy go
                    // Logowanie, jeśli któryś użytkownik w OrderedBy jest null
                    continue;
                }
                if (!costs.ContainsKey(user.Id))
                    costs[user.Id] = 0;
                costs[user.Id] -= costPerUser ?? 0; // Każdy użytkownik ponosi koszt
            }
        }

        // Dodaj zapłatę przez płatnika, jeśli istnieje
        Console.WriteLine($"ID rachunku: {bill.Id}");
        
        var payer = userCount.FirstOrDefault(u => u.Id ==bill.Payments.FirstOrDefault()?.UserId );
        if (payer != null)
        {
            // Logowanie płatnika
            Console.WriteLine($"Płatnik: {payer.Name} (ID: {payer.Id}), zapłacił: {bill.MenuItems.Sum(mi => mi.Price * mi.Quantity)}.");

            if (!costs.ContainsKey(payer.Id))
                costs[payer.Id] = 0;
            costs[payer.Id] += bill.MenuItems.Sum(mi => mi.Price * mi.Quantity) ?? 0; // Dodaj pełną zapłatę płatnika
        }
        else
        {
            // Można dodać logowanie w przypadku, gdy brak płatnika
            // np. log.Debug("Płatnik nie został znaleziony w rachunku");
            // Logowanie braku płatnika
            Console.WriteLine("Płatnik nie został znaleziony w rachunku.");
        }

        return costs;
    }

    private List<Transfer> SuggestSettlement(Dictionary<int, decimal> balances)
    {
        var creditors = balances.Where(b => b.Value > 0).OrderByDescending(b => b.Value).ToList();
        var debtors = balances.Where(b => b.Value < 0).OrderBy(b => b.Value).ToList();

        var transfers = new List<Transfer>();

        int creditorIndex = 0, debtorIndex = 0;

        while (creditorIndex < creditors.Count && debtorIndex < debtors.Count)
        {
            var creditor = creditors[creditorIndex];
            var debtor = debtors[debtorIndex];

            var amount = Math.Min(creditor.Value, -debtor.Value);

            transfers.Add(new Transfer
            {
                PayerId = debtor.Key,
                RecipientId = creditor.Key,
                Amount = amount,
                Status = "Pending"
            });

            creditors[creditorIndex] = new KeyValuePair<int, decimal>(creditor.Key, creditor.Value - amount);
            debtors[debtorIndex] = new KeyValuePair<int, decimal>(debtor.Key, debtor.Value + amount);

            if (creditors[creditorIndex].Value == 0)
                creditorIndex++;

            if (debtors[debtorIndex].Value == 0)
                debtorIndex++;
        }
        foreach (var transfer in transfers)
        {
            Console.WriteLine($"PayerId: {transfer.PayerId}, RecipientId: {transfer.RecipientId}, Amount: {transfer.Amount}, Status: {transfer.Status}");
        }

        Console.WriteLine("Haloo");
        return transfers;
    }
}