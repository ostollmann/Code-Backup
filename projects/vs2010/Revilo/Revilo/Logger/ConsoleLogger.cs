using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Revilo.Logger
{
    public class ConsoleLogger : Logger
    {
        protected override void _write(LogLevel messageLogLevel, string message)
        {
            string LogMsg = _createMessage(messageLogLevel, message);
            Console.WriteLine(LogMsg);
        }
    }

}
