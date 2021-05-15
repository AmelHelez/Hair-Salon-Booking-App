using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> Authenticate(string name, string password);
        void Register(string name, string email, int age, string city, string mobile, string password);

        void RegisterEmployee(string name, string email, int age, string city, string mobile, string password);

        Task<bool> UserAlreadyExists(string name);
        Task<bool> SaveAsync();

        Task<User> GetUserDetails(int id);
    }

}
