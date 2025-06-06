using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Hero
    {
        public string Name { get; set; }
        public string HeroClass { get; set; }
        public int Level { get; set; }
        public int Health { get;  set; }
        public int MaxHealth { get; set; }
        public int XP { get; set; }
        public int AttackPower { get; set; }
        private int XpPerLevel { get; set; }

        public Hero(string name, string heroClass, int level, int health, int attackPower)
        {
            Name = name;
            HeroClass = heroClass;
            Level = level;
            Health = health;
            MaxHealth = health;
            XP = 0;
            AttackPower = attackPower;
            XpPerLevel = 100;
        }

        public void TakeDamage(int damage)
        {
            Health = Math.Max(0, Health - damage);
        }

        public void Heal(int heal)
        {
            Health = Math.Min(MaxHealth, Health + heal);
        }

        public void GainXP(int xp)
        {
            XP += xp;
            while (XP >= XpPerLevel)
            {
                XP -= XpPerLevel;
                Level++;
                MaxHealth += 10;
                AttackPower += 5;
                Health = MaxHealth;
                Console.WriteLine($"{Name} har nådd level {Level!}");
            }
        }
    }
}
