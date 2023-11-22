import {SlashCommandBuilder} from "discord.js";
import console from "console";
import {Get_Community_Data, Radio_Community_DiscordOwner} from "../../API/Structures";
import {Send_Embeded} from "../../API/System";
import {Emb_NO_CHANNELS, Print_Channels} from "../../Classes/embedcreator";
import {Community_AuthenticationKey, Community_Owner} from "../../Classes/Settings";
module.exports = {
    name: "viewchannels",
    data: new SlashCommandBuilder()
        .setName('viewchannels')
        .setDescription('Creates a list of your current radio channels'),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let channelID = interaction.channelId;


        if(Radio_Community_DiscordOwner.indexOf(String(userId)) >= 0  || String(userId) === String(Community_Owner)){
            let channels = Get_Community_Data(Community_AuthenticationKey, "Channels")[0].Channels;
            console.log(channels);
            if(channels !=undefined) {
                for (let x = 0; x < channels.length; x++) {
                    let p = Print_Channels(String(channels[x][0].ChannelName), String(channels[x][0].ChannelID), String(channels[x][0].Job));
                    Send_Embeded(p, channelID);
                }
                interaction.reply("Done :)");
            }else{
                interaction.reply(".");
                let p = Emb_NO_CHANNELS();
                Send_Embeded(p, channelID);
            }
        }else{
            interaction.reply("Sorry, Theirs been a problem finding your community :(");
        }

    },

}
