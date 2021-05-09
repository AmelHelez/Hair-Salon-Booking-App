using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalonsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUnitOfWork uow;

        public SalonsController(DataContext context)
        {
            _context = context;
        }
       /* public SalonsController(IUnitOfWork uow)
        {
            this.uow = uow;
        }*/

        // GET: api/Salons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salon>>> GetSalons()
        {
            return await _context.Salons.ToListAsync();
            //var salon = await uow.SalonRepository.GetAllSalonsAsync();

            //return Ok(salon);
        }

        // GET: api/Salons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Salon>> GetSalon(int id)
        {
            var salon = await _context.Salons.FindAsync(id);

            if (salon == null)
            {
                return NotFound();
            }

            return salon;
        }

        // PUT: api/Salons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalon(int id, Salon salon)
        {
            if (id != salon.Id)
            {
                return BadRequest();
            }

            _context.Entry(salon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        } 

        // POST: api/Salons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("add")]
        public async Task<ActionResult<Salon>> PostSalon(Salon salon)
        {
            _context.Salons.Add(salon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalon", new { id = salon.Id }, salon);
            //uow.SalonRepository.AddSalon(salon);
            //await uow.SaveAsync();
            //return StatusCode(201);
        }

        // DELETE: api/Salons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Salon>> DeleteSalon(int id)
        {
            var salon = await _context.Salons.FindAsync(id);
            if (salon == null)
            {
                return NotFound();
            }

            _context.Salons.Remove(salon);
            await _context.SaveChangesAsync();

            return salon;
        }

        private bool SalonExists(int id)
        {
            return _context.Salons.Any(e => e.Id == id);
        }
    }
}
