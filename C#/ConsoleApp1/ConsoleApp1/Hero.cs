using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Hero
    {
        public string Name { get; private set; }
        public string HeroClass { get; private set; }
        public int Level { get; private set; }
        public int Health { get; private set; }
        public int MaxHealth { get; private set; }

        public Hero(string name, string heroClass, int level, int health)
        {
            Name = name;
            HeroClass = heroClass;
            Level = level;
            Health = health;
            MaxHealth = health;
        }

        public void TakeDamage(int damage)
        {
            Health = Math.Max(0, Health - damage);
        }

        public void Heal(int heal)
        {
            Health = Math.Min(MaxHealth, Health + heal);
        }
    }
}
