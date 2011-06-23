using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;

using Oracle.DataAccess.Client;


namespace COSMO2EOINIT
{
    public partial class Main : Form
    {
        private const String configDirPath = @"C:\cosmo2eo";
        private const String configFilePath = @"C:\cosmo2eo\cosmo2eo.conf";

        private const String SIGNAL_NAME_TABLE = "SIGNALITEM";
        private const String SIGNAL_NAME_TABLE_KEY = "SIGID";
        private const String SIGNAL_NAME_TABLE_NAME = "SIGNAME";

        private const String SIGNAL_VALUE_TABLE = "SIGNALVALUE";
        private const String SIGNAL_VALUE_TABLE_KEY = "SIGID";
        private const String SIGNAL_VALUE_TABLE_VALUE = "SIGNUMVALUE";
        private const String SIGNAL_VALUE_TABLE_UPDATETIME = "UPDATETIME";

        private String DBHost;
        private String DBPort;
        private String DBUsername;
        private String DBPassword;
        private String SignalPrefix;
        private int NumOfSignals;

        private String ExistingDBHost;
        private String ExistingDBPort;
        private String ExistingDBUsername;
        private String ExistingDBPassword;
        private String ExistingSignalPrefix;
        private int ExistingNumOfSignals = 0;

        private const String DefaultDBHost = "localhost";
        private const String DefaultDBPort = "1521";
        private const String DefaultDBUsername = "bmi_cims";
        private const String DefaultDBPassword = "bmi_cims";
        private const String DefaultSignalPrefix = "WF_";
        private const int DefaultNumOfSignals = 49;

        private bool update;

        private OracleConnection connection = null;

        public Main()
        {
            InitializeComponent();
            update = CheckIfConfigFileExists();
            if (update)
                try
                {
                    GetValuesFromExistingConfigFile();
                }
                catch (Exception)
                {
                    MessageBox.Show("An error was encountered whilst trying to read the existing config file (" + configFilePath + ")! Please delete or fix it and try again.");
                    Environment.Exit(0);
                }

            FillInitialValues(update);
            InitInitButtonLabel(update);
        }

        private void initializeButton_Click(object sender, EventArgs ev)
        {
            MessageBox.Show("Please be patient, depending on the database response time this may take a few minutes!");
            try
            {
                /*
                 * Form fields validation
                 * Note: validation error will just throw exceptions!
                 */
                try
                {
                    ValidateFormFields();
                }
                catch (Exception)
                {
                    MessageBox.Show("Could not validate input values, please re-check!");
                    return;
                }
                /*
                 * Connect to DB
                 */
                try
                {
                    ConnectToDB();
                }
                catch (Exception e)
                {
                    MessageBox.Show("Could not connect to Database! Please try again!\nError: " + e.Message);
                    return;
                }


                /*
                 * If SignalOverflowUnderflow is 0: no new values must be inserted or old values deleted
                 *                              -1: old values must be deleted
                 *                               1: new values must be inserted
                 */
                int numOfSignalsStatus = 0;
                if (update && ExistingNumOfSignals > NumOfSignals) numOfSignalsStatus = -1;
                else if (update && ExistingNumOfSignals < NumOfSignals) numOfSignalsStatus = 1;

                /*
                 * Get IDs of EO signals
                 */
                List<String> SignalIDs;
                try
                {
                    SignalIDs = GetSignalIDs(numOfSignalsStatus);
                }
                catch (Exception)
                {
                    MessageBox.Show("Could not get SignalIDs!");
                    return;
                }

                /*
                 * Remove no longer need signals' values
                 */
                if (numOfSignalsStatus == -1)
                {
                    try
                    {
                        RemoveSignals(SignalIDs, NumOfSignals);
                    }
                    catch (Exception e)
                    {
                        MessageBox.Show("Could not delete old signal values!\nError: " + e.Message);
                        throw;
                    }
                }
                /*
                 * Add new signals' values
                 */
                else if (numOfSignalsStatus == 1)
                {
                    if (SignalIDs.Count != NumOfSignals)
                    {
                        MessageBox.Show("Error: the number of signals in the EO Database does not equal the number of forecast steps you have defined. Please ensure that you add the signals to EO before running this program again!");
                        Environment.Exit(0);
                    }
                    try
                    {
                        AddSignals(SignalIDs, ExistingNumOfSignals);
                    }
                    catch (Exception e)
                    {
                        MessageBox.Show("Could not add new signal values!\nError: " + e.Message);
                        Environment.Exit(0);
                    }
                }
                else if (numOfSignalsStatus == 0)
                {
                    if (SignalIDs.Count != NumOfSignals)
                    {
                        MessageBox.Show("Error: the number of signals in the EO Database does not equal the number of forecast steps you have defined. Please ensure that you add the signals to EO before running this program again!");
                        Environment.Exit(0);
                    }
                    try
                    {
                        AddSignals(SignalIDs, 0);
                    }
                    catch (Exception e)
                    {
                        MessageBox.Show("Could not add new signal values!\nError: " + e.Message);
                        Environment.Exit(0);
                    }

                }

                /*
                 * Write new config file (new or update)
                 */
                if (update) UpdateConfigFile();
                else CreateConfigFile();

                String success = update ? "updated" : "initialized";
                MessageBox.Show(string.Format("Thank you! Successfully {0}!", success));
                Environment.Exit(0);

            }
            catch (Exception e)
            {
                MessageBox.Show("Something has gone very wrong! Error:\n" + e.Message);
                Environment.Exit(0);
            }

        }
        
