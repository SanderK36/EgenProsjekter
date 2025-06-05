using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class RaidGroup
    {
        private List<Hero> heroList = new List<Hero>
        {
            new Hero("Thrall", "Shaman", 60, 100),
            new Hero("Jaina", "Mage", 55, 80),
            new Hero("Sylvanas", "Hunter", 58, 90),
        };

        public void AddHero(string name, string heroClass, int level, int health)
        {
            heroList.Add(new Hero(name, heroClass, level, health));
        }

        public void ShowRaid()
        {
            foreach (var hero in heroList)
            {
                Console.WriteLine($"{hero.Name}, {hero.HeroClass}, Level {hero.Level}, HP {hero.Health}");
            }
        }

        public void AttackBoss()
        {
            Console.Clear();
            Console.WriteLine("Raid gruppen angriper bossen!");
            foreach (var hero in heroList)
            {

                hero.TakeDamage(10);
                if (hero.Health > 0)
                {
                    Console.WriteLine($"{hero.Name} overlever med {hero.Health} HP");
                }
            }
        }

        public void HealUp()
        {
            Console.Clear();
            Console.WriteLine("Raid gruppen angriper bossen!");
            foreach (var hero in heroList)
            {
                hero.Heal(25);
                Console.WriteLine($"{hero.Name} heala opp og har nå {hero.Health} HP");
            }
        }
    }
}
