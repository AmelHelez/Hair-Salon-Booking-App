using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public bool Action { get; set; }

        [ForeignKey(nameof(User)), Column(Order = 0)]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(Employee)), Column(Order = 1)]
        public int EmployeeId { get; set; }
        public User Employee { get; set; }
        public int AppointmentId { get; set; }
        public Appointment Appointment { get; set; }
    }
}