        private void RemoveSignals(List<String> SignalIDs, int ignore)
        {
            String RemoveSignalsQuery = "DELETE FROM " + SIGNAL_VALUE_TABLE + " WHERE " + SIGNAL_VALUE_TABLE_KEY + " IN (";
            String comma = ", ";
            for (int i = ignore; i < SignalIDs.Count; i++)
            {
                if (i == SignalIDs.Count - 1)
                    comma = "";
             
                RemoveSignalsQuery += SignalIDs[i] + comma;
            }
            RemoveSignalsQuery += ")";

            OracleCommand cmd = new OracleCommand(RemoveSignalsQuery);
            cmd.Connection = connection;
            cmd.CommandType = System.Data.CommandType.Text;

            try
            {
                int affected_rows = cmd.ExecuteNonQuery();
                MessageBox.Show("Number of affected rows: " + affected_rows);
            }
            catch (Exception e)
            {
                throw new Exception("Could not remove old signal values:\n" + e.Message);
            }
        }

        private void AddSignals(List<String> SignalIDs, int ignore)
        {
            String AddSignalsQuery = "INSERT ALL ";
            for (int i = ignore; i < SignalIDs.Count; i++)
            {
                AddSignalsQuery += "INTO " + SIGNAL_VALUE_TABLE + " ("+ SIGNAL_VALUE_TABLE_KEY +", "+ SIGNAL_VALUE_TABLE_VALUE +", "+ SIGNAL_VALUE_TABLE_UPDATETIME +") VALUES (" + SignalIDs[i] + ",666,TO_TIMESTAMP_TZ('2020-02-20 20:20:20:00', 'YYYY-MM-DD HH24:MI:SS:FF6 TZR')) ";               
            }
            AddSignalsQuery += "SELECT * FROM dual";
            OracleCommand cmd = new OracleCommand(AddSignalsQuery);
            cmd.Connection = connection;
            cmd.CommandType = System.Data.CommandType.Text;
            
            try
            {
                int affected_rows = cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception("Could not add new signal values:\n" + e.Message);
            }
        
        
        }
        private void ConnectToDB()
        {
            String DataSource = @"
                (DESCRIPTION = 
                    (ADDRESS_LIST = 
                        (ADDRESS = 
                            (PROTOCOL = TCP)
                            (HOST = " + DBHost + @")
                            (PORT = " + DBPort + @")
                        )
                    )
                    (CONNECT_DATA =
                        (SERVICE_NAME = ORCL_XPT.eo60-srv)
                    )
                );
            ";

            connection = new OracleConnection();
            connection.ConnectionString = string.Format(
                "User Id={0};Password={1};Data Source={2}",
                DBUsername,
                DBPassword,
                DataSource
                );

            try
            {
                connection.Open();
            }
            catch (Exception)
            {
                throw;
            }
        }

