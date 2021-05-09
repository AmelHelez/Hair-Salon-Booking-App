using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class UserLoginRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
