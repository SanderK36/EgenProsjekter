using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Virtuell_Fruktbod
{
    internal class Fruit
    {
         private string Name {get; set; }
         private double PriceKg { get; set; }
         private int KiloInStorage { get; set; }

         public Fruit(string name, double priceKg, int kiloInStorage)
         {
             Name = name;
             PriceKg = priceKg;
            KiloInStorage = kiloInStorage;
         }

         public void ShowInfo()
         {
            Console.WriteLine($"{Name}");
            Console.WriteLine($"Pris pr kilo: {PriceKg}");
            Console.WriteLine($"Kilo på lager: {KiloInStorage}");
        }

         public void AddStock(int kilos)
        {
            if (kilos > 0)
            {
                KiloInStorage += kilos;
                Console.WriteLine($"{kilos} kilo lagt til. {Name} har nå {KiloInStorage} kilo på lager");
            }
            else
            {
                Console.WriteLine("Kan ikke legge til 0 eller negative kilo!");
            }
        }

        public void SellFruit(int kilos)
        {
            if (kilos > 0)
            {
                if (kilos <= KiloInStorage)
                {
                    KiloInStorage -= kilos;
                    Console.WriteLine($"{kilos} kilo av {Name} solgt. {KiloInStorage} kilo igjen på lager.");
                }
                else
                {
                    Console.WriteLine($"Ikke nok {Name} på lager! Kun {KiloInStorage} kilo tilgjengelig.");
                }
            }
            else
            {
                Console.WriteLine("Kan ikke selge 0 eller negative kilo!");
            }
        }

        public string GetName()
        {
            return Name;
        }
    }
}
