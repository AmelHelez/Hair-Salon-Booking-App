using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface ISalonRepository
    {
        Task<IEnumerable<Salon>> GetAllSalonsAsync();
        void AddSalon(Salon salon);
        void UpdateSalon(int id, Salon salon);
        void DeleteSalon(int salonId);
        Task<Salon> FindSalon(int id);

    }
}
