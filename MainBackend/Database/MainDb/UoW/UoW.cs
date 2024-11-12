using MainBackend.Database.Generic.Repositories;

namespace MainBackend.Database.MainDb.Wrapper;

public class UoW : IUoW
{
    private readonly DB.Context.MainDb context;
    public readonly IUserRepository userRepository;
    public readonly ITransferRepository transferRepository;
    public readonly IBillRepository billRepository;
    public readonly IGroupRepository groupRepository;
    public readonly ILocationRepository locationRepository;
    public readonly IMenuItemRepository menuItemRepository;
    public readonly IPaymentRepository paymentRepository;

    public UoW(DB.Context.MainDb context,IUserRepository userRepository, ITransferRepository transferRepository, IBillRepository billRepository, IGroupRepository groupRepository, ILocationRepository locationRepository, IMenuItemRepository menuItemRepository, IPaymentRepository paymentRepository)
    {
        this.context = context;
        this.userRepository = userRepository;
        this.transferRepository = transferRepository;
        this.billRepository = billRepository;
        this.groupRepository = groupRepository;
        this.locationRepository = locationRepository;
        this.menuItemRepository = menuItemRepository;
        this.paymentRepository = paymentRepository;
    }

    public async Task<bool> Save(int entities = 1)
    {
        int result = await context.SaveChangesAsync();
        if (result >= entities)
            return true;
        return false;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if(disposing)
            context.Dispose();
    }
}