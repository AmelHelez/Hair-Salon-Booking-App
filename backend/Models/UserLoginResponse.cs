using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class UserLoginResponse
    {
        public string Name { get; set; }
        public string Token { get; set; }
    }
}
