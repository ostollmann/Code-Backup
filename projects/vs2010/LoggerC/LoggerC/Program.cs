using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LoggerC
{
    class Program
    {
        static void Main(string[] args)
        {

            FileLogger logger = new FileLogger(@"C:\logC4.txt");

            logger.Info("Starting program!");
            logger.Info("Uploading files...");
            logger.Warning("No password specified, using blank string!");
            logger.Error("Unable to login to remote server!");

            Console.Write("Press enter to exit...");
            Console.ReadLine();
        }

    }
}
