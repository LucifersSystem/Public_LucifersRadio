//THIS RADIO IS CREATED BY lucifer6661771!!
//DO NOT REUPLOAD THIS RADIO WITHOUT MY PERMISSION!!
using System;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Threading.Tasks;
using CitizenFX.Core;

namespace LucifersRadio.Server
{
    public class ServerMain : BaseScript
    {
        public string Currver = "1.0.0";
        public string Key = "eadaa3021dadd844737e2a36ec484b86d11ae39d4aa6e14b65e5"; /// YOU MUST CHANGE THIS KEY TO ANY STRING HASH YOU WANT FOR SECURITY!!!!!! --MUST BE SAME IN SERRVER
        public ServerMain()
        {
            Debug.WriteLine("Radio Version: " + Currver);
            Debug.WriteLine("𝕮𝖗𝖊𝖆𝖙𝖊𝖉 𝖇𝖞 𝖑𝖚𝖈𝖎𝖋𝖊𝖗6661771");
            EventHandlers["LuciferSystems:initradio"] += new Action<Player>(this.LoadIDs);

        }


        public void LoadIDs([FromSource] Player player)
        {
            string DiscordID = player.Identifiers["discord"];
            string FivemLicense = player.Identifiers["license"];

            Debug.WriteLine("Player " + player.Name + " Found " + "Discord ID: " + DiscordID + " AND License: " + FivemLicense);
            player.TriggerEvent("LuciferSystems:reqid", DiscordID, FivemLicense, Key);
        }
    }
}