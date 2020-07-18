using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PharmacyAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace PharmacyAPI.Controller
{
    public class AccountController : ApiController
    {
        [HttpPost]
        public async Task<IHttpActionResult> RegisterAdmin(UserModel userModel)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ApplicationDbContext db = new ApplicationDbContext();
            UserStore<IdentityUser> store = new UserStore<IdentityUser>(db);
            UserManager<IdentityUser> manager = new UserManager<IdentityUser>(store);

            IdentityUser user = new IdentityUser();
            user.UserName = userModel.name;
            user.PasswordHash = userModel.Password;

            IdentityResult result =await manager.CreateAsync(user,userModel.Password);

            if(result.Succeeded)
            {
                manager.AddToRole(user.Id, "Admin");
                return Created("", "User Added");
            } 
            else
            {
                return BadRequest(result.Errors.ToList()[0]);
            }
        }
        public async Task<IHttpActionResult> RegisterUser(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ApplicationDbContext db = new ApplicationDbContext();
            UserStore<IdentityUser> store = new UserStore<IdentityUser>(db);
            UserManager<IdentityUser> manager = new UserManager<IdentityUser>(store);

            IdentityUser user = new IdentityUser();
            user.UserName = userModel.name;
            user.PasswordHash = userModel.Password;

            IdentityResult result = await manager.CreateAsync(user, userModel.Password);

            if (result.Succeeded)
            {
                manager.AddToRole(user.Id, "User");
                return Created("", "User Added");
            }
            else
            {
                return BadRequest(result.Errors.ToList()[0]);
            }
        }
    }
}
