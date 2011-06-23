using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.IO;

namespace Revilo.Logger
{
    public class TextFileLogger : Logger
    {
        public enum WriteSettings { Overwrite, Append };

        protected TextFileLogger.WriteSettings _fileWriteSetting = TextFileLogger.WriteSettings.Append;
        public virtual TextFileLogger.WriteSettings FileWriteSetting
        {
            get { return _fileWriteSetting; }
            set { _fileWriteSetting = value; }
        }

        private string _logFilePath;
        public string LogFilePath
        {
            get { return _logFilePath; }
        }

        public TextFileLogger(string logFilePath)
        {
            _logFilePath = logFilePath;
        }

        public TextFileLogger(string logFilePath, TextFileLogger.WriteSettings writeSetting)
            : this(logFilePath)
        {
            _fileWriteSetting = writeSetting;
        }

        protected override void _write(LogLevel messageLogLevel, string message)
        {
            string logMsg = _createMessage(messageLogLevel, message);
            _writeLineToFile(logMsg);
        }

        protected virtual void _writeLineToFile(string line)
        {
            if (_logCount == 1 && _fileWriteSetting == TextFileLogger.WriteSettings.Overwrite)
            {
                StreamWriter w = new StreamWriter(_logFilePath);
                w.WriteLine(line);
                w.Close();
            }
            else
            {
                StreamWriter w = File.AppendText(_logFilePath);
                w.WriteLine(line);
                w.Close();
            }

        }
    }
}
