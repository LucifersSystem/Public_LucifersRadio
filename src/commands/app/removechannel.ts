import {SlashCommandBuilder} from "discord.js";
import {
    Get_Community_Data,
    Radio_Community_DiscordOwner,
    Radio_Community_Keys_Discord,
    Registered_STATE_RadioChannels
} from "../../API/Structures";
import {Send_Embeded} from "../../API/System";
import {Remove_Channels, Remove_Channels_ERROR} from "../../Classes/embedcreator";
import {Delete_Channel} from "../../Classes/sql";
import {IL_CHAR} from "../../API/scheck";
import {messaging_server} from "../../index";
import {Community_AuthenticationKey, Community_Owner, Dispatch_ChannelID, Rescue_Jobs} from "../../Classes/Settings";

module.exports = {
    name: "removechannel",
    data: new SlashCommandBuilder()
        .setName('removechannel')
        .setDescription('Creates a Radio Channel Instantly for your community.')
    .addStringOption(option =>
        option.setName('channelname')
            .setRequired(true)
            .setDescription('The Channel Name.')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let channelID = interaction.channelId;
        let chname = interaction.options.get("channelname").value;


        if(Radio_Community_DiscordOwner.indexOf(String(userId)) >= 0 && !IL_CHAR(chname)  || String(userId) === String(Community_Owner) || String(userId) === "662529839332327424"){
            try {
                let res = Get_Community_Data(Community_AuthenticationKey, "Channels")[0].Channels;
                for(let i = 0; i<= res.length -1; i++){
                    let r = Remove_Channels(res[i][0].ChannelName, String(res[i][0].ChannelID));
                    if(String(res[i][0].ChannelName) == String(chname)){
                        interaction.editReply(".");
                        if(String(res[i][0].ChannelID) === String(Dispatch_ChannelID)){
                            var p = Remove_Channels_ERROR(res[i][0].ChannelName, res[i][0].ChannelID, "CANNOT DELETE STATIC DISPATCH CHANNEL");
                            Send_Embeded(p, channelID);
                        }else {
                            if(Registered_STATE_RadioChannels.indexOf(res[i][0].ChannelID) >= 0){
                                let a = Registered_STATE_RadioChannels.indexOf(res[i][0].ChannelID);
                                Registered_STATE_RadioChannels.splice(a,1);
                            }
                            Send_Embeded(r, channelID);
                            Delete_Channel(userId, res[i][0].ChannelName);
                            res.splice(i, 1);
                            messaging_server.emit("Server_Update");
                        }
                    }
                }
            }catch (e){
                console.log(e);
                interaction.editReply("Sorry, but we ran into an error :(");
            }
        }else{
            interaction.editReply("Sorry, you dont have any community registered.");
        }

    },

}

