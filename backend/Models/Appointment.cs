using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime AppointmentTime { get; set; }
        public int Price { get; set; }

        public int SalonId { get; set; }
        public Salon Salon { get; set; }

        [ForeignKey(nameof(User)), Column(Order = 0)]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(Employee)), Column(Order = 1)]
        public int EmployeeId { get; set; }
        public User Employee { get; set; }
        public int TreatmentId { get; set; }
        public Treatment Treatment { get; set; }
        public ICollection<Chat>? Chats { get; set; }
    }
}
