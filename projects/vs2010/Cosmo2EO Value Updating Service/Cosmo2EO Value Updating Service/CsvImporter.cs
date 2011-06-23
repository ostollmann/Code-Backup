using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cosmo2EO_Value_Updating_Service
{
    class CsvImporter
    {
        private String filePath;
        private String[] delimiters;

        System.Diagnostics.EventLog log;

        public CsvImporter(String filePath, System.Diagnostics.EventLog log, String[] delimiters)
        {
            this.filePath = filePath;
            this.delimiters = delimiters;
            this.log = log;
        }

        public List<List<String>> import()
        {
            String log_output = "";
            Microsoft.VisualBasic.FileIO.TextFieldParser parser = new Microsoft.VisualBasic.FileIO.TextFieldParser(filePath);
            parser.Delimiters = delimiters;
            parser.HasFieldsEnclosedInQuotes = false;
            parser.TrimWhiteSpace = true;

            String[] fields = null;
            List<List<String>> result = new List<List<String>>();


            log_output += "\n[II] Parsing csv file...";
            while (!parser.EndOfData)
            {
                try
                {
                    fields = parser.ReadFields();
                    if (fields[0] == "T_2M_K")
                    {
                        List<String> parts = new List<String>();
                        parts.Add(fields[3]); // Date of forecast
                        parts.Add(fields[4]); // Time of forecast
                        parts.Add(fields[5]); // Forecast lead-time (from now)
                        parts.Add(fields[6]); // Temperature forecast
                        result.Add(parts);
                    }
                }
                catch (Exception e)
                {
                    log_output += "[EE] Could not parse csv file!";
                    log_output += "\n" + e.Message;
                    log_output += "\nBad line: " + parser.ReadLine();
                    throw;
                }
            }
            log_output += "\n[II] Successfully parsed csv file...";
            log.WriteEntry(log_output);
            return result;
        }
    }
}
