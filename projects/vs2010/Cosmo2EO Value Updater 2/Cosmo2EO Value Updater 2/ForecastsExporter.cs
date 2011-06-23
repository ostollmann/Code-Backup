using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Revilo.Logger;
using Revilo.Settings;

using Oracle.DataAccess.Client;

namespace Cosmo2EO_Value_Updater_2
{
    class ForecastsExporter
    {

        private Logger _log;
        private Settings _settings;

        private OracleConnection _connection = null;

        public ForecastsExporter(Settings settings, Logger log)
        {
            _log = log;
            _settings = settings;
        }

        public void Export(List<List<string>> forecastValues)
        {
            _connect();
            List<int> SignalIDs = _getForecastSignalIDs();
            _updateForecastSignalValues(SignalIDs, forecastValues);
            _disconnect();
        }

        private void _connect()
        {
            string connectionString = _createConnectionString();

            _connection = new OracleConnection();
            _connection.ConnectionString = connectionString;
            
            _log.Info("Connecting to database");
            _log.Debug(string.Format("ConnectionString: {0}", connectionString));

            try
            {
                _connection.Open();
                _log.Info("Successfully connected to database");
            }
            catch (Exception e)
            {
                _log.Error("Could not connect to database!");
                _log.Debug(string.Format("Exception: {0}", e.Message));
                throw;
            }

        }

        private void _disconnect()
        {
            _log.Info("Disconnecting from database");
            if (_connection != null)
            {
                _connection.Close();
                _connection.Dispose();
            }
            _log.Info("Successfully disconnected from database");

        }

        private string _createConnectionString()
        {
            return string.Format("User Id={0};Password={1};Data Source={2}",
                _settings["DBUsername"],
                _settings["DBPassword"],
                _createDataSourceString()
                );
        }

        private string _createDataSourceString()
        {
            return @"
                (DESCRIPTION = 
                    (ADDRESS_LIST = 
                        (ADDRESS = 
                            (PROTOCOL = TCP)
                            (HOST = " + _settings["DBHost"] + @")
                            (PORT = " + _settings["DBPort"] + @")
                        )
                    )
                    (CONNECT_DATA =
                        (SERVICE_NAME = " + _settings["DBServiceName"] + @")
                    )
                );
            ";
        }

        private void _updateForecastSignalValues(List<int> IDs, List<List<string>> values)
        {
            int numberOfSignals = (int)Int32.Parse(_settings["NumberOfSignals"]); 

            if (numberOfSignals < values.Count)
                _log.Warning(string.Format("Too many data points in data file \"{0}\" (data={1} vs signals={2})", _settings["CSVFilePath"], values.Count.ToString(), numberOfSignals));
            else if(numberOfSignals > values.Count)
                _log.Warning(string.Format("Too few data points in data file \"{0}\" (data={1} vs signals={2})", _settings["CSVFilePath"], values.ToString(), numberOfSignals));

            int limit = (numberOfSignals < values.Count) ? numberOfSignals : values.Count;
            _log.Debug(string.Format("Update Limit: {0}", limit));

            string updateQuery = _createSignalUpdateQuery(IDs, values);
            _log.Debug(string.Format("UPDATE query: {0}", updateQuery));

            OracleCommand cmd = new OracleCommand(updateQuery);
            cmd.Connection = _connection;
            cmd.CommandType = System.Data.CommandType.Text;
            try
            {
                _log.Info("Updating signal values");
                int numberOfAffectedRows = cmd.ExecuteNonQuery();
                _log.Debug(string.Format("Number of affected rows: {0} (there is a bug here, this is always -1)", numberOfAffectedRows));
                _log.Info("Successfully updated signal values");
            }
            catch (Exception e)
            {
                _log.Error("Could not update signal values!");
                _log.Debug(string.Format("Exception: {0}", e.Message));
                throw;
            }

        }

        private List<int> _getForecastSignalIDs()
        {

            if (_connection == null)
                _connect();

            string selectQuery = _createIDsSelectQuery();
            _log.Debug(string.Format("SELECT query: \"{0}\"", selectQuery));
            
            OracleCommand cmd = new OracleCommand(selectQuery);
            cmd.Connection = _connection;
            cmd.CommandType = System.Data.CommandType.Text;

            List<int> IDs = new List<int>();

            _log.Info("Gettings signal IDs from database");
            try
            {
                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read()) IDs.Add((int)Int32.Parse(reader[0].ToString()));
                _log.Info("Successfully selected signal IDs from database");
            }
            catch (Exception e)
            {
                _log.Error("Could not get signal IDs from database!");
                _log.Debug(string.Format("Exception: {0}", e.Message));
                throw;
            }

            return IDs;
        }

        private string _createIDsSelectQuery()
        {
            string query = string.Format("SELECT {0} FROM {1} WHERE {2} IN (", _settings["SIGNAL_KEY"], _settings["SIGNAL_NAME_TABLE"], _settings["SIGNAL_NAME_TABLE_NAME"]);

            string c = ", ";
            for (int i = 0; i < (int)Int32.Parse(_settings["NumberOfSignals"]); i++)
            {
                if (i + 1 == (int)Int32.Parse(_settings["NumberOfSignals"])) c = "";
                query += string.Format("'{0}{1}'{2}", _settings["SignalPrefix"], i.ToString(), c);
            }
            query += ")";
            
            return query;
        }

        private string _createSignalUpdateQuery(List<int> IDs, List<List<string>> values)
        {
            int limit = ((int)Int32.Parse(_settings["NumberOfSignals"]) < values.Count) ? (int)Int32.Parse(_settings["NumberOfSignals"]) : values.Count;

            string n = " ";
            string union = "UNION ALL";
            for (int i = 0; i < limit; i++)
            {
                if (i + 1 == limit)
                    union = "";
                //2011-03-18 18:22:25:00
                n += string.Format(
                    "SELECT {0} AS {1}, TO_TIMESTAMP_TZ('{2}:00:00', 'YYYY-MM-DD HH24:MI:SS:FF6 TZR') AS {3}, {4} AS {5} FROM dual {6} ",
                    IDs[i].ToString(),
                    _settings["SIGNAL_KEY"],
                    string.Format("{0} {1}", values[0][0], values[0][1]),
                    _settings["SIGNAL_VALUE_TABLE_UPDATEDATETIME"],
                    values[i][3],
                    _settings["SIGNAL_VALUE_TABLE_VALUE"],
                    union
                );
            }

            return string.Format(
                "MERGE INTO {1} USING ( {4} ) n ON ({1}.{0} = n.{0}) WHEN NOT MATCHED THEN INSERT ({0}, {2}, {3}) VALUES (n.{0}, n.{2}, n.{3}) WHEN MATCHED THEN UPDATE SET {2}=n.{2}, {3}=n.{3}",
                _settings["SIGNAL_KEY"],
                _settings["SIGNAL_VALUE_TABLE"],
                _settings["SIGNAL_VALUE_TABLE_VALUE"],
                _settings["SIGNAL_VALUE_TABLE_UPDATEDATETIME"],
                n
            );
        }
    }
}
