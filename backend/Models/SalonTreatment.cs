using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SalonTreatment
    {
        public int Id { get; set; }
        public int SalonId { get; set; }
        public Salon Salon { get; set; }
        public int TreatmentId { get; set; }
        public Treatment Treatment { get; set; }
        public int Price { get; set; }
    }
}
