using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Oracle.DataAccess.Client;


namespace COSMO2EOr
{
    class Program
    {
        static void Main(string[] args)
        {
            Settings settings = Settings.Instance;

            String filePath = @"C:\COSMO2EO\cosmo.csv";
            Importer importer = new Importer(filePath, new String[] { ";" });

            List<List<String>> forecasts;
            forecasts = importer.import();

            OracleExporter exporter = new OracleExporter();
            exporter.connect();
            exporter.export(forecasts, settings.numOfForecastSteps);
            exporter.disconnect();

            Console.WriteLine("Enter to exit...");
            Console.ReadLine();
        }
    }
}
