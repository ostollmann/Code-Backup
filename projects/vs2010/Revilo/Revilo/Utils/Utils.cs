using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Revilo.Utils
{
    public static class Utils
    {
        public static void HaveFun()
        {
            int line = 0;
            Console.Write("Enter a character: ");
            Start:
                line++;
                ConsoleKeyInfo key = Console.ReadKey(false);
                Console.SetCursorPosition(0, line);
                Console.WriteLine();
                char ckey = key.KeyChar;
                if (key.KeyChar == '.')
                    goto Null;
                Console.Write("You pressed: ");
                Console.ForegroundColor = (ConsoleColor)Enum.GetValues(typeof(ConsoleColor)).GetValue(new Random().Next(Enum.GetValues(typeof(ConsoleColor)).Length));
                Console.Write(key.KeyChar);
                Console.ForegroundColor = ConsoleColor.Gray;
                Console.BackgroundColor = ConsoleColor.Black;
                Console.SetCursorPosition(19, 0);
                goto Start;

            Null:
                return;
        }

        public static void WaitExit()
        {
            Console.BackgroundColor = ConsoleColor.Green;
            Console.ForegroundColor = ConsoleColor.Black;
            //Console.WriteLine();
            Console.Write("\nPress enter to exit...");
            Console.Read();
        }
    }
}
