using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Logger;

namespace TestC1
{
    class Program
    {
        static void Main(string[] args)
        {
            string logFile = @"C:\app_log.txt";
            TextFileLogger log = new TextFileLogger(logFile, TextFileLogger.WriteSettings.Overwrite);
            log.LoggingLevel = Logger.Logger.LogLevel.Debug;
            log.Info("Starting TestC1");
            log.Debug("Constructor 12 called");
            log.Debug("Runnging static method queryUpdater()");
            log.Info("Routine 34 successfully completed");
            log.Info("Quitting!");


        }
    }
}
