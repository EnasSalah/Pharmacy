using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PharmacyAPI.Model
{
    public class Medicine
    {
        public int ID { get; set; }
        public string ArabicName { get; set; }
        public string EnglishName { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }


    }
}