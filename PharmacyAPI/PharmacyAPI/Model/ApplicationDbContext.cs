using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PharmacyAPI.Model
{
    public class ApplicationDbContext:IdentityDbContext
    {
        public ApplicationDbContext():base("Pharmacy")
        {
                
        }
        public DbSet<Medicine> Medicines { get; set; }
    }
}