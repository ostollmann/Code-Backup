using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;

namespace Cosmo2EO_Value_Updating_Service
{
    public partial class Service1 : ServiceBase
    {
        private System.Timers.Timer hourTimer;

        public Service1()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            hourTimer = new System.Timers.Timer(1000 * 60 * 60);

            hourTimer.Elapsed += new System.Timers.ElapsedEventHandler(everyHourEvent);
            hourTimer.Enabled = true;
            this.EventLog.WriteEntry("Started hourly timer!");
        }

        protected override void OnStop()
        {

        }

        private void everyHourEvent(object source, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                Settings.__init(this.EventLog);
                CsvImporter importer = new CsvImporter(Settings.csvFilePath, this.EventLog, Settings.csvSeperator);
                List<List<String>> forecasts = importer.import();

                ValueExporter exporter = new ValueExporter(this.EventLog);
                exporter.connect();
                exporter.export(forecasts, Settings.numOfForecastSteps);
                exporter.disconnect();

                this.EventLog.WriteEntry("[II] Successfully ended!");
            }
            catch (Exception x)
            {
                this.EventLog.WriteEntry("Big Big Error: " + x.Message);                
            }


        }

    }
}
