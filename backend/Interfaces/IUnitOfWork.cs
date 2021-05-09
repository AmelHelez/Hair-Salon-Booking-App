using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
        ISalonRepository SalonRepository { get; }
        //IUserRepository UserRepository { get; }
        Task<bool> SaveAsync();
    }
}
