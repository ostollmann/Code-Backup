using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Revilo.Settings;
using Revilo.Logger;

namespace Cosmo2EO_Value_Updater_2
{
    class Program
    {
        static void Main(string[] args)
        {
            
            /*
             * Status Codes 
             */
            const int STATUS_WORKING = 100;
            const int STATUS_ERROR = 200;
            const int STATUS_INVALID_IMPORT_DATA = 211;
            const int STATUS_OLD_IMPORT_DATA = 212;

            string LogFilePath = @"C:\Cosmo2EO\log.txt";
            string ConfigFilePath = @"C:\Cosmo2EO\cosmo2eo.conf";

            Settings settings = new Settings(ConfigFilePath, defaultValues());
            settings.Save();

            TextFileLogger log = new TextFileLogger(LogFilePath);
            log.FileWriteSetting = TextFileLogger.WriteSettings.Append;
            //ConsoleLogger log = new ConsoleLogger();
            try
            {
                switch (settings["log"])
                {
                    case "debug": log.LoggingLevel = Logger.LogLevel.Debug; break;
                    case "info": log.LoggingLevel = Logger.LogLevel.Info; break;
                    case "warning": log.LoggingLevel = Logger.LogLevel.Warning; break;
                    case "error": log.LoggingLevel = Logger.LogLevel.Error; break;
                    case "none": log.LoggingLevel = Logger.LogLevel.None; break;
                }

            }
            catch (KeyNotFoundException)
            {
                log.LoggingLevel = Logger.LogLevel.Info;                
            }


            StatusSignaler statusHandler = new StatusSignaler(settings, log);

            try
            {
                /*
                 * Import Data!
                 */
                ForecastsImporter imp = new ForecastsImporter(settings["CSVFilePath"], new string[] { settings["CSVDelimiter"] }, log);
                List<List<string>> forecasts = imp.Import();


                /*
                 * Export Data!
                 */
                ForecastsExporter exp = new ForecastsExporter(settings, log);
                exp.Export(forecasts);

                statusHandler.Signal(STATUS_WORKING);
            }
            catch (Exceptions.InvalidDataException)
            {
                statusHandler.Signal(STATUS_INVALID_IMPORT_DATA);
                log.Info(string.Format("Set status code signal to INVALID IMPORT DATA ({0})", STATUS_INVALID_IMPORT_DATA));
                log.Error("Import data invalid!");
                log.Error("Exiting...");
                Environment.Exit(1);
            }
            catch (Exceptions.NotUpToDateDataException)
            {
                statusHandler.Signal(STATUS_OLD_IMPORT_DATA);
                log.Info(string.Format("Set status code signal to OLD IMPORT DATA ({0})", STATUS_OLD_IMPORT_DATA));
                log.Warning("Import data not up to date!");
                log.Error("Exiting...");
                Environment.Exit(1);
            }
            catch (Exception e)
            {
                try { statusHandler.Signal(STATUS_ERROR); }
                catch (Exception) { log.Error(string.Format("Could not set status code signal to ERROR ({0})!", STATUS_ERROR)); }
                log.Error("Something went very wrong!");
                log.Debug(string.Format("Exception: {0}", e.Message));
                log.Error("Exiting...");
                Environment.Exit(1);                
            }

        }

        public static Dictionary<string, string> defaultValues()
        {
            Dictionary<string, string> dv = new Dictionary<string, string>();

            dv["DBHost"] = "localhost";
            dv["DBPort"] = "1521";
            dv["DBUsername"] = "bmi_cims";
            dv["DBPassword"] = "bmi_cims";
            dv["DBServiceName"] = "ORCL_XPT.eo60-srv";

            dv["StatusSignal"] = "WFS";

            dv["SignalPrefix"] = "WF_";
            dv["NumberOfSignals"] = "49";
            dv["CSVFilePath"] = @"C:\Cosmo2EO\cosmo.csv";
            dv["CSVDelimiter"] = ";";

            dv["SIGNAL_KEY"] = "SIGID";
            dv["SIGNAL_NAME_TABLE"] = "SIGNALITEM";
            dv["SIGNAL_NAME_TABLE_NAME"] = "SIGNAME";
            dv["SIGNAL_VALUE_TABLE"] = "SIGNALVALUE";
            dv["SIGNAL_VALUE_TABLE_VALUE"] = "SIGNUMVALUE";
            dv["SIGNAL_VALUE_TABLE_UPDATEDATETIME"] = "UPDATETIME";

            return dv;
        }
    }
}
