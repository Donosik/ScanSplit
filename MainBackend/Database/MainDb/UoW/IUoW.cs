using MainBackend.Database.Generic.Repositories;

namespace MainBackend.Database.MainDb.UoW;

public interface IUoW : IDisposable
{
    IUserRepository UserRepository { get; }
    ITransferRepository TransferRepository { get; }
    IBillRepository BillRepository { get; }
    IGroupRepository GroupRepository { get; }
    ILocationRepository LocationRepository { get; }
    IMenuItemRepository MenuItemRepository { get; }
    IPaymentRepository PaymentRepository { get; }

    Task Save(int entities = 1);
    void Dispose();
}