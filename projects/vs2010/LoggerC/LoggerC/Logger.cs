using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LoggerC
{
    public abstract class Logger
    {
        public enum LogLevel { Debug, Info, Warning, Error, None };

        protected Logger.LogLevel _logLevel = Logger.LogLevel.Info;
        public virtual Logger.LogLevel LoggingLevel
        {
            get { return _logLevel;  }
            set { _logLevel = value; }
        }

        protected string _logFormat = "[{0}] {1} - {2}";
        public virtual string LogFormat
        {
            get { return _logFormat;  }
            set { _logFormat = value; }
        }

        protected string _dateTimeFormat = "{0:u}";
        public virtual string DateTimeFormat
        {
            get{ return _dateTimeFormat;  }
            set{ _dateTimeFormat = value; }
        }

        protected string _lastMessage;
        public virtual string LastMessage
        {
            get { return _lastMessage; }
        }

        protected int _logCount = 0;
        public virtual int LogCount
        {
            get { return _logCount; }
        }

        public void Debug(string message) { _debug(message); }
        public void Info(string message) { _info(message); }
        public void Warning(string message) { _warning(message); }
        public void Error(string message) { _error(message); }

        protected virtual void _debug(string message) { log(Logger.LogLevel.Debug, message); }
        protected virtual void _info(string message) { log(Logger.LogLevel.Info, message); }
        protected virtual void _warning(string message) { log(Logger.LogLevel.Warning, message); }
        protected virtual void _error(string message) { log(Logger.LogLevel.Error, message); }

        protected void log(Logger.LogLevel messageLoglevel, string message)
        {
            _logCount++;
            _lastMessage = message;

            if (messageLoglevel.CompareTo(_logLevel) > -1)
                _write(messageLoglevel, message);
        }

        protected abstract void _write(Logger.LogLevel messageLogLevel, string message);



        protected virtual string _createMessage(Logger.LogLevel messageLogLevel, string message)
        {
            return string.Format(_logFormat, messageLogLevel.ToString().ToUpper(), _currentTime(), message);
        }

        protected string _currentTime()
        {
            return string.Format(_dateTimeFormat, DateTime.Now);
        }

    }
}
