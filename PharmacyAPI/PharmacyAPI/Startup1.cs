using System;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;
using PharmacyAPI.Model;

[assembly: OwinStartup(typeof(PharmacyAPI.Startup1))]

namespace PharmacyAPI
{
    public class Startup1
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            app.UseCors(CorsOptions.AllowAll);

            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new OAuthTokenCreate()
            }); ;
            //consumer send token "PAssive /active"
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            HttpConfiguration config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute("Default", "{controller}/{action}/{id}",
                new { id = RouteParameter.Optional });
            app.UseWebApi(config);
            CreateRoles();


        }
        private void CreateRoles()
        {
            ApplicationDbContext context = new ApplicationDbContext();

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            if (!roleManager.RoleExists("Admin"))
            {
                var role = new IdentityRole();
                role.Name = "Admin";
                roleManager.Create(role);
            }

            if (!roleManager.RoleExists("User"))
            {
                var role = new IdentityRole();
                role.Name = "User";
                roleManager.Create(role);
            }
        }
    }

    internal class OAuthTokenCreate : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(
            OAuthValidateClientAuthenticationContext context)
        {
             context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(
            OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add(" Access-Control-Allow-Origin ", new[] { "*" });

            ApplicationDbContext dbcontext = new ApplicationDbContext();
            UserStore<IdentityUser> userstore = new UserStore<IdentityUser>(dbcontext);
            UserManager<IdentityUser> manager = new UserManager<IdentityUser>(userstore);

            IdentityUser user = manager.Find(context.UserName, context.Password);
            if (user == null)
            {
                context.SetError("grant_error", "Username Or Password Not Found");
                return;
            }

            // manager.IsInRole(user.Id, "admin");
            //[authorize(role="admin")]

            ClaimsIdentity Identity = new ClaimsIdentity(context.Options.AuthenticationType);
            //information 
            Identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, context.UserName));
            //Identity.AddClaim(new Claim(ClaimTypes.Role,"admin,Student"));

            context.Validated(Identity);

        }
    }
}
