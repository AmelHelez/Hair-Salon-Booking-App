using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await dc.Users
                .Include(u => u.Appointments)
                .Include(u => u.AppointmentsEmployee)
                .Include(u => u.UserReviews)
                .Include(u => u.Chats)
                .Include(u => u.ChatsEmployee)
                .ToListAsync();
        }


        public async Task<User> GetUserDetails(int id)
        {
            return await dc.Users
                .Include(u => u.Role)
                .Include(u => u.Appointments)
                .Include(u => u.AppointmentsEmployee)
                .Include(u => u.Chats)
                .Include(u => u.ChatsEmployee)
                .Where(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await dc.Users.FirstOrDefaultAsync(u => u.Username == username);

            if(user == null || user.PasswordKey == null)
            {
                return null;
            }

            if(!MatchPasswordHash(password, user.Password, user.PasswordKey))
            {
                return null;
            }

            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));

                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i]) return false;
                }

                return true;
            }
        }

        public void Register(string name, string email, string username, int age, string city, string mobile, string password)
        {
            byte[] passwordHash, passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

            User user = new User();
            user.Name = name;
            user.Email = email;
            user.Username = username;
            user.Age = age;
            user.City = city;
            user.Mobile = mobile;
            user.RoleId = 3;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;

            dc.Users.Add(user);
            //dc.Roles.Add(role);
        }

        public void RegisterEmployee(string name, string email, string username, int age, string city, string mobile, int? salonId, string password)
        {
            byte[] passwordHash, passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

            User user = new User();
            user.Name = name;
            user.Email = email;
            user.Username = username;
            user.Age = age;
            user.City = city;
            user.Mobile = mobile;
            user.RoleId = 2;
            user.SalonId = salonId;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;

            dc.Users.Add(user);
            //dc.Roles.Add(role);
        }

        public async Task<bool> UserAlreadyExists(string username, string email)
        {
            return await dc.Users.AnyAsync(x => x.Username == username || x.Email == email);
        }

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }

        public void Update(int id, string name, string email, string username, int age, string city, string mobile, int? salonId, string password)
        {
            byte[] passwordHash, passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            var user = dc.Users.Find(id);
            user.Name = name;
            user.Email = email;
            user.Username = username;
            user.Age = age;
            user.City = city;
            user.Mobile = mobile;
            if (salonId > 0) user.SalonId = salonId;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;
            dc.Users.Append(user);
            dc.Users.Update(user);

            //return _mapper.Map<Model.User>(entity);
        }

        public void Delete(int id)
        {
            var user = dc.Users.Find(id);
            dc.Users.Remove(user);

        }
    }
}
