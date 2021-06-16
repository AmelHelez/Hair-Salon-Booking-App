using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string AppointmentDate { get; set; }
        public int SalonId { get; set; }
        public Salon Salon { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int TreatmentId { get; set; }
        public Treatment Treatment { get; set; }
    }
}
