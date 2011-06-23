using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

/*
 *
 * Example Usage:
   
   Dictionary<string, string> defaultValues = new Dictionary<string, string>();
   defaultValues["db_username"] = "cmi_bims";
   defaultValues["db_password"] = "cmi_bims";
   defaultValues["db_name"] = "eo-srv-6";

   defaultValues["TABLE_SIGNALS"] = "SIGNALITEMS";
   defaultValues["TABLE_SIGNALS_VALUE"] = "SIGNALVALUE";

   defaultValues["SIGNALS_KEY"] = "SIGID";

   Settings settings = new Settings(@"C:\Users\ost\Code\c#\settings\settings.conf", defaultValues);
   settings.Save();

 *  
 * 
 * 
 */

namespace Settings
{
    class Settings
    {
        private string _filePath;
        private Dictionary<string, string> _settings;
        private Dictionary<string, string> _defaults;
        
        /* 
         * ========================================================================================================================================
         * Constructors
         * ========================================================================================================================================
         */
        public Settings(string FilePath)
        {
            this.FilePath = FilePath;
            if (File.Exists(FilePath))
                _settings = _loadSettings(this.FilePath);
            else
                _settings = new Dictionary<string, string>();
        }

        public Settings(string FilePath, Dictionary<string, string> DefaultValues)
        {
            this.FilePath = FilePath;
            this._defaults = DefaultValues;
            if(File.Exists(FilePath))
                _settings = _loadSettings(this.FilePath);
            else
                _settings = new Dictionary<string, string>();
            
            _settings = _addDefaultValues(_settings, DefaultValues);
        }

        /* 
         * ========================================================================================================================================
         * Properties
         * ========================================================================================================================================
         */
        public string FilePath
        {
            get { return _filePath; }
            set { _filePath = value; }
        }
        
        /* 
         * ========================================================================================================================================
         * Operators
         * ========================================================================================================================================
         */
        public String this[string key]
        {
            get { return _settings[key]; }
            set { _settings[key] = value; }
        }

        /* 
         * ========================================================================================================================================
         * Methods
         * ========================================================================================================================================
         */

        public void Save()
        {
            _deleteConfigFile();

            if (_settings.Count != 0)
            {
                StreamWriter writer = new StreamWriter(_filePath);
                foreach (KeyValuePair<string, string> kv in _settings)
                    writer.WriteLine(string.Format("{0} = {1}", kv.Key, kv.Value));

                writer.Close();
            }
        }

        private void _deleteConfigFile()
        {
            File.Delete(_filePath);
        }

        /* 
         * ========================================================================================================================================
         * Static Methods
         * ========================================================================================================================================
         */
        static private Dictionary<string, string> _loadSettings(string FilePath)
        {
            Dictionary<string, string> settings = new Dictionary<string, string>();
            StreamReader reader = File.OpenText(FilePath);
            string line = null;
            int lineNumber = 0;
            while ((line = reader.ReadLine()) != null)
            {
                lineNumber++;
                if (line.Length != 0)
                {
                    string[] kv = line.Split('=');
                    if (kv.Length != 2)
                        throw new InvalidDataException(string.Format("Syntax error at line {0}", lineNumber));

                    kv[0] = kv[0].Trim();
                    kv[1] = kv[1].Trim();
                    if (kv[0].Length == 0 || kv[1].Length == 0)
                        throw new InvalidDataException(string.Format("Syntax error at line {0}", lineNumber));

                    settings[kv[0]] = kv[1];
                }
            }

            reader.Close();

            return settings;
        }

        static private Dictionary<string, string> _addDefaultValues(Dictionary<string, string> settings, Dictionary<string, string> DefaultValues)
        {
            foreach (KeyValuePair<string, string> dkv in DefaultValues)
                if (!settings.ContainsKey(dkv.Key))
                    settings[dkv.Key] = dkv.Value;
            
            return settings;
        }

        /* 
         * ========================================================================================================================================
         * Utils
         * ========================================================================================================================================
         */
        public override string ToString()
        {
            string str = "";
            foreach (KeyValuePair<string, string> kv in _settings) { str += string.Format("[\"{0}\"] = {1}\n", kv.Key, kv.Value); }
            return str;
        }
    }
}
