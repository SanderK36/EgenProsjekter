using System.ComponentModel.Design;

namespace Virtuell_Fruktbod
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Fruit apple = new Fruit("Eple", 25.50, 100);
            Fruit banana = new Fruit("Banan", 20.00, 50);
            Fruit orange = new Fruit("Appelsin", 30.00, 75);
            //Fruit pear = new Fruit("Pære", 22.00, 60);
            //Fruit grape = new Fruit("Druer", 35.00, 40);
            //Fruit watermelon = new Fruit("Vannmelon", 50.00, 20);
            //Fruit mango = new Fruit("Mango", 45.00, 30);

            while (true)
            {
                Console.WriteLine("Velg en frukt!");
                Console.WriteLine("1: Eple");
                Console.WriteLine("2: banan");
                Console.WriteLine("3: Appelsin");
                Console.WriteLine("4: Avslutt");
                string choice = Console.ReadLine();
                Fruit selectedFruit = null;
                if(choice == "1")
                    selectedFruit = apple;
                else if (choice == "2")
                    selectedFruit = banana;
                else if (choice == "3")
                    selectedFruit = orange;
                else if (choice == "4")
                {
                   Console.WriteLine("Programmet avsluttes.");
                   break;
                }
                else
                {
                    Console.WriteLine("Ugyldig valg, prøv igjen.");
                    continue;
                }
                Console.Clear();
                Console.WriteLine($"Hva vil du gjøre med {selectedFruit.GetName()}?");
                Console.WriteLine("1: Legge til lager");
                Console.WriteLine("2: Selg frukt");
                Console.WriteLine("3: Vis info");
                string action = Console.ReadLine();

                if (action == "1")
                {
                    Console.Clear();
                    Console.WriteLine($"Hvor mange kilo {selectedFruit.GetName()} vil du legge til?");
                    if (int.TryParse(Console.ReadLine(), out int kilos))
                    {
                        selectedFruit.AddStock(kilos);
                    }
                    else
                    {
                        Console.WriteLine("ugyldig antall, skriv et tall.");
                    }
                }
                else if (action == "2")
                {
                    Console.Clear();
                    Console.WriteLine($"Hvor mange kilo {selectedFruit.GetName()} vil du selge?");
                    if (int.TryParse(Console.ReadLine(), out int kilos))
                    {
                        selectedFruit.SellFruit(kilos);
                    }
                    else
                    {
                        Console.WriteLine("ugyldig antall, skriv et tall.");
                    }
                }
                else if (action == "3")
                {
                    Console.Clear();
                    Console.WriteLine($"Du har valgt: {selectedFruit.GetName()}");
                    selectedFruit.ShowInfo();
                }
                else
                {
                    Console.WriteLine("Ugyldig valg, prøv igjen");
                }
                Console.WriteLine("Trykk på en tast for å fortsette...");
                Console.ReadLine();
            }
        }
    }
}
