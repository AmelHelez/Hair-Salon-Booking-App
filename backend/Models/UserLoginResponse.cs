using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class UserLoginResponse
    {
        public int? Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public int RoleId { get; set; }
        public int? SalonId { get; set; }
    }
}
