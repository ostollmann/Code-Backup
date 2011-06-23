using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.IO;

using Revilo.Logger;

namespace Cosmo2EO_Value_Updater_2
{
    class ForecastsImporter
    {
        private string _importFilePath;
        private string[] _delimiters;

        private string _rowIdentifier = "T_2M_K";

        private Logger _log;

        public ForecastsImporter(string filePath, string[] delimiters, Logger log)
        {
            _log = log;
            
            if (!_fileExists(filePath))
            {
                string err = string.Format("File \"{0}\" not found!", filePath);
                _log.Error(err);
                throw new FileNotFoundException(err);
            }

            _importFilePath = filePath;
            _delimiters = delimiters;
        }



        public List<List<string>> Import(int limit = -1)
        {
            Microsoft.VisualBasic.FileIO.TextFieldParser parser = new Microsoft.VisualBasic.FileIO.TextFieldParser(_importFilePath);
            parser.Delimiters = _delimiters;
            parser.HasFieldsEnclosedInQuotes = false;
            parser.TrimWhiteSpace = true;

            string[] row = null;
            List<List<string>> values = new List<List<string>>();

            _log.Info(string.Format("Parsing CSV file (\"{0}\")", _importFilePath));

            while (!parser.EndOfData)
            {
                try
                {
                    row = parser.ReadFields();
                    if (row[0] == _rowIdentifier)
                    {
                        List<string> fields = new List<string>();
                        fields.Add(row[3]); fields.Add(row[4]); fields.Add(row[5]); fields.Add(row[6]);
                        values.Add(fields);
                        _log.Debug(string.Format("Added values: {0}, {1}, {2}, {3}", row[3], row[4], row[5], row[6]));
                    }
                }
                catch (Exception e)
                {
                    _log.Error(string.Format("Could not parse CSV file (\"{0}\")", _importFilePath));
                    _log.Debug(string.Format("Error line: {0}",parser.ReadLine()));
                    _log.Debug(string.Format("Exception: {0}", e.Message));
                    throw;
                }
            }

            _log.Info(string.Format("Successfully parsed CSV file (\"{0}\")", _importFilePath));
            return values;
        }

        private bool _fileExists(string filePath)
        {
            return File.Exists(filePath);
        }

    }
}
