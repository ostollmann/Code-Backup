using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace LoggerC
{
    class FileLogger : Logger
    {
        public enum WriteSettings { Overwrite, Append };
        
        protected FileLogger.WriteSettings _fileWriteSetting = FileLogger.WriteSettings.Append;
        public virtual FileLogger.WriteSettings FileWriteSetting
        {
            get { return _fileWriteSetting; }
        }

        private string _logFilePath;
        public string LogFilePath
        {
            get { return _logFilePath; }
        }

        public FileLogger(string logFilePath)
        {
            _logFilePath = logFilePath;
        }

        public FileLogger(string logFilePath, FileLogger.WriteSettings writeSetting) : this(logFilePath)
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
            if(_logCount == 1 && _fileWriteSetting == FileLogger.WriteSettings.Overwrite)
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
