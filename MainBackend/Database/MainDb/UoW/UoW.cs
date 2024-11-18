using MainBackend.Database.Generic.Repositories;
using MainBackend.Exceptions;

namespace MainBackend.Database.MainDb.UoW;

public class UoW : IUoW
{
    private readonly DB.Context.MainDb context;

    public IUserRepository UserRepository { get; }
    public ITransferRepository TransferRepository { get; }
    public IBillRepository BillRepository { get; }
    public IGroupRepository GroupRepository { get; }
    public ILocationRepository LocationRepository { get; }
    public IMenuItemRepository MenuItemRepository { get; }
    public IPaymentRepository PaymentRepository { get; }
    
    public UoW(DB.Context.MainDb context, IUserRepository userRepository, ITransferRepository transferRepository,
        IBillRepository billRepository, IGroupRepository groupRepository, ILocationRepository locationRepository,
        IMenuItemRepository menuItemRepository, IPaymentRepository paymentRepository)
    {
        this.context = context;
        this.UserRepository = userRepository;
        this.TransferRepository = transferRepository;
        this.BillRepository = billRepository;
        this.GroupRepository = groupRepository;
        this.LocationRepository = locationRepository;
        this.MenuItemRepository = menuItemRepository;
        this.PaymentRepository = paymentRepository;
        
    }

    public async Task Save(int entities = 1)
    {
        int result = await context.SaveChangesAsync();
        if (result < entities)
            throw new IncorrectDBSaveException();
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (disposing)
            context.Dispose();
    }
}