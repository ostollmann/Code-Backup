using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Revilo.Logger;
using Revilo.Settings;

using Oracle.DataAccess.Client;

namespace Cosmo2EO_Value_Updater_2
{
    class StatusSignaler
    {

        private Logger _log;
        private Settings _settings;

        private OracleConnection _connection = null;

        public StatusSignaler(Settings settings, Logger log)
        {
            _log = log;
            _settings = settings;
        }

        public void Signal(int statusCode)
        {
            _connect();
            _signal(statusCode);
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

        private void _signal(int statusCode)
        {
            if (_connection == null)
                _connect();

            int statusSignalID = _getStatusSignalID();

            _log.Info(string.Format("Updating status signal {0} (ID: {1}) with status code: {2}", _settings["StatusSignal"],statusSignalID, statusCode));
            _updateStatusSignal(statusSignalID, statusCode);
            _log.Info("Successfully update status signal");

        }

        private void _updateStatusSignal(int statusSignalID, int statusCode)
        {
            string query = _createStatusSignalUpdateQuery2(statusSignalID, statusCode);
            _log.Debug(string.Format("Signal UPDATE query: {0}", query));

            OracleCommand cmd = new OracleCommand(query);
            cmd.Connection = _connection;
            cmd.CommandType = System.Data.CommandType.Text;
            try
            {
                int numberOfAffectedRows = cmd.ExecuteNonQuery();
                _log.Debug(string.Format("Number of affected rows: {0}", numberOfAffectedRows));
            }
            catch (Exception e)
            {
                _log.Error("Could not update status signal");
                _log.Debug(string.Format("Exception: {0}", e.Message));
                throw;
            }

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

        private int _getStatusSignalID()
        {

            if (_connection == null)
                _connect();

            string selectQuery = _createIDSelectQuery();
            _log.Debug(string.Format("SELECT query: \"{0}\"", selectQuery));
            
            OracleCommand cmd = new OracleCommand(selectQuery);
            cmd.Connection = _connection;
            cmd.CommandType = System.Data.CommandType.Text;

            int StatusSignalID = -1;

            _log.Info("Gettings status signal ID from database");
            try
            {
                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                    StatusSignalID = (int)Int32.Parse(reader[0].ToString());

                _log.Info("Successfully selected status signal ID from database");
            }
            catch (Exception e)
            {
                _log.Error("Could not get status signal ID from database!");
                _log.Debug(string.Format("Exception: {0}", e.Message));
                throw;
            }

            return StatusSignalID;
        }

        private string _createIDSelectQuery()
        {
            return string.Format("SELECT {0} FROM {1} WHERE {2}='{3}'",
                _settings["SIGNAL_KEY"],
                _settings["SIGNAL_NAME_TABLE"],
                _settings["SIGNAL_NAME_TABLE_NAME"],
                _settings["StatusSignal"]            
                );
        }

        private string _createStatusSignalUpdateQuery(int statusSignalID, int statusCode)
        {
            return string.Format("UPDATE {0} SET {1} = '{2}', {3} = TO_TIMESTAMP_TZ('{4}:00', 'YYYY-MM-DD HH24:MI:SS:FF6 TZR') WHERE {5} = '{6}'",
                _settings["SIGNAL_VALUE_TABLE"],
                _settings["SIGNAL_VALUE_TABLE_VALUE"],
                statusCode,
                _settings["SIGNAL_VALUE_TABLE_UPDATEDATETIME"],
                DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                _settings["SIGNAL_KEY"],
                statusSignalID
            );
        }

        private string _createStatusSignalUpdateQuery2(int statusSignalID, int statusCode)
        {
            return string.Format(
              @"MERGE INTO {0} USING dual ON ({1}='{2}')
                WHEN MATCHED     THEN UPDATE SET {3}='{4}', {5}={6}
                WHEN NOT MATCHED THEN INSERT ({7}, {8}, {9}) VALUES ('{10}', '{11}', {12})
                ",
                _settings["SIGNAL_VALUE_TABLE"],
                _settings["SIGNAL_KEY"],
                statusSignalID,
                _settings["SIGNAL_VALUE_TABLE_VALUE"],
                statusCode,
                _settings["SIGNAL_VALUE_TABLE_UPDATEDATETIME"],
                string.Format("TO_TIMESTAMP_TZ('{0}:00', 'YYYY-MM-DD HH24:MI:SS:FF6 TZR')", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                _settings["SIGNAL_KEY"],
                _settings["SIGNAL_VALUE_TABLE_VALUE"],
                _settings["SIGNAL_VALUE_TABLE_UPDATEDATETIME"],
                statusSignalID,
                statusCode,
                string.Format("TO_TIMESTAMP_TZ('{0}:00', 'YYYY-MM-DD HH24:MI:SS:FF6 TZR')", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))
            );
        }

    }
}
