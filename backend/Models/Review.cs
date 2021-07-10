using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Grade { get; set; }
        public string Comment { get; set; }
        public DateTime DateReviewed { get; set; }
        public int SalonId { get; set; }
        public Salon Salon { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
