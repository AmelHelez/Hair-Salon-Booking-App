using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Extensions
{
    public static class StringExtensions
    {
        public static bool IsEmpty(this string s)
        {
            return string.IsNullOrEmpty(s.Trim());
        }
    }
}