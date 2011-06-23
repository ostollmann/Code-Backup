using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Oracle.DataAccess.Client;

namespace Cosmo2EO_Value_Updating_Service
{
    class ValueExporter
    {
        private System.Diagnostics.EventLog log;
        private OracleConnection connection = null;
        public List<List<String>> forecasts { get; set; }


        public ValueExporter(System.Diagnostics.EventLog log)
        {
            this.log = log;
        }

        public void connect()
        {
            String log_output = "";
            
            connection = new OracleConnection();
            connection.ConnectionString = string.Format(
                "User Id={0};Password={1};Data Source={2}",
                Settings.username,
                Settings.password,
                Settings.dataSource
            );
            log.WriteEntry("ConString: " + connection.ConnectionString);
            log_output += "[II] Connecting to database...";
            try
            {
                connection.Open();
                log_output += "\n[II] Successfully connected to database...";
                log.WriteEntry(log_output);
            }
            catch (Exception e)
            {
                log_output += "\n[EE] Could not connect to database!";
                log_output += "\n" + e.Message;
                log.WriteEntry(log_output);
                throw;
            }
        }

        private List<String> GetForecastSignalsIDs(int numOfForecasts)
        {
            String log_output = "";
            
            List<String> IDs = new List<String>();
            
            String query = "SELECT " + Settings.SIGNAL_NAME_TABLE_KEY + " FROM " + Settings.SIGNAL_NAME_TABLE + " WHERE " + Settings.SIGNAL_NAME_TABLE_NAME + " IN (";
            for (int i = 0; i < numOfForecasts; i++)
            {
                String c = ", ";
                if (i + 1 == numOfForecasts)
                    c = "";
                query += "'" + Settings.signalNamePrefix + i + "'" + c;
            }
            query += ")";

            OracleCommand cmd = new OracleCommand(query);
            cmd.Connection = connection;
            cmd.CommandType = System.Data.CommandType.Text;
            if (connection != null)
            {
                log_output += "\n[II] Getting Signal IDs...";
                try
                {
                    OracleDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Object id = reader[0];
                        IDs.Add(id.ToString());
                    }
                }
                catch (Exception e)
                {
                    log_output += "\n[EE] Database error while getting Signal IDs!";
                    log_output += "\n[DD] Query: " + query;
                    log_output += "\n" + e.Message;
                    log.WriteEntry(log_output);
                    throw;
                }
            }
            log_output += "\nSuccessfully got Signal IDs...";
            log.WriteEntry(log_output);
            return IDs;
        }

        private String CreateUpdateQuery(List<List<String>> forecasts, List<String> forecastIDs, int limit = -1)
        {
            if (limit == -1) limit = forecasts.Count;
            String update_value = "";
            String update_date = "";
            String where = "";
            String currentTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            
            for (int i = 0; i < limit; i++)
            {
                try
                {
                    List<String> tmp = forecasts[i];
                }
                catch (ArgumentOutOfRangeException)
                {
                    break;
                }
                update_value += @"
                    WHEN " + forecastIDs[i] + @" THEN " + forecasts[i][3] + @"
                ";
                update_date += @"
                    WHEN " + forecastIDs[i] + @" THEN TO_TIMESTAMP_TZ('" + currentTime + @":00', 'YYYY-MM-DD HH24:MI:SS:FF6 TZR')" + @"
                ";
                String c = ", ";
                if (i + 1 == limit)
                    c = "";
                where += string.Format("{0}{1}", forecastIDs[i], c);
            }
            String query = @"UPDATE " + Settings.SIGNAL_VALUE_TABLE + @"
                                SET " + Settings.SIGNAL_VALUE_TABLE_VALUE + @" = CASE " + Settings.SIGNAL_NAME_TABLE_KEY + @"
                            ";
            query += update_value;
            query += @"
                END,
            ";
            query += @"
                " + Settings.SIGNAL_VALUE_TABLE_UPDATEDATETIME + @" = CASE " + Settings.SIGNAL_NAME_TABLE_KEY + @"
            ";
            query += update_date;
            query += @"
                END
            ";
            query += @"
                WHERE " + Settings.SIGNAL_VALUE_TABLE_KEY + @" IN (" + where + @")
            ";
            return query;
        }

        public void export(List<List<String>> forecasts, int limit = -1)
        {
            String output_log = "";

            List<String> forecastSignalsIDs = this.GetForecastSignalsIDs(forecasts.Count);

            String query = this.CreateUpdateQuery(forecasts, forecastSignalsIDs, limit);

            OracleCommand cmd = new OracleCommand(query);
            cmd.Connection = connection;
            cmd.CommandType = System.Data.CommandType.Text;

            output_log += "[II] Updating values...";
            try
            {
                OracleDataReader reader = cmd.ExecuteReader();
                int affected_rows = cmd.ExecuteNonQuery();

                output_log += "\n[II] Successfully updated values (" + affected_rows + " rows affected)...";
            }
            catch (Exception e)
            {
                output_log += "\n[EE] Database errror while updating signal values!";
                output_log += "\n[DD] Query: " + query;
                output_log += "\n" + e.Message;
                throw;
            }
            
        }

        public void disconnect()
        {
            String output_log = "";
            output_log += "[II] Disconnecting from Oracle DB";
            if (connection != null)
            {
                connection.Close();
                connection.Dispose();
            }
            output_log += "\n[II] Successfully disconnected from Oracle DB...";
            log.WriteEntry(output_log);
        }
    }
}
