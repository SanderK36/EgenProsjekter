using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WoW;

namespace ConsoleApp1
{
    internal class RaidGroup
    {
        private List<Hero> heroList = new List<Hero>
        {
            new Hero("Thrall", "Shaman", 60, 100, 30),
            new Hero("Jaina", "Mage", 55, 80, 20),
            new Hero("Sylvanas", "Hunter", 58, 90, 25),
        };

        private List<Boss> BossList = new List<Boss>
        {
            new Boss(600, 50, "Onyxia", 65),
            new Boss(1000, 100, "Nefarian", 68),
            new Boss(700, 65, "C'Thun", 66)
        };

        private Boss activeBoss = null;
        private Random random = new Random();

        public void AddHero(string name, string heroClass, int level, int health, int attackPower)
        {
            heroList.Add(new Hero(name, heroClass, level, health, attackPower));
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
            if (activeBoss == null || activeBoss.BossHp <= 0)
            {
                activeBoss = BossList[random.Next(BossList.Count)];
                activeBoss.BossHp = activeBoss.BossMaxHp;
                Console.WriteLine($"En ny boss dukker opp: {activeBoss.BossName} med {activeBoss.BossHp} HP!");
            }
            else
            {
                Console.WriteLine($"Raid gruppen angriper {activeBoss.BossName} (HP: {activeBoss.BossHp}");
            }

            int totalDamage = 0;
            foreach (var hero in heroList)
            {
                if (hero.Health > 0)
                {
                    totalDamage += hero.AttackPower;
                    Console.WriteLine($"{hero.Name} angriper bossen for {hero.AttackPower} skade!");
                }
            }

            activeBoss.BossHp = Math.Max(0, activeBoss.BossHp - totalDamage);
            Console.WriteLine($"{activeBoss.BossName} har nå {activeBoss.BossHp} HP igjen");

            foreach (var hero in heroList)
            {
                if (hero.Health > 0 && activeBoss.BossHp > 0)
                {
                    hero.TakeDamage(activeBoss.BossAttackPower);
                    if (hero.Health > 0)
                    {
                        Console.WriteLine($"{hero.Name} overlever med {hero.Health} Hp etter bossens angrep");
                    }
                    else
                    {
                        Console.WriteLine($"{hero.Name} har falt!");
                    }
                }
            }

            if(activeBoss.BossHp <= 0)
            {
                Console.WriteLine($"Raid gruppen har beseiret {activeBoss.BossName}!");
                foreach (var hero in heroList)
                {
                    if (hero.Health > 0)
                    {
                        hero.GainXP(50);
                        Console.WriteLine($"{hero.Name} får 50 xp!");
                    }
                }

                activeBoss = null;
            }
        }

        public void HealUp()
        {
            Console.Clear();
            Console.WriteLine("Raid gruppen healer opp!");
            foreach (var hero in heroList)
            {
                hero.Heal(25);
                Console.WriteLine($"{hero.Name} heala opp og har nå {hero.Health} HP");
            }
        }

    }
}
