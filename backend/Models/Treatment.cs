using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Treatment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Cost { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }

    }
}
