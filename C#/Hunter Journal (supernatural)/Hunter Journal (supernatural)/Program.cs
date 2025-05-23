namespace Hunter_Journal__supernatural_
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Creature> creatures = new List<Creature>
            {
                new Creature("Dracula", "Vampire", 7),
                new Creature("Lycan", "Werewolf", 6),

            };
            
            Console.Clear();
            while (true)
            {
                Console.WriteLine("=== Supernatural Hunter's Journal ===");
                Console.WriteLine("1. Add a new creature");
                Console.WriteLine("2. Mark a creature as defeated");
                Console.WriteLine("3. Show all creatures");
                Console.WriteLine("4. Remove a creature");
                Console.WriteLine("5. Exit");
                Console.Write("Choose an option: ");
                if (!int.TryParse(Console.ReadLine(), out int choice) || choice < 1 || choice > 4)
                {
                    Console.WriteLine("Invalid choice, please try again.");
                    Console.WriteLine("Press any key to continue");
                    Console.ReadLine();
                    continue;
                }

                switch (choice)
                {
                    case 1:
                        Console.Clear();
                        Console.WriteLine("Add a New Creature");
                        Console.Write("Enter creature name: ");
                        string name = Console.ReadLine();
                        Console.Write("Enter creature type (e.g., Vampire, Werewolf): ");
                        string type = Console.ReadLine();
                        Console.Write("Enter danger level (1-10): ");
                        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(type))
                        {
                            Console.WriteLine("Name and type cannot be empty.");
                        }
                        else if (creatures.Any(c => c.GetName().Equals(name, StringComparison.OrdinalIgnoreCase)))
                        {
                            Console.WriteLine($"A creature named {name} already exists in the journal!");
                        }
                        else if (int.TryParse(Console.ReadLine(), out int dangerLevel))
                        {
                            creatures.Add(new Creature(name, type, dangerLevel));
                            Console.WriteLine($"Creature {name} added to the journal!");
                        }
                        else
                        {
                            Console.WriteLine("Invalid danger level, creature not added.");
                        }
                        Console.WriteLine("\nPress any key to continue...");
                        Console.ReadLine();
                        break;

                    case 2:
                        Console.Clear();
                        Console.WriteLine("Select a Creature");
                        if (creatures.Count == 0)
                        {
                            Console.WriteLine("No creatures in the journal!");
                            Console.WriteLine("\nPress any key to continue...");
                            Console.ReadLine();
                            break;
                        }
                        for (int i = 0; i < creatures.Count; i++)
                        {
                            Console.WriteLine($"{i + 1}: {creatures[i].GetName()}");
                        }
                        Console.Write($"Choose a creature (1-{creatures.Count}) or 0 to go back: ");
                        if (int.TryParse(Console.ReadLine(), out int creatureIndex) && creatureIndex >= 1 && creatureIndex <= creatures.Count)
                        {
                            Creature selected = creatures[creatureIndex - 1];
                            bool actionMenu = true;
                            while (actionMenu)
                            {
                                Console.Clear();
                                Console.WriteLine($"Selected Creature: {selected.GetName()}");
                                Console.WriteLine("1. Mark as Defeated");
                                Console.WriteLine("2. Update Danger Level");
                                Console.WriteLine("3. Show Details");
                                Console.WriteLine("4. Back");
                                Console.Write("Choose an action (1-4): ");
                                if (!int.TryParse(Console.ReadLine(), out int actionChoice) || actionChoice < 1 || actionChoice > 4)
                                {
                                    Console.WriteLine("Invalid action, please try again.");
                                    Console.WriteLine("\nPress any key to continue...");
                                    Console.ReadLine();
                                }
                                else
                                {
                                    switch (actionChoice)
                                    {
                                        case 1:
                                            selected.MarkDefeated();
                                            Console.WriteLine("\nPress any key to continue...");
                                            Console.ReadLine();
                                            break;
                                        case 2:
                                            Console.Write("Enter new danger level (1-10): ");
                                            if (int.TryParse(Console.ReadLine(), out int newLevel))
                                            {
                                                selected.UpdateDangerLevel(newLevel);
                                            }
                                            else
                                            {
                                                Console.WriteLine("Invalid danger level.");
                                            }
                                            Console.WriteLine("\nPress any key to continue...");
                                            Console.ReadLine();
                                            break;
                                        case 3:
                                            Console.WriteLine("----------------------------------");
                                            selected.ShowDetails();
                                            Console.WriteLine("----------------------------------");
                                            Console.WriteLine("\nPress any key to continue...");
                                            Console.ReadLine();
                                            break;
                                        case 4:
                                            actionMenu = false;
                                            break;
                                    }
                                }
                            }
                        }
                        else if (creatureIndex != 0)
                        {
                            Console.WriteLine("Invalid selection.");
                            Console.WriteLine("\nPress any key to continue...");
                            Console.ReadLine();
                        }
                        break;

                    case 3:
                        Console.Clear();
                        Console.WriteLine("All Creatures in the Journal");
                        if (creatures.Count == 0)
                        {
                            Console.WriteLine("No creatures in the journal!");
                        }
                        else
                        {
                            foreach (var creature in creatures)
                            {
                                Console.WriteLine("----------------------------------");
                                creature.ShowDetails();
                                Console.WriteLine("----------------------------------");
                            }
                        }
                        Console.WriteLine("\nPress any key to continue...");
                        Console.ReadLine();
                        break;

                    case 4:
                        Console.Clear();
                        Console.WriteLine("Remove a Creature");
                        if (creatures.Count == 0)
                        {
                            Console.WriteLine("No creatures in the journal!");
                        }
                        else
                        {
                            for (int i = 0; i < creatures.Count; i++)
                            {
                                Console.WriteLine($"{i + 1}: {creatures[i].GetName()}");
                            }
                            Console.Write($"Choose a creature to remove (1-{creatures.Count}) or 0 to cancel: ");
                            if (int.TryParse(Console.ReadLine(), out int removeIndex) && removeIndex >= 1 && removeIndex <= creatures.Count)
                            {
                                string removedName = creatures[removeIndex - 1].GetName();
                                creatures.RemoveAt(removeIndex - 1);
                                Console.WriteLine($"{removedName} removed from the journal!");
                            }
                            else if (removeIndex != 0)
                            {
                                Console.WriteLine("Invalid selection.");
                            }
                        }
                        Console.WriteLine("\nPress any key to continue...");
                        Console.ReadLine();
                        break;

                    case 5:
                        Console.WriteLine("Closing the journal. Stay safe out there!");
                        return;

                    default:
                        Console.WriteLine("Invalid choice, please try again.");
                        break;
                }
                    Console.WriteLine("\nPress any key to continue...");
                    Console.ReadLine();
            }
        }
    }
}
