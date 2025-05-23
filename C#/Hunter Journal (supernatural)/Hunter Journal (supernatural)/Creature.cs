using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hunter_Journal__supernatural_
{
    internal class Creature
    {
         public string Name { get; private set; }
         public string Type { get; private set; }
         public int DangerLevel { get; private set; }
         public bool IsDefeated { get; private set; }

         public Creature(string name, string type, int dangerLevel)
         {
             Name = name;
             Type = type;
             DangerLevel = Math.Clamp(dangerLevel, 1, 10);
             IsDefeated = false;
        }

         public void MarkDefeated()
         {
             if (IsDefeated)
             {
                 Console.WriteLine($"{Name} has already been defeated!");
             }
             else
             {
                 IsDefeated = true;
                Console.WriteLine($"{Name} has been defeated! Great job hunter!");
             }
         }

         public string GetName()
         {
             return Name;
         }

         public void ShowDetails()
         {
             Console.WriteLine($"Name: {Name}");
             Console.WriteLine($"Type: {Type}");
             Console.WriteLine($"Danger Level: {DangerLevel}");
             Console.WriteLine(!IsDefeated ? $"Status: {Name} is Alive!" : $"Status: {Name} is Defeated!");
        }

         public void UpdateDangerLevel(int newLevel)
         {
             if (newLevel >= 1 && newLevel <= 10)
            {
                DangerLevel = newLevel;
                Console.WriteLine($"Danger level of {Name} updated to {DangerLevel}.");
            }
            else
            {
                Console.WriteLine("Danger level must be between 1 - 10!");
            }
        }
         
         
    }

    
}
