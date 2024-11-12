using MainBackend.Database.Generic.Repositories;

namespace MainBackend.Database.MainDb.Wrapper;

public interface IUoW : IDisposable
{
    public readonly IUserRepository userRepository;
    public readonly ITransferRepository transferRepository;
    public readonly IBillRepository billRepository;
    public readonly IGroupRepository groupRepository;
    public readonly ILocationRepository locationRepository;
    public readonly IMenuItemRepository menuItemRepository;
    public readonly IPaymentRepository paymentRepository;

    Task<bool> Save(int entities = 1);
    void Dispose();
}