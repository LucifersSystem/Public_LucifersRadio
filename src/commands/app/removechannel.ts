import {SlashCommandBuilder} from "discord.js";
import {Get_Community_Data, Radio_Community_DiscordOwner, Radio_Community_Keys_Discord} from "../../API/Structures";
import {Send_Embeded} from "../../API/System";
import {Remove_Channels} from "../../Classes/embedcreator";
import {Delete_Channel} from "../../Classes/sql";
import {IL_CHAR} from "../../API/scheck";
import {messaging_server} from "../../index";
import {Community_AuthenticationKey, Community_Owner} from "../../Classes/Settings";

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


        if(Radio_Community_DiscordOwner.indexOf(String(userId)) >= 0 && !IL_CHAR(chname)  || String(userId) === String(Community_Owner)){
            try {
                let res = Get_Community_Data(Community_AuthenticationKey, "Channels")[0].Channels;
                console.log(res);
                for(let i = 0; i<= res.length -1; i++){
                    console.log("RUN");
                    let r = Remove_Channels(res[i][0].ChannelName, String(res[i][0].ChannelID));
                    if(String(res[i][0].ChannelName) == String(chname)){
                        interaction.reply(".");
                        Send_Embeded(r, channelID);
                        Delete_Channel(userId, res[i][0].ChannelName);
                        res.splice(i, 1);
                        messaging_server.emit("Server_Update");
                    }
                }
            }catch (e){
                console.log(e);
                interaction.reply("Sorry, but we ran into an error :(");
            }
        }else{
            interaction.reply("Sorry, you dont have any community registered.");
        }

    },

}

