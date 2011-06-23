using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Settings;

namespace Tester1
{
    class Program
    {
        static void Main(string[] args)
        {
            Settings.Settings settings = new Settings.Settings(@"C:\Users\ost\Code\C#\settings\settings.conf");
            Console.WriteLine(settings);
            Console.ReadLine();
        }
    }
}
