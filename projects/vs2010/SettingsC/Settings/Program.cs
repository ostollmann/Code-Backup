using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Settings
{
    class Program
    {
        static void Main(string[] args)
        {

            Dictionary<string, string> defaultValues = new Dictionary<string, string>();
            defaultValues["db_username"] = "cmi_bims";
            defaultValues["db_password"] = "cmi_bims";
            defaultValues["db_name"] = "eo-srv-6";

            defaultValues["TABLE_SIGNALS"] = "SIGNALITEMS";
            defaultValues["TABLE_SIGNALS_VALUE"] = "SIGNALVALUE";

            defaultValues["SIGNALS_KEY"] = "SIGID";

            Settings settings = new Settings(@"C:\Users\ost\Code\c#\settings\settings.conf", defaultValues);
            settings.Save();

            Console.WriteLine(settings);

            Console.Read();
        }
    }
}
