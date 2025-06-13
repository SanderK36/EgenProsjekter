namespace HarryPotter
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Character Harry = new Character("Harry", "Griffing", new List<string> {});
            Harry.PrintInfo();

            MagicShop shop = new MagicShop();
            shop.ShowShopMenu(Harry);
            Harry.PrintInfo();
            Console.WriteLine("La oss teste tryllestaven! si en formel:");
            string spell = Console.ReadLine();
            Harry.CastSpell(spell);
        }
    }
}