        private List<String> GetSignalIDs(int numOfSignalStatus)
        {
            List<String> IDs = new List<String>();
            
            int numOfSignals;
            if (numOfSignalStatus != 0) numOfSignals = (ExistingNumOfSignals > NumOfSignals) ? ExistingNumOfSignals : NumOfSignals;
            else numOfSignals = NumOfSignals;

            String getSignalIDsQuery = "SELECT " + SIGNAL_NAME_TABLE_KEY + " FROM " + SIGNAL_NAME_TABLE + " WHERE " + SIGNAL_NAME_TABLE_NAME + " IN (";
            for (int i = 0; i < numOfSignals; i++)
            {
                String comma = ", ";
                if (i + 1 == numOfSignals) comma = "";
                getSignalIDsQuery += "'" + SignalPrefix + i + "'" + comma;
            }
            getSignalIDsQuery += ")";

            OracleCommand cmd = new OracleCommand(getSignalIDsQuery);
            cmd.Connection = connection;
            cmd.CommandType = System.Data.CommandType.Text;
            try
            {
                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Object id = reader[0];
                    IDs.Add(id.ToString());
                }
            }
            catch (Exception)
            {
                throw;
            }
            String strIDs = "";
            foreach (var ID in IDs)
            {
                strIDs += ID.ToString();
            }
            return IDs;
        }

        private bool CheckIfConfigFileExists()
        {
            return File.Exists(configFilePath);
        }

        private void GetValuesFromExistingConfigFile()
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
                            case "host": ExistingDBHost = parts[1]; break;
                            case "port": ExistingDBPort = parts[1]; break;
                            case "username": ExistingDBUsername = parts[1]; break;
                            case "password": ExistingDBPassword = parts[1]; break;
                            case "numOfSignals": ExistingNumOfSignals = Int32.Parse(parts[1]); break;
                            case "signalPrefix": ExistingSignalPrefix = parts[1]; break;
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

        private void FillInitialValues(bool update)
        {

            tbDBHost.Text = update ? ExistingDBHost : DefaultDBHost;
            tbDBPort.Text = update ? ExistingDBPort : DefaultDBPort;
            tbDBUsername.Text = update ? ExistingDBUsername : DefaultDBUsername;
            tbDBPassword.Text = update ? ExistingDBPassword : DefaultDBPassword;
            tbNumOfForecastValues.Text = update ? ExistingNumOfSignals.ToString() : DefaultNumOfSignals.ToString();
            tbSignalPrefix.Text = update ? ExistingSignalPrefix : DefaultSignalPrefix;
        }

        private void InitInitButtonLabel(bool update)
        {
            initializeButton.Text = update ? "Update" : "Initialize";
        }

        private void ValidateFormFields()
        {
            if (
                tbDBHost.Text == "" || 
                tbDBPort.Text == "" || 
                tbDBUsername.Text == "" || 
                tbDBPassword.Text == "" || 
                tbNumOfForecastValues.Text == "" || 
                tbSignalPrefix.Text == ""
                )

                throw new Exception("Some fields left blank!");
            
            NumOfSignals = Int32.Parse(tbNumOfForecastValues.Text); // may also throw Exception
            
            DBHost = tbDBHost.Text;
            DBPort = tbDBPort.Text;
            DBUsername = tbDBUsername.Text;
            DBPassword = tbDBPassword.Text;

            SignalPrefix = tbSignalPrefix.Text;
        }

        private void UpdateConfigFile()
        {
            try
            {
                File.Delete(configFilePath);
                CreateConfigFile();
            }
            catch (Exception)
            {
                throw new Exception("Could not update config file");
            }
        }

        private void CreateConfigDir()
        {
            try
            {
                Directory.CreateDirectory(configDirPath);
            }
            catch (Exception)
            {
                throw new Exception("Could not create config directory!");
            }
        }

        private void CreateConfigFile()
        {
            CreateConfigDir();
            try
            {
                TextWriter configFileTextWriter = new StreamWriter(configFilePath);
                configFileTextWriter.WriteLine("** DO NOT CHANGE THIS FILE MANUALLY **");

                configFileTextWriter.WriteLine("host=" + DBHost);
                configFileTextWriter.WriteLine("port=" + DBPort);
                configFileTextWriter.WriteLine("username=" + DBUsername);
                configFileTextWriter.WriteLine("password=" + DBPassword);
                configFileTextWriter.WriteLine("numOfSignals=" + NumOfSignals);
                configFileTextWriter.WriteLine("signalPrefix=" + SignalPrefix);

                configFileTextWriter.WriteLine("**************************************");


                configFileTextWriter.Close();
            }
            catch (Exception)
            {
                throw new Exception("Could not create config file!");
            }
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
