﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Interfaces;
using backend.Errors;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using backend.Extensions;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IConfiguration configuration;


        //private readonly DataContext _context;

        /*public UsersController(DataContext context)
        {
            _context = context;
        }*/

        public UsersController(IUserRepository userRepository, IConfiguration configuration)
        {
            this.userRepository = userRepository;
            this.configuration = configuration;

        }
        // GET: api/Users
        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }*/

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /* [HttpPut("{id}")]
         public async Task<IActionResult> PutUser(int id, User user)
         {
             if (id != user.Id)
             {
                 return BadRequest();
             }

             _context.Entry(user).State = EntityState.Modified;

             try
             {
                 await _context.SaveChangesAsync();
             }
             catch (DbUpdateConcurrencyException)
             {
                 if (!UserExists(id))
                 {
                     return NotFound();
                 }
                 else
                 {
                     throw;
                 }
             }

             return NoContent();
         }*/

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /* [HttpPost]
         public async Task<ActionResult<User>> PostUser(User user)
         {
             _context.Users.Add(user);
             await _context.SaveChangesAsync();

             return CreatedAtAction("GetUser", new { id = user.Id }, user);
         }

         // DELETE: api/Users/5
         [HttpDelete("{id}")]
         public async Task<ActionResult<User>> DeleteUser(int id)
         {
             var user = await _context.Users.FindAsync(id);
             if (user == null)
             {
                 return NotFound();
             }

             _context.Users.Remove(user);
             await _context.SaveChangesAsync();

             return user;
         }*/

        //api/users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginRequest loginReq)
        {
            var user = await userRepository.Authenticate(loginReq.Name, loginReq.Password);

            ApiError apiError = new ApiError();

             if (user == null)
             {
                 apiError.ErrorCode = Unauthorized().StatusCode;
                 apiError.ErrorMessage = "Invalid User ID or password.";
                 apiError.ErrorDetails = "This error appears when provided user id or password does not exist.";
                 return Unauthorized(apiError);
             }


            var loginRes = new UserLoginResponse();
            loginRes.Name = user.Name;
            loginRes.Token = CreateJWT(user);

            return Ok(loginRes);
        }

        private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
               .GetBytes(secretKey));

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterModel loginReq)
        {
            ApiError apiError = new ApiError();

            if (loginReq.Name.IsEmpty() || 
                loginReq.Password.IsEmpty())
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User name or password cannot be blank.";
                return BadRequest(apiError);
            }

            if (await userRepository.UserAlreadyExists(loginReq.Name))
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User already exists, please try something else.";
                return BadRequest(apiError);
            }

            userRepository.Register(loginReq.Name, loginReq.Email, loginReq.Age, loginReq.City, loginReq.Mobile, loginReq.Password);
            await userRepository.SaveAsync();
            return StatusCode(201);
            /* if (loginReq.Name.IsEmpty() ||
                 loginReq.Password.IsEmpty())
             {
                 apiError.ErrorCode = BadRequest().StatusCode;
                 apiError.ErrorMessage = "User name or password cannot be blank.";
                 return BadRequest(apiError);
             }

             if (await userRepository.UserAlreadyExists(loginReq.Name))
             {
                 apiError.ErrorCode = BadRequest().StatusCode;
                 apiError.ErrorMessage = "User already exists, please try something else.";
                 return BadRequest(apiError);
             }

             userRepository.Register(loginReq.Name, loginReq.Password);
             await userRepository.SaveAsync();
             return StatusCode(201);
         }

         private string CreateJWT(User user)
         {
             var secretKey = configuration.GetSection("AppSettings:Key").Value;
             var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey));

             var claims = new Claim[]
             {
                 new Claim(ClaimTypes.Name, user.Name),
                 new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
             };

             var signingCredentials = new SigningCredentials(
                 key, SecurityAlgorithms.HmacSha256Signature);

             var tokenDescriptor = new SecurityTokenDescriptor
             {
                 Subject = new ClaimsIdentity(claims),
                 Expires = DateTime.UtcNow.AddDays(10),
                 SigningCredentials = signingCredentials
             };

             var tokenHandler = new JwtSecurityTokenHandler();
             var token = tokenHandler.CreateToken(tokenDescriptor);
             return tokenHandler.WriteToken(token);
         }


         private bool UserExists(int id)
         {
             return _context.Users.Any(e => e.Id == id);
         }*/
        }
    }
}