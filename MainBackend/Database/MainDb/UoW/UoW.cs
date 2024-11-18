using MainBackend.Database.Generic.Repositories;
using MainBackend.Exceptions;

namespace MainBackend.Database.MainDb.UoW;

public class UoW : IUoW
{
    private readonly DB.Context.MainDb context;

    public UoW(DB.Context.MainDb context, IUserRepository userRepository, ITransferRepository transferRepository,
        IBillRepository billRepository, IGroupRepository groupRepository, ILocationRepository locationRepository,
        IMenuItemRepository menuItemRepository, IPaymentRepository paymentRepository)
    {
        //this.context = context;
        //this.userRepository = userRepository;
        //this.transferRepository = transferRepository;
        //this.billRepository = billRepository;
        //this.groupRepository = groupRepository;
        //this.locationRepository = locationRepository;
        //this.menuItemRepository = menuItemRepository;
        //this.paymentRepository = paymentRepository;

        this.context = context ?? throw new ArgumentNullException(nameof(context));
        UserRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        TransferRepository = transferRepository ?? throw new ArgumentNullException(nameof(transferRepository));
        BillRepository = billRepository ?? throw new ArgumentNullException(nameof(billRepository));
        GroupRepository = groupRepository ?? throw new ArgumentNullException(nameof(groupRepository));
        LocationRepository = locationRepository ?? throw new ArgumentNullException(nameof(locationRepository));
        MenuItemRepository = menuItemRepository ?? throw new ArgumentNullException(nameof(menuItemRepository));
        PaymentRepository = paymentRepository ?? throw new ArgumentNullException(nameof(paymentRepository));
    }

    public IUserRepository UserRepository { get; }
    public ITransferRepository TransferRepository { get; }
    public IBillRepository BillRepository { get; }
    public IGroupRepository GroupRepository { get; }
    public ILocationRepository LocationRepository { get; }
    public IMenuItemRepository MenuItemRepository { get; }
    public IPaymentRepository PaymentRepository { get; }

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