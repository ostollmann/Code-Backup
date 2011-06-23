using System;
using System.Collections.Generic;
using System.Text;

using Oracle.DataAccess.Client;

namespace COSMO2EOr
{
    class OracleExporter
    {
        private OracleConnection connection = null;

        public List<List<String>> forecasts { get; set; }

        public void connect()
        {
            Settings settings = Settings.Instance;
            connection = new OracleConnection();
            connection.ConnectionString = string.Format(
                "User Id={0};Password={1};Data Source={2}",
                settings.username,
                settings.password,
                settings.dataSource
            );
            System.Console.WriteLine("[II] Connecting to database...");
            try
            {
                connection.Open();
                System.Console.WriteLine("[II] Successfully connected to database...");
            }
            catch (Exception e)
            {
                System.Console.WriteLine("[EE] Could not connect to database!");
                System.Console.WriteLine(e.Message);
                System.Console.WriteLine("[DD] Settings:");
                System.Console.WriteLine(settings);
                System.Console.WriteLine("[II] Exiting in 10 seconds...");
                System.Threading.Thread.Sleep(10000);
                Environment.Exit(0);
            }
        }

        private List<String> _getForecastSignalsIDs(int numOfForecasts)
        {
            Settings settings = Settings.Instance;
            List<String> IDs = new List<String>();
            String query = "SELECT " + settings.SIGNAL_NAME_TABLE_KEY + " FROM " + settings.SIGNAL_NAME_TABLE + " WHERE " + settings.SIGNAL_NAME_TABLE_NAME + " IN (";
            for (int i = 0; i < numOfForecasts; i++)
            {
                String c = ", ";
                if (i + 1 == numOfForecasts)
                    c = "";
                query += "'" + settings.signalNamePrefix + i + "'" + c;
            }
            query += ")";
            OracleCommand cmd = new OracleCommand(query);
            cmd.Connection = connection;
            cmd.CommandType = System.Data.CommandType.Text;
            if (connection != null)
            {
                System.Console.WriteLine("[II] Getting Signal IDs...");
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
                    System.Console.WriteLine("[EE] Database error while getting Signal IDs!");
                    System.Console.WriteLine("[DD] Query: " + query);
                    System.Console.WriteLine(e.Message);
                    throw;
                }
            }
            else
            {
                System.Console.WriteLine("[EE] Tried to get Signal IDs although no connection available");
            }
            System.Console.WriteLine("[II] Successfully selected IDs from DB...");
            return IDs;
        }

        private String _createUpdateQuery(List<List<String>> forecasts, List<String> forecastIDs, int forecastLimit = -1)
        {
            Settings settings = Settings.Instance;

            if (forecastLimit == -1)
                forecastLimit = forecasts.Count;
            String update_value = "";
            String update_date = "";
            String where = "";
            String currentTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            for (int i = 0; i < forecastLimit; i++)
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
                if (i + 1 == forecastLimit)
                    c = "";
                where += string.Format("{0}{1}", forecastIDs[i], c);
            }
            String query = @"UPDATE " + settings.SIGNAL_VALUE_TABLE + @"
                                SET " + settings.SIGNAL_VALUE_TABLE_VALUE + @" = CASE " + settings.SIGNAL_NAME_TABLE_KEY + @"
                            ";
            query += update_value;
            query += @"
                END,
            ";
            query += @"
                " + settings.SIGNAL_VALUE_TABLE_UPDATEDATETIME + @" = CASE " + settings.SIGNAL_NAME_TABLE_KEY + @"
            ";
            query += update_date;
            query += @"
                END
            ";
            query += @"
                WHERE " + settings.SIGNAL_VALUE_TABLE_KEY + @" IN (" + where + @")
            ";
            return query;
        }

        public void disconnect()
        {
            System.Console.WriteLine("[II] Disconnecting from Oracle DB...");
            if (connection != null)
            {
                connection.Close();
                connection.Dispose();
            }
            System.Console.WriteLine("[II] Successfully disconnected from Oracle DB...");
        }


        public void export(List<List<String>> forecasts, int limit = -1)
        {
            List<String> forecastSignalsIDs = this._getForecastSignalsIDs(forecasts.Count);

            String query = this._createUpdateQuery(forecasts, forecastSignalsIDs, limit);

            OracleCommand cmd = new OracleCommand(query);
            cmd.Connection = connection;
            cmd.CommandType = System.Data.CommandType.Text;

            if (connection != null)
            {
                System.Console.WriteLine("[II] Updating values...");
                try
                {
                    OracleDataReader reader = cmd.ExecuteReader();
                    int affected_rows = cmd.ExecuteNonQuery();

                    System.Console.WriteLine("[II] Successfully updated values (" + affected_rows + " rows affected)...");
                }
                catch (Exception e)
                {
                    System.Console.WriteLine("[EE] Database errror while updating signal values!");
                    System.Console.WriteLine("[DD] Query: " + query);
                    System.Console.WriteLine(e.Message);
                    throw;
                }
            }
            else
            {
                System.Console.WriteLine("[EE] Tried to export data to Oracle although no connection available");
            }



        }
    }
}
