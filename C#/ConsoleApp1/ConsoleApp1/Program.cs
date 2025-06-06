namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            RaidGroup raid = new RaidGroup();
            raid.AddHero("Arthas", "Death Knight", 60, 100, 0, 30);
            raid.ShowRaid();
            
            while(true)
            {
                Console.WriteLine("1: Angrip bossen");
                Console.WriteLine("2: Heal");
                Console.WriteLine("3: Løp vekk");
                string choice = Console.ReadLine();

                if (choice == "1")
                {
                    raid.AttackBoss();
                }

                else if (choice == "2")
                {
                    raid.HealUp();
                }
                else if (choice == "3")
                {
                    break;
                }
            }
        }
    }
}
