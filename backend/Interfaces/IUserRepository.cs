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
        Task<User> Authenticate(string username, string password);
        void Register(string name, string email, string username, int age, string city, string mobile, string password);

        void RegisterEmployee(string name, string email, string username, int age, string city, string mobile, int? salonId, string password);

        void Update(int id, string name, string email, string username, int age, string city, string mobile, int? salonId, string password);
        Task<bool> UserAlreadyExists(string username, string email);
        Task<bool> SaveAsync();

        Task<User> GetUserDetails(int id);
    }

}
