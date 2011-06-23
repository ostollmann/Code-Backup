using System;
using System.Collections.Generic;
using System.Text;

namespace COSMO2EOr
{
    class Importer
    {
        private String filePath;
        private String[] delimiters;



        public Importer(String filePath)
        {
            this.filePath = filePath;
            this.delimiters = new String[] { "," };
        }

        public Importer(String filePath, String[] delimiters)
        {
            this.filePath = filePath;
            this.delimiters = delimiters;
        }

        public List<List<String>> import(bool overrideNumOfForecastSteps = false)
        {
            
            Microsoft.VisualBasic.FileIO.TextFieldParser parser = new Microsoft.VisualBasic.FileIO.TextFieldParser(filePath);
            parser.Delimiters = delimiters;
            parser.HasFieldsEnclosedInQuotes = false;
            parser.TrimWhiteSpace = true;

            String[] fields = null;
            List<List<String>> result = new List<List<String>>();


            System.Console.WriteLine("[II] Parsing csv file...");
            int n = 0;
            while (!parser.EndOfData)
            {
                try
                {
                    fields = parser.ReadFields();
                    if (fields[0] == "T_2M_K")
                    {
                        n++;

                        List<String> parts = new List<String>();

                        parts.Add(fields[3]); // Date of forecast
                        parts.Add(fields[4]); // Time of forecast
                        parts.Add(fields[5]); // Forecast lead-time (from now)
                        parts.Add(fields[6]); // Temperature forecast

                        result.Add(parts);
                    }

                    Settings settings = Settings.Instance;

                    // Do not update the number of forecast steps to the file value, this means
                    // that the number of exported values will be equal to the default value set
                    // Settings or another directly set value
                    //if (!overrideNumOfForecastSteps)
                    //    settings.numOfForecastSteps = n;

                }
                catch (Exception e)
                {
                    System.Console.WriteLine("[EE] Could not parse csv file!");
                    System.Console.WriteLine(e.Message);
                    System.Console.WriteLine(string.Format("Bad line: {0}", parser.ReadLine()));
                }
            }
            System.Console.WriteLine("[II] Successfully parsed csv file...");
            return result;
        }
    }
}
