using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

using System.IO;

namespace COSMO2EOr
{
    public sealed class Settings
    {
        private static readonly Settings instance = new Settings();


        private const String configFilePath = @"C:\cosmo2eo\cosmo2eo.conf";

        Settings() {

            


            Console.WriteLine("[II] Checking if config file exists...");
            if (!CheckIfConfigFileExists())
            {
                Console.WriteLine("[EE] No config file found! Please run the Cosmo2EO Initializer/Update Tool...");
                System.Console.WriteLine("[II] Exiting in 10 seconds...");
                System.Threading.Thread.Sleep(10000);
                Environment.Exit(0);
            }

            try
            {
                GetValuesFromConfigFile();
                Console.WriteLine("[II] Successfully loaded configuration values...");
            }
            catch (Exception)
            {
                Console.WriteLine("[EE] Could not read config file!");
                System.Console.WriteLine("[II] Exiting in 10 seconds...");
                System.Threading.Thread.Sleep(10000);
                Environment.Exit(0);
            }

            /* 
             * public String hostname (property)
             * hostname of the oracle database
             */
            //hostname = "localhost";

            /* 
             * public int port (property)
             * port to use for connecting to the oracle database
             * Note: default is Oracle default 1521
             */
            //port = 1521;

            /* 
             * public String dataSource (property)
             * name of the database's data source
             */
            dataSource = @"
                (DESCRIPTION = 
                    (ADDRESS_LIST = 
                        (ADDRESS = 
                            (PROTOCOL = TCP)
                            (HOST = " + this.hostname + @")
                            (PORT = " + this.port + @")
                        )
                    )
                    (CONNECT_DATA =
                        (SERVICE_NAME = ORCL_XPT.eo60-srv)
                    )
                );
            ";

            /* 
             * public String username (property)
             * username to use for connecting to the oracle database
             */
            //username = "bmi_cims";

            /* 
             * public String password (property)
             * password to use for connecting to the oracle database
             */
            //password = "bmi_cims";

            /* 
             * public String signalNamePrefix (property)
             * prefix for signal names in EO
             * default signal names is "WF_0", "WF_1", ...
             */
            //signalNamePrefix = "WF_";

            /* 
             * public String csvSeperator (property)
             * @todo: what is this? even needed?
             */
            csvSeperator = ",";

            /* 
             * public int numOfForecastSteps (property)
             * number of future temperature forecasts to be saved to database
             * Note: this is indipendent of the size of the csv file from which
             *       these values are imported. If the number of values if bigger
             *       than this number they will just be ignored. If there are not
             *       enough values an exception will be thrown.
             */
            //numOfForecastSteps = 49;

            /* 
             * public int forecastLength (property)
             * length in seconds of the individual forecasting periods
             * Note: this would be 3600 if the forecasts were hourly (ie. 24 fore-
             *       casts for one day)
             */
            forecastLength = 3600;

            /* 
             * public String csvFileName (property)
             * weather forcast import file name
             */
            csvFileName = "cosmo.csv";

            /* 
             * public String SIGNAL_NAME_TABLE (property)
             * name of the oracle db table where the signals' IDs are matched to their
             * names
             */
            SIGNAL_NAME_TABLE = "SIGNALITEM";

            /* 
             * public String SIGNAL_NAME_TABLE_KEY (property)
             * name of the signal name tables ID column
             * 
             */
            SIGNAL_NAME_TABLE_KEY = "SIGID";

            /* 
             * public String SIGNAL_NAME_TABLE_NAME (property)
             * name of the signal name tables signal name column
             * 
             */
            SIGNAL_NAME_TABLE_NAME = "SIGNAME";

            /* 
             * public String SIGNAL_VALUE_TABLE (property)
             * name of the oracle db table to which the forecast temperature must be
             * published
             */
            SIGNAL_VALUE_TABLE = "SIGNALVALUE";

            /* 
             * public String SIGNAL_VALUE_TABLE_KEY (property)
             * name of the signal value tables ID column
             * 
             */
            SIGNAL_VALUE_TABLE_KEY = "SIGID";

            /* 
             * public String SIGNAL_VALUE_TABLE_VALUE (property)
             * name of the signal value tables value column
             * 
             */
            SIGNAL_VALUE_TABLE_VALUE = "SIGNUMVALUE";

            /* 
             * public String SIGNAL_VALUE_TABLE_UPDATEDATETIME (property)
             * name of the signal value tables value column
             * 
             */
            SIGNAL_VALUE_TABLE_UPDATEDATETIME = "UPDATETIME";
        }

        private bool CheckIfConfigFileExists()
        {
            return File.Exists(configFilePath);
        }

        private void GetValuesFromConfigFile()
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
                        throw new Exception("Could not read config file! Please delete it and re-initialize!");
                    }
                }
            }
            catch (IOException)
            {
                throw new Exception("Could not read config file! Please delete it and re-initialize!");
            }
            finally
            {
                if (configFile != null)
                    configFile.Close();
            }
        }



        public static Settings Instance { get { return instance; } }

        public String hostname { get; set; }
        public int port { get; set; }
        public String dataSource { get; set; }

        public String username { get; set; }
        public String password { get; set; }

        public String signalNamePrefix { get; set; }

        public String csvSeperator { get; set; }

        public int numOfForecastSteps { get; set; }
        public int forecastLength { get; set; }

        public String csvFileName { get; set; }

        public String SIGNAL_NAME_TABLE { get; set; }
        public String SIGNAL_NAME_TABLE_KEY { get; set; }
        public String SIGNAL_NAME_TABLE_NAME { get; set; }

        public String SIGNAL_VALUE_TABLE { get; set; }
        public String SIGNAL_VALUE_TABLE_KEY { get; set; }
        public String SIGNAL_VALUE_TABLE_VALUE { get; set; }
        public String SIGNAL_VALUE_TABLE_UPDATEDATETIME { get; set; }

        public override string ToString()
        {
            String output = "";
            Type t = this.GetType();
            output += string.Format("<{0}>\n", t);
            output += "=================================================\n\n";
            PropertyInfo[] properties = t.GetProperties();

            foreach (PropertyInfo p in properties)
                if (p.PropertyType != t)
                    output += string.Format("<{0}: name=\"{1}\", value=\"{2}\">\n", p.PropertyType, p.Name, p.GetValue(this, null));

            output += "\n=================================================\n";

            return output;
        }
    }
}
