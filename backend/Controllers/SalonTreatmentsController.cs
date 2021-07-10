using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalonTreatmentsController : ControllerBase
    {
        private readonly DataContext _context;

        public SalonTreatmentsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/SalonTreatments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalonTreatment>>> GetSalonTreatments()
        {
            return await _context.SalonTreatments
                .Include(st => st.Treatment)
                .ToListAsync();
        }

        // GET: api/SalonTreatments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalonTreatment>> GetSalonTreatment(int id)
        {
            var salonTreatment = await _context.SalonTreatments.FindAsync(id);

            if (salonTreatment == null)
            {
                return NotFound();
            }

            return salonTreatment;
        }

        // PUT: api/SalonTreatments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalonTreatment(int id, SalonTreatment salonTreatment)
        {
            if (id != salonTreatment.Id)
            {
                return BadRequest();
            }

            _context.Entry(salonTreatment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalonTreatmentExists(id))
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

        // POST: api/SalonTreatments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("add")]
        public async Task<ActionResult<SalonTreatment>> PostSalonTreatment(SalonTreatment salonTreatment)
        {
            _context.SalonTreatments.Add(salonTreatment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalonTreatment", new { id = salonTreatment.Id }, salonTreatment);
        }

        // DELETE: api/SalonTreatments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalonTreatment>> DeleteSalonTreatment(int id)
        {
            var salonTreatment = await _context.SalonTreatments.FindAsync(id);
            if (salonTreatment == null)
            {
                return NotFound();
            }

            _context.SalonTreatments.Remove(salonTreatment);
            await _context.SaveChangesAsync();

            return salonTreatment;
        }

        private bool SalonTreatmentExists(int id)
        {
            return _context.SalonTreatments.Any(e => e.Id == id);
        }
    }
}
