using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class SalonRepository : ISalonRepository
    {
        private readonly DataContext dc;

        public SalonRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddSalon(Salon salon)
        {
            dc.Salons.AddAsync(salon);
        }

        public void DeleteSalon(int salonId)
        {
            var salon = dc.Salons.Find(salonId);
            dc.Salons.Remove(salon);
        }

        public async Task<Salon> FindSalon(int id)
        {
            return await dc.Salons.FindAsync(id);
        }

        public async Task<IEnumerable<Salon>> GetAllSalonsAsync()
        {
            return await dc.Salons.ToListAsync();
        }

        public void UpdateSalon()
        {
            throw new NotImplementedException();
        }
    }
}
