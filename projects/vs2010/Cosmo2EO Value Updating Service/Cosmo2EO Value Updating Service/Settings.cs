using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

using System.IO;


namespace Cosmo2EO_Value_Updating_Service
{
    public static class Settings
    {

        private const String configFilePath = @"C:\cosmo2eo\cosmo2eo.conf";

        public static String hostname { get; set; }
        public static int port { get; set; }
        public static String dataSource { get; set; }
        public static String username { get; set; }
        public static String password { get; set; }
        public static String signalNamePrefix { get; set; }
        public static int numOfForecastSteps { get; set; }

        public static readonly String[] csvSeperator = { ";" };

        public const String csvFilePath = @"C:\cosmo2eo\cosmo.csv";
        public const String SIGNAL_NAME_TABLE = "SIGNALITEM";
        public const String SIGNAL_NAME_TABLE_KEY = "SIGID";
        public const String SIGNAL_NAME_TABLE_NAME = "SIGNAME";
        public const String SIGNAL_VALUE_TABLE = "SIGNALVALUE";
        public const String SIGNAL_VALUE_TABLE_KEY = "SIGID";
        public const String SIGNAL_VALUE_TABLE_VALUE = "SIGNUMVALUE";
        public const String SIGNAL_VALUE_TABLE_UPDATEDATETIME = "UPDATETIME";
     

        public static void __init(System.Diagnostics.EventLog log)
        {
            String log_output = "";

            log_output += "[II] Checking if config file exists...";
            if (!CheckIfConfigFileExists())
            {
                log_output += "\n[EE] No config file found! Please run the Cosmo2EO Initializer/Update Tool...";
                log.WriteEntry(log_output);
            }

            try
            {
                GetValuesFromConfigFile();
                log_output += "\n[II] Successfully loaded configuration values...";
            }
            catch (Exception)
            {
                log_output += "\n[EE] Could not read config file!";
                log_output += "\n[II] Exiting in 10 seconds...";
                log.WriteEntry(log_output);
                throw;
            }

            dataSource = @"
                (DESCRIPTION = 
                    (ADDRESS_LIST = 
                        (ADDRESS = 
                            (PROTOCOL = TCP)
                            (HOST = " + hostname + @")
                            (PORT = " + port + @")
                        )
                    )
                    (CONNECT_DATA =
                        (SERVICE_NAME = ORCL_XPT.eo60-srv)
                    )
                );
            ";
        }
        // ^^ (SERVICE_NAME = ORCL_XPT.eo60-srv) may only work on this one... should check that!

        private static bool CheckIfConfigFileExists()
        {
            return File.Exists(configFilePath);
        }

        private static void GetValuesFromConfigFile()
        {
            StreamReader configFile = null;
            try
            {
                configFile = new StreamReader(configFilePath);
                String line;
                while ((line = configFile.ReadLine()) != null)
                {
                    String[] parts = line.Split('=');
                    try
                    {

                        switch (parts[0])
                        {
                            case "host": hostname = parts[1]; break;
                            case "port": port = Int32.Parse(parts[1]); break;
                            case "username": username = parts[1]; break;
                            case "password": password = parts[1]; break;
                            case "numOfSignals": numOfForecastSteps = Int32.Parse(parts[1]); break;
                            case "signalPrefix": signalNamePrefix = parts[1]; break;
                        }
                    }
                    catch (IndexOutOfRangeException)
                    {
                        throw;
                    }
                }
            }
            catch (IOException)
            {
                throw;
            }
            finally
            {
                if (configFile != null)
                    configFile.Close();
            }
        }
    }
}
