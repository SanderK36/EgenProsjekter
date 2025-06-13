using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HarryPotter
{
    internal class Character
    {
        public string Name { get; set; }
        public string House { get; set; }
        public List<string> Inventory { get; set; }


        public Character(string name, string house, List<string> inventory)
        {
            Name = name;
            House = house;
            Inventory = inventory ?? new List<string>();
        }

        public void PrintInfo()
        {
            Console.WriteLine("Hallo!");
            Console.WriteLine($"Jeg heter {Name} og er i {House}!");
            Console.WriteLine("Dette er hva en trollman som meg har med seg:");
            Console.WriteLine(Inventory.Count > 0 ? string.Join(", ", Inventory) : "Ojsann! Vi har ikke det vi trenger! La oss dra til butikken og kjøpe inn ting som vi trenger!");
        }

        public void CastSpell(string spell)
        {
            if(spell == "vingardium leviosa")
                Console.WriteLine("Du får en fjær til å fly!");
            else if(spell == "hokus pokus")
                Console.WriteLine("du fyrer av fyrverkeri ut av tryllestaven!");
            else
                Console.WriteLine("Ugyldig trylleformel!");
        }
    }

}
