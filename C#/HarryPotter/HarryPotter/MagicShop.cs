using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HarryPotter
{
    internal class MagicShop
    {
        public void ShowShopMenu(Character character)
        {
            Console.WriteLine("\nVelkommen til The Magical Menagerie");
            Console.WriteLine("1. Ugle");
            Console.WriteLine("2. Rotte");
            Console.WriteLine("3. Katt");
            Console.WriteLine("4. Føniksstav");
            Console.WriteLine("5. Unikornstav");
            Console.WriteLine("6. Trollstav");
            Console.WriteLine("Hva trenger du?:");

            string choice = Console.ReadLine();
            string item = choice switch
            {
                "1" => "ugle",
                "2" => "rotte",
                "3" => "katt",
                "4" => "føniksstav",
                "5" => "unikornstav",
                "6" => "trollstav",
                _ => null
            };

            if (item != null)
            {
                character.Inventory.Add(item);
                Console.WriteLine($"Du kjøpte {item}!");
            }
            else
            {
                Console.WriteLine("Det var vist ikke tilgjengelig");
            }
        }
    }
}
