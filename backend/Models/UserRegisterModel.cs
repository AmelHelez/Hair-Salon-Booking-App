using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class UserRegisterModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public int Age { get; set; }
        public string City { get; set; }

        [MaxLength(12)]
        public string Mobile { get; set; }
        public string Password { get; set; }
        public int? SalonId { get; set; }
    }
}
