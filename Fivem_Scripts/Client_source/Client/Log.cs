//THIS RADIO IS CREATED BY lucifer6661771!!
//DO NOT REUPLOAD THIS RADIO WITHOUT MY PERMISSION!!
using CitizenFX.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucifersRadio.Client
{
    public class Log : BaseScript
    {
        public static void info(string message)
        {
            Debug.WriteLine("[Lucifers Radio System] " + message);
        }
        public static void error(string message)
        {
            Debug.WriteLine("[ERROR] [Lucifers Radio System] " + message);
        }
        public static void debug(string message)
        {
            Debug.WriteLine("[DEBUG] [Lucifers Radio System] " + message);
        }
    }
}
