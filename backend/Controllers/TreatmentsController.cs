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
    public class TreatmentsController : ControllerBase
    {
        private readonly DataContext _context;

        public TreatmentsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Treatments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Treatment>>> GetTreatments()
        {
            return await _context.Treatments.ToListAsync();
        }

        // GET: api/Treatments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Treatment>> GetTreatment(int id)
        {
            var treatment = await _context.Treatments
                .Include(t => t.Appointments)
                .Where(t => t.Id == id).FirstOrDefaultAsync();

            if (treatment == null)
            {
                return NotFound();
            }

            return treatment;
        }

        // PUT: api/Treatments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTreatment(int id, Treatment treatment)
        {
            if (id != treatment.Id)
            {
                return BadRequest();
            }

            _context.Entry(treatment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TreatmentExists(id))
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

        // POST: api/Treatments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Treatment>> PostTreatment(Treatment treatment)
        {
            _context.Treatments.Add(treatment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTreatment", new { id = treatment.Id }, treatment);
        }

        // DELETE: api/Treatments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Treatment>> DeleteTreatment(int id)
        {
            var treatment = await _context.Treatments.FindAsync(id);
            if (treatment == null)
            {
                return NotFound();
            }

            _context.Treatments.Remove(treatment);
            await _context.SaveChangesAsync();

            return treatment;
        }

        private bool TreatmentExists(int id)
        {
            return _context.Treatments.Any(e => e.Id == id);
        }
    }
}
