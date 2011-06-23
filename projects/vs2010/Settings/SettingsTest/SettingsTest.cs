using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SettingsTest
{
    [TestClass]
    public class SettingsTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            string configFile = @"C:\test\test.conf";
            Settings.Settings testSettings = new Settings.Settings(configFile);

            Assert.AreEqual(configFile, testSettings.FilePath);
        }
    }
}
