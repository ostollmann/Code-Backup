using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MorphDictionary
{
    class Program
    {
        static void Main(string[] args)
        {
            MorpDictionary<string, string> person = new MorpDictionary<string, string>();
            person["first_name"] = "oliver";
            person["last_name"] = "stollmann";
            printDict(person);

            Console.Write("\nPress enter to exit...");
            Console.Read();
        }

        static void printDict(MorpDictionary<string, string> dict)
        {
            foreach (KeyValuePair<string, string> kvp in dict)
            {
                Console.WriteLine(string.Format("Key: {0}, Value: {1}", kvp.Key, kvp.Value));
            }



        }
    }
}
